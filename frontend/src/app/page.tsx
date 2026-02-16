export default function Home() {
  return (
    <div style={styles.container}>
      <div style={styles.heroSection}>
        <div style={styles.heroContent}>
          <h1 style={styles.title}>🔴 Avaliações Flamengo</h1>
          <p style={styles.subtitle}>Análise de Desempenho dos Jogadores</p>
          <p style={styles.description}>
            Acompanhe as avaliações do elenco rubro-negro por Bruninho e Simões
          </p>
        </div>
      </div>

      <div style={styles.cardsGrid}>
        <div style={styles.card}>
          <h3 style={styles.cardTitle}>👥 Avalie Jogadores</h3>
          <p>Acesse notas individuais e desempenho em campeonatos</p>
        </div>
        <div style={styles.card}>
          <h3 style={styles.cardTitle}>🏆 Campeonatos</h3>
          <p>Veja avaliações organizadas por competição</p>
        </div>
        <div style={styles.card}>
          <h3 style={styles.cardTitle}>📊 Estatísticas</h3>
          <p>Média de notas e análises detalhadas</p>
        </div>
      </div>

      <div style={styles.infoSection}>
        <h2>Como Funciona</h2>
        <ol style={styles.stepsList}>
          <li>Selecione um <strong>Jogador</strong> para ver sua avaliação</li>
          <li>Acesse <strong>Campeonato</strong> para análises por competição</li>
          <li>Confira a <strong>Média de Notas</strong> e desempenho</li>
        </ol>
      </div>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '2rem',
  } as React.CSSProperties,
  heroSection: {
    background: 'linear-gradient(135deg, #c41e3a 0%, #8b1428 100%)',
    color: 'white',
    padding: '4rem 2rem',
    borderRadius: '12px',
    marginBottom: '3rem',
    textAlign: 'center',
    boxShadow: '0 8px 24px rgba(196, 30, 58, 0.3)',
  } as React.CSSProperties,
  heroContent: {
    maxWidth: '600px',
    margin: '0 auto',
  } as React.CSSProperties,
  title: {
    fontSize: '3rem',
    fontWeight: 'bold',
    marginBottom: '0.5rem',
  } as React.CSSProperties,
  subtitle: {
    fontSize: '1.5rem',
    marginBottom: '1rem',
    opacity: 0.95,
  } as React.CSSProperties,
  description: {
    fontSize: '1rem',
    opacity: 0.9,
    lineHeight: '1.6',
  } as React.CSSProperties,
  cardsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
    gap: '1.5rem',
    marginBottom: '3rem',
  } as React.CSSProperties,
  card: {
    background: 'white',
    padding: '2rem',
    borderRadius: '8px',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
    border: '2px solid transparent',
    transition: 'all 0.3s ease',
    cursor: 'pointer',
  } as React.CSSProperties,
  cardTitle: {
    color: '#c41e3a',
    marginBottom: '0.5rem',
    fontSize: '1.3rem',
  } as React.CSSProperties,
  infoSection: {
    background: 'white',
    padding: '3rem 2rem',
    borderRadius: '8px',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
  } as React.CSSProperties,
  stepsList: {
    listStyle: 'none',
    paddingLeft: 0,
    marginTop: '1.5rem',
  } as React.CSSProperties,
};
