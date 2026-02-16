'use client';

import { useState, useEffect } from 'react';
import { jogosService, jogadoresService, notasService } from '@/services/api';
import { Jogo, Jogador, Nota } from '@/types';
import styles from './CampeonatoPage.module.css';

interface JogadorCard extends Jogador {
  media_notas: number;
}

export default function CampeonatoPage() {
  const [campeonatos, setCampeonatos] = useState<string[]>([]);
  const [jogos, setJogos] = useState<Jogo[]>([]);
  const [jogadores, setJogadores] = useState<Jogador[]>([]);
  const [campeonatoSelecionado, setCampeonatoSelecionado] = useState<string>('');
  const [jogoSelecionado, setJogoSelecionado] = useState<string>('todos');
  const [jogadoresComNotas, setJogadoresComNotas] = useState<JogadorCard[]>([]);
  const [loading, setLoading] = useState(false);

  // Posições ordenadas corretamente
  const posicaoOrder: { [key: string]: number } = {
    'Goleiro': 1,
    'Lateral Direito': 2,
    'Zagueiro': 3,
    'Lateral Esquerdo': 4,
    'Volante': 5,
    'Meio-campista': 6,
    'Atacante': 7,
  };

  useEffect(() => {
    const fetchCampeonatos = async () => {
      try {
        const data = await jogosService.getCampeonatos();
        setCampeonatos(data);
      } catch (error) {
        console.error('Erro ao buscar campeonatos:', error);
      }
    };
    fetchCampeonatos();
  }, []);

  useEffect(() => {
    if (campeonatoSelecionado) {
      const fetchJogosDoCampeonato = async () => {
        try {
          const data = await jogosService.getByCampeonato(campeonatoSelecionado);
          setJogos(data);
          setJogoSelecionado('todos');
        } catch (error) {
          console.error('Erro ao buscar jogos do campeonato:', error);
        }
      };
      fetchJogosDoCampeonato();
    }
  }, [campeonatoSelecionado]);

  useEffect(() => {
    const fetchJogadores = async () => {
      try {
        const data = await jogadoresService.getAll();
        setJogadores(data);
      } catch (error) {
        console.error('Erro ao buscar jogadores:', error);
      }
    };
    fetchJogadores();
  }, []);

  useEffect(() => {
    const fetchJogadoresComNotas = async () => {
      if (!campeonatoSelecionado) return;

      setLoading(true);
      try {
        let jogosParaFiltrar = jogos;

        if (jogoSelecionado !== 'todos') {
          jogosParaFiltrar = jogos.filter((j) => j.id_jogo === Number(jogoSelecionado));
        }

        const jogadoresComMedia: JogadorCard[] = [];

        for (const jogador of jogadores) {
          let totalNotas = 0;
          let countNotas = 0;

          for (const jogo of jogosParaFiltrar) {
            try {
              const notas = await notasService.getByJogo(jogo.id_jogo);
              const notasJogador = notas.filter((n) => n.numero_jogador === jogador.numero_camisa);
              
              if (notasJogador.length > 0) {
                const mediaNotas = notasJogador.reduce((sum, n) => sum + n.valor_nota, 0) / notasJogador.length;
                totalNotas += mediaNotas;
                countNotas++;
              }
            } catch (error) {
              // Continua se não encontrar notas
            }
          }

          if (countNotas > 0) {
            jogadoresComMedia.push({
              ...jogador,
              media_notas: totalNotas / countNotas,
            });
          }
        }

        // Ordenar por posição
        jogadoresComMedia.sort((a, b) => {
          const orderA = posicaoOrder[a.posicao] || 999;
          const orderB = posicaoOrder[b.posicao] || 999;
          return orderA - orderB;
        });

        setJogadoresComNotas(jogadoresComMedia);
      } catch (error) {
        console.error('Erro ao buscar jogadores com notas:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchJogadoresComNotas();
  }, [campeonatoSelecionado, jogoSelecionado, jogadores, jogos]);

  return (
    <div className={styles.container}>
      <h1>Avaliação por Campeonato</h1>

      <div className={styles.filtersContainer}>
        <div className={styles.filterGroup}>
          <label htmlFor="campeonato-select">Campeonato:</label>
          <select
            id="campeonato-select"
            value={campeonatoSelecionado}
            onChange={(e) => setCampeonatoSelecionado(e.target.value)}
            className={styles.select}
          >
            <option value="">-- Escolher --</option>
            {campeonatos.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>

        {campeonatoSelecionado && (
          <div className={styles.filterGroup}>
            <label htmlFor="jogo-select">Jogo:</label>
            <select
              id="jogo-select"
              value={jogoSelecionado}
              onChange={(e) => setJogoSelecionado(e.target.value)}
              className={styles.select}
            >
              <option value="todos">TODOS</option>
              {jogos.map((j) => (
                <option key={j.id_jogo} value={j.id_jogo}>
                  {j.adversario} - {new Date(j.data_jogo).toLocaleDateString('pt-BR')}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>

      {loading && <p>Carregando...</p>}

      {campeonatoSelecionado && (
        <div className={styles.cardsContainer}>
          {jogadoresComNotas.length > 0 ? (
            jogadoresComNotas.map((jogador) => (
              <div key={jogador.numero_camisa} className={styles.card}>
                <img src={jogador.foto_url} alt={jogador.nome} className={styles.playerImage} />
                <div className={styles.cardContent}>
                  <h3>{jogador.nome}</h3>
                  <p className={styles.position}>{jogador.posicao}</p>
                  <p className={styles.number}>#{jogador.numero_camisa}</p>
                  <div className={styles.ratingContainer}>
                    <span className={styles.rating}>{jogador.media_notas.toFixed(1)}</span>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p>Nenhum jogador encontrado para este período.</p>
          )}
        </div>
      )}
    </div>
  );
}
