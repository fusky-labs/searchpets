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
import { SidebarItem } from "./SidebarItem"
import { SidebarContext } from "@/utils/Contexts"
import ReactMarkdown from "react-markdown"

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
          <strong className={styles.version} ide-item-on-collapse="">
            Searchpets v2 beta 1
          </strong>
        </div>
      </div>
    </aside>
  )
}
