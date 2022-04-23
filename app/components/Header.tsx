import Link from "next/link";

import { useRouter } from "next/router";

export default function Header() {

  const router = useRouter();

  return (
    <header>
      <div className="content-wrapper flex justify-center text-4xl">
        <Link href="/" passHref>
          <a className="text-2xl font-bold">Searchpets</a>
        </Link>
        <nav className="absolute p-[1.5rem] top-0 right-2 text-lg flex gap-x-4">
          <Link href="/">
            <a className={(router.pathname == "/" ? "text-blue-400 font-bold" : "")}>Home</a>
          </Link>
          <Link href="/characters">
            <a className={(router.pathname == "/characters" ? "text-blue-400 font-bold" : "")}>Characters</a>
          </Link>
        </nav>
      </div>
    </header>
  );
};
