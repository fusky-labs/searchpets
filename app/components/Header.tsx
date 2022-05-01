import Link from "next/link";

import { useRouter } from "next/router";

export default function Header() {

  const router = useRouter();

  return (
    <header>
      <div className="content-wrapper flex justify-center text-4xl">
        <nav className="flex text-xl gap-x-4 flex-col md:flex-row">
          <Link href="/">
            <a className={(router.pathname == "/" ? "text-blue-400 font-bold" : "")}>Searchpets</a>
          </Link>
          <Link href="/characters">
            <a className={(router.pathname == "/characters" ? "text-blue-400 font-bold" : "")}>Character List</a>
          </Link>
        </nav>
      </div>
    </header>
  );
};
