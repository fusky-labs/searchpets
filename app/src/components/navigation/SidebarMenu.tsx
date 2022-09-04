import { useContext, useState } from "react"
import styles from "@/styles/base/SidebarMenu.module.scss"
import { faGithub } from "@fortawesome/free-brands-svg-icons"
import {
  faCode,
  faDownload,
  faHistory,
  faInfoCircle,
  faList,
  faSearch,
  faPaw
} from "@fortawesome/free-solid-svg-icons"
import SidebarItem from "./SidebarItem"
import { SidebarContext } from "@/utils/Contexts"

export default function SidebarMenu() {
  const { expanded } = useContext(SidebarContext)

  return (
    <aside
      className={
        !expanded
          ? styles["sidebar-hidden"].toString()
          : styles["sidebar"].toString()
      }
    >
      <nav className={styles["menu-nav"]}>
        <SidebarItem name="Search" link="/" icon={faSearch} />
        <SidebarItem name="Character List" link="/characters" icon={faPaw} />
        <SidebarItem name="Chapter List" icon={faList} disabled />
        <hr className={styles.separator} hide-item-on-collapse="" />
        <SidebarItem name="Bookmarks and History" icon={faHistory} disabled />
        <SidebarItem
          name="Install Searchpets"
          icon={faDownload}
          disabled
          hideOnCollapse
        />
        <hr className={styles.separator} hide-item-on-collapse="" />
        <SidebarItem
          name="Housepets API"
          icon={faCode}
          disabled
          hideOnCollapse
        />
        <SidebarItem
          name="About this project"
          link="/about"
          icon={faInfoCircle}
        />
        <SidebarItem
          name="Source code on GitHub"
          link="https://github.com/openfurs/searchpets"
          icon={faGithub}
          hideOnCollapse
        />
        <SidebarItem name="Support us on Ko-fi!" kofi />
        <hr className={styles.separator} hide-item-on-collapse="" />
      </nav>
      <strong className={styles.version}>Searchpets v2 beta 1</strong>
    </aside>
  )
}
