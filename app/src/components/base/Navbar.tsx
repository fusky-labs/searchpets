import { useRouter } from "next/router"
import Link from "next/link"
import styles from "@/styles/base/Navbar.module.scss"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faBoxesPacking,
  faInfoCircle,
  faList,
  faMagnifyingGlass
} from "@fortawesome/free-solid-svg-icons"
import Options from "./Options"
import { SearchLockContext } from "@/utils/Contexts"
import { useContext } from "react"

export default function Navbar() {
  const { searchLocked } = useContext(SearchLockContext)

  return (
    <header className={styles.root}>
      <div className={styles.wrapper}>
        <div className={styles["nav-container"]}>
          <strong
            className={`${styles.logo} transition-all`}
            style={{
              transform: searchLocked
                ? "translateX(0rem)"
                : "translateX(-1rem)",
              opacity: !searchLocked ? "0" : "1"
            }}
          >
            <Link href="/">Searchpets!</Link>
          </strong>
          <ul className={styles["nav-links-container"]} role="navigation">
            <NavLink link="/" name="Search" icon={faMagnifyingGlass} />
            <NavLink link="/characters" name="Character List" icon={faList} />
            <NavLink link="/updates" name="Updates" icon={faBoxesPacking} />
            <NavLink link="/about" name="About" icon={faInfoCircle} />
          </ul>
        </div>
        <Options />
      </div>
    </header>
  )
}

export function NavLink({ link = "#", name, icon }: INavLinkProps) {
  const router = useRouter()
  const { searchLocked } = useContext(SearchLockContext)

  const active = () => {
    if (router.pathname !== link) {
      return styles["nav-link-item"].toString()
    }

    return styles["nav-link-active"].toString()
  }

  return (
    <li
      style={{
        marginLeft: !searchLocked ? "-7.5rem" : "0rem",
        opacity: !searchLocked ? "0" : "1"
      }}
      className="transition-all duration-200"
    >
      <Link href={link}>
        <a className={active()}>
          <FontAwesomeIcon icon={icon} />
          <span>{name}</span>
        </a>
      </Link>
    </li>
  )
}
