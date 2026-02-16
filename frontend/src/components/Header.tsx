'use client';

import Link from 'next/link';
import styles from './Header.module.css';

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <div style={{ fontSize: '2rem' }}>
          🔴
        </div>
        <div className={styles.brand}>
          <div className={styles.brandName}>Flamengo</div>
          <div className={styles.brandSubtitle}>Avaliacoes</div>
        </div>
      </div>
      <nav className={styles.nav}>
        <Link href="/">Home</Link>
        <Link href="/jogador">Jogador</Link>
        <Link href="/campeonato">Campeonato</Link>
        <a href="https://www.youtube.com/@BruninhoeSimoes" target="_blank" rel="noopener noreferrer">
          YouTube
        </a>
      </nav>
    </header>
  );
}
