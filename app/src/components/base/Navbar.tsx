import { useRouter } from "next/router"
import Link from "next/link"
import styles from "@/styles/base/Navbar.module.scss"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faAdjust,
  faInfoCircle,
  faList,
  faMagnifyingGlass
} from "@fortawesome/free-solid-svg-icons"
import ThemeToggle from "./ThemeToggle"

export default function Navbar() {
  return (
    <header className={styles.root}>
      <div className={styles.wrapper}>
        <div className={styles["nav-container"]}>
          <strong className={styles.logo}>
            <Link href="/">Searchpets!</Link>
          </strong>
          <ul className={styles["nav-links-container"]} role="navigation">
            <NavLink link="/" name="Search" icon={faMagnifyingGlass} />
            <NavLink link="/characters" name="Character List" icon={faList} />
            <NavLink link="/about" name="About" icon={faInfoCircle} />
          </ul>
        </div>
        <ThemeToggle />
      </div>
    </header>
  )
}

export function NavLink({ link = "#", name, icon }: INavLinkProps) {
  const router = useRouter()

  const active = () => {
    if (router.pathname !== link) {
      return styles["nav-link-item"].toString()
    }

    return styles["nav-link-active"].toString()
  }

  return (
    <li>
      <Link href={link}>
        <a className={active()}>
          <FontAwesomeIcon icon={icon} />
          <span>{name}</span>
        </a>
      </Link>
    </li>
  )
}
