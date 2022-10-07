import { useState, useEffect, useRef, useContext } from "react"
import { SidebarContext } from "@/utils/Contexts"
import styles from "./SidebarMobile.module.scss"
import {
  faCode,
  faDownload,
  faHistory,
  faInfoCircle,
  faList,
  faSearch,
  faPaw,
  faWrench
} from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faAngleLeft } from "@fortawesome/free-solid-svg-icons"
import { SidebarItem } from "./SidebarItem"
import { faGithub } from "@fortawesome/free-brands-svg-icons"

export function SidebarMobile() {
  const { expanded, setExpanded } = useContext(SidebarContext)

  return (
    <>
      <aside
        className={
          !expanded
            ? styles["sidebar-hidden"].toString()
            : styles["sidebar"].toString()
        }
        aria-hidden={!expanded ? "true" : undefined}
      >
        <div className="px-4 pt-2 flex items-center gap-x-3">
          <button className="px-5 py-3" onClick={() => setExpanded(false)}>
            <FontAwesomeIcon icon={faAngleLeft} />
          </button>
          <strong className="text-[1.75rem] italic">Searchpets!</strong>
        </div>
        <div className={styles.contents}>
          <hr className={styles.separator} />
          <SidebarItem icon={faSearch} link="/search" name="Search" />
          <SidebarItem
            icon={faHistory}
            link="/history"
            name="Bookmarks and History"
						disabled
          />
          <SidebarItem icon={faPaw} link="/characters" name="Character List" />
          <SidebarItem
            icon={faList}
            link="/chapters"
            name="Chapter List"
            disabled
          />
          <SidebarItem icon={faInfoCircle} link="/about" name="About" />
          <SidebarItem name="Support us on Ko-fi!" kofi />
          <hr className={styles.separator} />
          <div className={styles.heading}>Settings</div>
          <SidebarOptionItem name="Theme" />
          <SidebarOptionItem name="Animations" />
          <SidebarOptionItem name="Animations" />
          <hr className={styles.separator} />
          <div className={styles.heading}>Miscellaneous</div>
          <SidebarItem
            name="Housepets API"
            icon={faCode}
            disabled
            hideOnCollapse
          />
          <SidebarItem
            name="Searchpets! Source code"
            link="https://github.com/openfurs/searchpets"
            icon={faGithub}
            hideOnCollapse
          />
          <hr className={styles.separator} />
          <div className={styles.heading}>Debug</div>
          <SidebarDevItem title="Mobile" out="No" />
          <SidebarDevItem title="Environment" out="Dev" />
          <SidebarDevItem title="Database output" out="Redis/JSON" />
        </div>
      </aside>
      <div className={styles.backdrop} aria-hidden="true"></div>
    </>
  )
}

export function SidebarOptionItem({ name }: { name?: string }) {
  return <div className="px-8 py-3">{name}</div>
}

interface SDIProps {
  title?: string
  out?: any
}

export function SidebarDevItem({ title = "Title", out = "Output" }: SDIProps) {
  return (
    <div className="px-8 py-2.5 flex justify-between">
      <span className="flex gap-x-3 items-center">
        <FontAwesomeIcon icon={faWrench} />
        {title}
      </span>
      <span>{out}</span>
    </div>
  )
}
