import { SidebarContext } from "@/utils/Contexts"
import { useContext } from "react"
import Link from "next/link"
import styles from "@/styles/base/Navbar.module.scss"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faBars } from "@fortawesome/free-solid-svg-icons"

export function LogoNav() {
  const { expanded, setExpanded, marginSize, setMarginSize } =
    useContext(SidebarContext)

  const handleMargin = () => {
    setExpanded(!expanded)

    if (typeof window !== "undefined") {
      const laptopScreen = window.matchMedia("(min-width: 1366px)").matches
      if (!expanded) {
        if (laptopScreen) {
          return setMarginSize("330")
        }
      }
      return setMarginSize("70")
    }
  }

  return (
    <div className="flex items-center">
      <button className={styles["sidebar-btn"]} onClick={handleMargin}>
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
