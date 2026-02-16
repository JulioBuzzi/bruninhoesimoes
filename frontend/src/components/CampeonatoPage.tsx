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

        const jogadoresMap: { [key: number]: JogadorCard } = {};

        for (const jogador of jogadores) {
          const notas = await notasService.getByJogador(jogador.numero_camisa);
          const notasDoJogo = notas.filter((n) =>
            jogosParaFiltrar.some((j) => j.id_jogo === n.id_jogo)
          );

          if (notasDoJogo.length > 0) {
            const media =
              notasDoJogo.reduce((sum, n) => sum + n.valor_nota, 0) / notasDoJogo.length;
            jogadoresMap[jogador.numero_camisa] = {
              ...jogador,
              media_notas: media,
            };
          }
        }

        setJogadoresComNotas(
          Object.values(jogadoresMap).sort(
            (a, b) =>
              (posicaoOrder[a.posicao] || 999) - (posicaoOrder[b.posicao] || 999) ||
              b.media_notas - a.media_notas
          )
        );
      } catch (error) {
        console.error('Erro ao buscar notas dos jogadores:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchJogadoresComNotas();
  }, [campeonatoSelecionado, jogoSelecionado, jogadores, jogos]);

  const getRatingColor = (nota: number) => {
    if (nota >= 8) return '#27ae60';
    if (nota >= 7) return '#f39c12';
    if (nota >= 6) return '#e67e22';
    return '#e74c3c';
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>Avaliacoes por Campeonato</h1>
        <p>Analise o desempenho do elenco em cada competicao</p>
      </div>

      <div className={styles.filterSection}>
        <div className={styles.filterGroup}>
          <label>Campeonato:</label>
          <select
            value={campeonatoSelecionado}
            onChange={(e) => setCampeonatoSelecionado(e.target.value)}
            className={styles.select}
          >
            <option value="">-- Selecione um Campeonato --</option>
            {campeonatos.map((camp) => (
              <option key={camp} value={camp}>
                {camp}
              </option>
            ))}
          </select>
        </div>

        {campeonatoSelecionado && (
          <div className={styles.filterGroup}>
            <label>Jogo (opcional):</label>
            <select
              value={jogoSelecionado}
              onChange={(e) => setJogoSelecionado(e.target.value)}
              className={styles.select}
            >
              <option value="todos">Todos os Jogos</option>
              {jogos.map((jogo) => (
                <option key={jogo.id_jogo} value={jogo.id_jogo}>
                  {jogo.adversario} ({new Date(jogo.data_jogo).toLocaleDateString('pt-BR')})
                </option>
              ))}
            </select>
          </div>
        )}
      </div>

      {campeonatoSelecionado && (
        <div className={styles.content}>
          {loading ? (
            <div className={styles.loading}>
              <p>Carregando notas dos jogadores...</p>
            </div>
          ) : jogadoresComNotas.length > 0 ? (
            <>
              <div className={styles.statsHeader}>
                <h2>Desempenho do Elenco</h2>
                <p className={styles.gameInfo}>
                  {jogoSelecionado === 'todos' ? 'Todos os jogos' : 'Jogo selecionado'}
                </p>
              </div>

              <div className={styles.jogadoresGrid}>
                {jogadoresComNotas.map((jogador) => (
                  <div key={jogador.numero_camisa} className={styles.playerCard}>
                    <div className={styles.cardCamisa}>{jogador.numero_camisa}</div>
                    <div className={styles.cardContent}>
                      <h3 className={styles.playerNameCard}>{jogador.nome}</h3>
                      <p className={styles.posicaoCard}>{jogador.posicao}</p>
                      <div className={styles.ratingContainer}>
                        <div
                          className={styles.ratingBall}
                          style={{ backgroundColor: getRatingColor(jogador.media_notas) }}
                        >
                          {jogador.media_notas.toFixed(1)}
                        </div>
                        <div className={styles.ratingBar}>
                          <div
                            className={styles.ratingBarFill}
                            style={{
                              width: `${(jogador.media_notas / 10) * 100}%`,
                              backgroundColor: getRatingColor(jogador.media_notas),
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div className={styles.noResults}>
              <p>Nenhum jogador avaliado neste campeonato</p>
            </div>
          )}
        </div>
      )}

      {!campeonatoSelecionado && (
        <div className={styles.placeholder}>
          <p>Selecione um campeonato para ver as avaliacoes</p>
        </div>
      )}
    </div>
  );
}
