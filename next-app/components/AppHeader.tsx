import styles from '../styles/AppHeader.module.scss'
import Link from 'next/link'

function Header() {
  return (
    <header>
      <div className="wrapper">
        <div id={styles.headerDesktop}>
          <strong id={styles.logo}>
            <Link href="/">Searchpets</Link></strong>
          <nav id={styles.headerNav}>
            <Link href="/api">For developers</Link>
            <Link href="/about">About</Link>
          </nav>
        </div>
      </div>
    </header>
  );
}

export default Header;