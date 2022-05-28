import Link from "next/link"
import { useRouter } from "next/router"
import { FontAwesomeIcon as FaIcon } from "@fortawesome/react-fontawesome"
import { faInfoCircle, faList, faSearch } from "@fortawesome/free-solid-svg-icons"

export default function Header() {
  const router = useRouter()

  return (
    <header>
      <div className="content-wrapper flex justify-center text-4xl">
        <nav className="flex text-xl gap-x-7 flex-col md:flex-row">
          <Link href="/" passHref>
            <a className={router.pathname == "/" ? "text-blue-400 font-bold" : ""}>
              <FaIcon icon={faSearch} size="sm" className="mr-2" />
              Search
            </a>
          </Link>
          <Link href="/characters" passHref>
            <a className={router.pathname == "/characters"? "text-blue-400 font-bold": ""}>
              <FaIcon icon={faList} size="sm" className="mr-2" />
              Character List
            </a>
          </Link>
          <Link href="/about" passHref>
            <a className={router.pathname == "/about" ? "text-blue-400 font-bold" : ""}>
              <FaIcon icon={faInfoCircle} size="sm" className="mr-2" />
              About this project
            </a>
          </Link>
        </nav>
      </div>
    </header>
  )
}
