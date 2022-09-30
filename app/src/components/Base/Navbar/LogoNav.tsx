import { SidebarContext } from "@/utils/Contexts"
import { useContext } from "react"
import Link from "next/link"
import styles from "@/styles/base/Navbar.module.scss"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faBars } from "@fortawesome/free-solid-svg-icons"
import { clientSide, laptopScreen } from "@/utils/index"

export function LogoNav() {
  const { expanded, setExpanded, setMarginSize } = useContext(SidebarContext)

  const handleMargin = () => {
    setExpanded(!expanded)

    if (clientSide) {
      if (!expanded) {
        if (laptopScreen) {
          return setMarginSize("420")
        }
      }
      return setMarginSize("78")
    }
  }

  return (
    <div className={styles["toggle-wrapper"]}>
      <button
        className={styles["sidebar-btn"]}
        onClick={handleMargin}
        aria-label="Toggle sidebar"
      >
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
