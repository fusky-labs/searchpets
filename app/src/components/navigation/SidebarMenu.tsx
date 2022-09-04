import { useState } from "react"
import styles from "@/styles/base/SidebarMenu.module.scss"
import { faGithub } from "@fortawesome/free-brands-svg-icons"
import {
  faCode,
  faDownload,
  faHistory,
  faInfoCircle,
  faList,
  faSearch
} from "@fortawesome/free-solid-svg-icons"
import SidebarItem from "./SidebarItem"

export default function SidebarMenu() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <aside
      className={
        !menuOpen
          ? styles["dropdown-wrapper"].toString()
          : styles["dropdown-wrapper-closed"].toString()
      }
    >
      <nav className={styles["menu-nav"]}>
        <SidebarItem name="Search" link="/" icon={faSearch} />
        <SidebarItem name="Character List" link="/characters" icon={faList} />
        <SidebarItem name="Chapter List" icon={faList} disabled />
        <SidebarItem
          name="About this project"
          link="/about"
          icon={faInfoCircle}
        />
        <hr className={styles.separator} />
        <SidebarItem name="Bookmarks and History" icon={faHistory} disabled />
        <SidebarItem name="Install Searchpets" icon={faDownload} disabled />
        <hr className={styles.separator} />
        <SidebarItem name="Housepets API" icon={faCode} disabled />
        <SidebarItem
          name="Source code on GitHub"
          link="https://github.com/openfurs/searchpets"
          icon={faGithub}
        />
        <hr className={styles.separator} />
      </nav>
      <div className={styles["about-section"]}>
        <p>
          <strong className={styles.emphasis}>Searchpets!</strong> is an
          open-source project for searching the entire <em>Housepets!</em> web
          comic catalog by Rick Griffin.
        </p>
        <span className={styles.version}>Searchpets v2 beta 1</span>
      </div>
    </aside>
  )
}
