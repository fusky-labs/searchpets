import Link from 'next/link'

export default function Header() {
  return (
    <header>
      <div className="wrapper">
        <div id="headerDesktop">
          <strong id="logo">
            <Link href="/">Searchpets</Link></strong>
          <nav id="headerNav">
            <Link href="/api">For developers</Link>
            <Link href="/about">About</Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
