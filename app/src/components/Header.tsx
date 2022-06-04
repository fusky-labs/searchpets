import Link from "next/link"
import { useRouter } from "next/router"
import { FontAwesomeIcon as FaIcon } from "@fortawesome/react-fontawesome"
import { faInfoCircle, faList, faSearch } from "@fortawesome/free-solid-svg-icons"

export default function Header() {
  const router = useRouter()

  return (
    <header>
      <div className="content-wrapper flex justify-center">
        <div className="p-5 absolute top-2 left-2 text-xl">
          <Link href="/">
            <a>
              <strong>Searchpets</strong>
            </a>
          </Link>
        </div>
        <nav className="header-nav">
          <Link href="/" passHref>
            <a className={router.pathname == "/" ? "active" : ""}>
              <FaIcon icon={faSearch} size="sm" className="mr-2" />
              Search
            </a>
          </Link>
          <Link href="/characters" passHref>
            <a className={router.pathname == "/characters" ? "active" : ""}>
              <FaIcon icon={faList} size="sm" className="mr-2" />
              Character List
            </a>
          </Link>
          <Link href="/about" passHref>
            <a className={router.pathname == "/about" ? "active" : ""}>
              <FaIcon icon={faInfoCircle} size="sm" className="mr-2" />
              About this project
            </a>
          </Link>
        </nav>
      </div>
    </header>
  )
}
