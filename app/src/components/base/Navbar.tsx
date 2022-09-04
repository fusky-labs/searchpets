import { useRouter } from "next/router"
import Link from "next/link"
import styles from "@/styles/base/Navbar.module.scss"
import OptionsMenu from "../navigation/OptionsMenu"
import SearchBox from "./SearchBox"
import NavbarRoot from "./NavbarRoot"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faBars,
  faHistory,
  faInfoCircle,
  faMagnifyingGlass
} from "@fortawesome/free-solid-svg-icons"

export default function Navbar() {
  const router = useRouter()

  if (
    router.pathname === "/" ||
    router.pathname === "/search" ||
    router.pathname === "/characters" ||
    router.pathname === "/chapters"
  ) {
    return (
      <NavbarRoot>
        <LogoNav />
        <SearchBox />
        <OptionsMenu />
      </NavbarRoot>
    )
  }

  return (
    <NavbarRoot>
      <LogoNav />
      <nav className={styles["nav-row"]}>
        <NavRowItem name="Search" link="/search" icon={faMagnifyingGlass} />
        {/* prettier-ignore */}
        <NavRowItem name="History" link="/history" icon={faHistory} />
        {/* prettier-ignore */}
        <NavRowItem name="About" link="/about" icon={faInfoCircle} />
      </nav>
      <OptionsMenu />
    </NavbarRoot>
  )
}

export function LogoNav() {
  return (
    <div className="flex items-center">
      <button className={styles["sidebar-btn"]}>
        <FontAwesomeIcon icon={faBars} />
      </button>
      <Link href="/">
        <a className={styles["logo-handler"]}>
          <span className={styles.logo}>Searchpets!</span>
        </a>
      </Link>
    </div>
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
