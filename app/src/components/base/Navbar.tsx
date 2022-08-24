import { useContext } from "react"
import { useRouter } from "next/router"
import Link from "next/link"
import styles from "@/styles/base/Navbar.module.scss"
import OptionsMenu from "./OptionsMenu"
import DropdownMenu from "../dropdown/DropdownMenu"
import SearchBox from "./SearchBox"
import { ExpandSearchContext } from "@/utils/Contexts"
import NavbarRoot from "./NavbarRoot"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faChartLine,
  faHistory,
  faInfoCircle,
  faMagnifyingGlass
} from "@fortawesome/free-solid-svg-icons"

export default function Navbar() {
  const { expanded } = useContext(ExpandSearchContext)

  const router = useRouter()

  if (
    router.pathname === "/" ||
    router.pathname === "/search" ||
    router.pathname === "/characters" ||
    router.pathname === "/chapters"
  ) {
    return (
      <NavbarRoot>
        <DropdownMenu />
        <Link href="/">
          <a className={styles["logo-handler"]}>
            <span
              className={styles.logo}
              style={{ opacity: !expanded ? "1" : "0" }}
            >
              Searchpets!
            </span>
          </a>
        </Link>
        <SearchBox />
        <OptionsMenu />
      </NavbarRoot>
    )
  }

  return (
    <NavbarRoot>
      <Link href="/">
        <a className={styles["logo-handler"]}>
          <span className={styles.logo}>Searchpets!</span>
        </a>
      </Link>
      <nav className={styles["nav-row"]}>
        <NavRowItem name="Search" link="/search" icon={faMagnifyingGlass} />
        {/* prettier-ignore */}
        <NavRowItem name="History" link="/history" icon={faHistory} />
        {/* prettier-ignore */}
        <NavRowItem name="Statistics" link="/statistics" icon={faChartLine} />
        <NavRowItem name="About" link="/about" icon={faInfoCircle} />
      </nav>
      <OptionsMenu />
    </NavbarRoot>
  )
}

export function NavRowItem({ name, link = "", icon }: NavLinkProps) {
  const router = useRouter()

  const linkHandler =
    router.pathname !== link
      ? styles["item"].toString()
      : styles["item-active"].toString()
  return (
    <Link href={link}>
      <a className={linkHandler}>
        <FontAwesomeIcon icon={icon} />
        {name}
      </a>
    </Link>
  )
}
