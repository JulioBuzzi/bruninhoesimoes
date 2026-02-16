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
  const [filtro, setFiltro] = useState('');

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

  const jogadoresFiltrados = jogadores.filter(
    (j) => j.nome.toLowerCase().includes(filtro.toLowerCase()) ||
           j.numero_camisa.toString().includes(filtro)
  );

  const getRatingColor = (nota: number) => {
    if (nota >= 8) return '#27ae60';
    if (nota >= 7) return '#f39c12';
    if (nota >= 6) return '#e67e22';
    return '#e74c3c';
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>Avaliacao de Jogador</h1>
        <p>Confira o desempenho dos atletas rubro-negros</p>
      </div>

      <div className={styles.searchContainer}>
        <input
          type="text"
          placeholder="Buscar por nome ou numero..."
          value={filtro}
          onChange={(e) => setFiltro(e.target.value)}
          className={styles.searchInput}
        />
      </div>

      <div className={styles.gridContainer}>
        <div className={styles.playersList}>
          <h2>Elenco</h2>
          <div className={styles.jogadoresGrid}>
            {jogadoresFiltrados.map((jogador) => (
              <button
                key={jogador.numero_camisa}
                className={`${styles.playerCard} ${jogadorSelecionado?.numero_camisa === jogador.numero_camisa ? styles.active : ''}`}
                onClick={() => handleJogadorChange(jogador.numero_camisa)}
              >
                <div className={styles.camisa}>{jogador.numero_camisa}</div>
                <div className={styles.playerName}>{jogador.nome}</div>
                <div className={styles.posicao}>{jogador.posicao}</div>
              </button>
            ))}
          </div>
        </div>

        <div className={styles.playerDetails}>
          {loading && (
            <div className={styles.loadingCard}>
              <p>Carregando dados...</p>
            </div>
          )}

          {jogadorSelecionado && !loading && (
            <div className={styles.detailsCard}>
              <div className={styles.playerHeader}>
                <div className={styles.camisaLarge}>{jogadorSelecionado.numero_camisa}</div>
                <div className={styles.playerInfo}>
                  <h2>{jogadorSelecionado.nome}</h2>
                  <p className={styles.posicaoDetail}>{jogadorSelecionado.posicao}</p>
                </div>
              </div>

              <div className={styles.ratingSection}>
                <div className={styles.ratingCard}>
                  <p className={styles.ratingLabel}>Media de Avaliacoes</p>
                  <div
                    className={styles.ratingValue}
                    style={{ color: getRatingColor(mediaNota) }}
                  >
                    {mediaNota.toFixed(1)}
                  </div>
                  <div className={styles.ratingBar}>
                    <div
                      className={styles.ratingFill}
                      style={{
                        width: `${(mediaNota / 10) * 100}%`,
                        backgroundColor: getRatingColor(mediaNota),
                      }}
                    />
                  </div>
                  <p className={styles.ratingText}>
                    {mediaNota >= 8
                      ? 'Performance Excelente'
                      : mediaNota >= 7
                      ? 'Bom Desempenho'
                      : mediaNota >= 6
                      ? 'Desempenho Adequado'
                      : 'Abaixo da Expectativa'}
                  </p>
                </div>
              </div>

              <div className={styles.infoGrid}>
                <div className={styles.infoBox}>
                  <p className={styles.infoLabel}>Posicao</p>
                  <p className={styles.infoValue}>{jogadorSelecionado.posicao}</p>
                </div>
                <div className={styles.infoBox}>
                  <p className={styles.infoLabel}>Numero Camisa</p>
                  <p className={styles.infoValue}>{jogadorSelecionado.numero_camisa}</p>
                </div>
              </div>
            </div>
          )}

          {!jogadorSelecionado && !loading && (
            <div className={styles.placeholderCard}>
              <p>Selecione um jogador para ver as avaliacoes</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
