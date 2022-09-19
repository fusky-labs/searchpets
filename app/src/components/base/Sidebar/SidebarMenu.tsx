import { useContext, useState } from "react"
import styles from "@/styles/base/Sidebar.module.scss"
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
import { SidebarItem } from "./SidebarItem"
import { SidebarContext } from "@/utils/Contexts"
import ReactMarkdown from "react-markdown"

export default function Sidebar() {
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
        <SidebarItem name="Search" link="/search" icon={faSearch} />
        <SidebarItem name="Character List" link="/characters" icon={faPaw} />
        <hr className={styles.separator} />
        <SidebarItem name="Bookmarks and History" icon={faHistory} disabled />
        <SidebarItem
          name="Install Searchpets"
          icon={faDownload}
          disabled
          hideOnCollapse
        />
        <hr className={styles.separator} />
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
        <hr className={styles.separator} />
      </nav>
      <div id={styles["disclaimer-note"]}>
        <div id={styles.wrapper}>
          <ReactMarkdown>
            _Searchpets!_ is an open source fan project. SP does not own any of
            the contents used on this website and has no direct affiliation with
            _Housepets!_ or all of Rick Griffin's intellectual property.
          </ReactMarkdown>
          <span
            className={styles.copyright}
          >{`© ${new Date().getFullYear()} OpenFurs`}</span>
          <strong className={styles.version} data-hide-item-on-collapse="">
            Searchpets release v2.0.0
          </strong>
        </div>
      </div>
    </aside>
  )
}
