'use client';

import { useState, useEffect } from 'react';
import { jogadoresService, notasService } from '@/services/api';
import { Jogador } from '@/types';
import styles from './JogadorPage.module.css';

export default function JogadorPage() {
  const [jogadores, setJogadores] = useState<Jogador[]>([]);
  const [jogadorSelecionado, setJogadorSelecionado] = useState<Jogador | null>(null);
  const [mediaNota, setMediaNota] = useState<number>(0);
  const [loading, setLoading] = useState(false);

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

  const handleJogadorChange = async (numero: number) => {
    setLoading(true);
    try {
      const jogador = await jogadoresService.getByNumero(numero);
      const media = await notasService.getMediaJogador(numero);
      setJogadorSelecionado(jogador);
      setMediaNota(media);
    } catch (error) {
      console.error('Erro ao buscar dados do jogador:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <h1>Avaliação de Jogador</h1>

      <div className={styles.searchContainer}>
        <label htmlFor="jogador-select">Selecione um jogador:</label>
        <select
          id="jogador-select"
          onChange={(e) => handleJogadorChange(Number(e.target.value))}
          className={styles.select}
        >
          <option value="">-- Escolher --</option>
          {jogadores.map((j) => (
            <option key={j.numero_camisa} value={j.numero_camisa}>
              #{j.numero_camisa} - {j.nome}
            </option>
          ))}
        </select>
      </div>

      {loading && <p>Carregando...</p>}

      {jogadorSelecionado && (
        <div className={styles.playerInfo}>
          <h2>{jogadorSelecionado.nome}</h2>
          <p>Posição: {jogadorSelecionado.posicao}</p>
          <p>Número: {jogadorSelecionado.numero_camisa}</p>
          <div className={styles.mediaContainer}>
            <h3>Média de Notas: <span className={styles.media}>{mediaNota.toFixed(1)}</span></h3>
          </div>
        </div>
      )}

      {/* Aqui irão os cards dos jogos */}
    </div>
  );
}
