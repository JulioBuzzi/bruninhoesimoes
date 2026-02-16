'use client';

import Link from 'next/link';
import styles from './Header.module.css';

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <img src="/logo.png" alt="Bruninho e Simões" /> {/* Substitua pelo caminho correto */}
      </div>
      <nav className={styles.nav}>
        <Link href="/jogador">Jogador</Link>
        <Link href="/campeonato">Campeonato</Link>
        <a href="https://www.youtube.com/@BruninhoeSimoes" target="_blank" rel="noopener noreferrer">
          YouTube
        </a>
      </nav>
    </header>
  );
}
