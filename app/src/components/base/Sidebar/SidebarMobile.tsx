import { useState, useEffect, useRef, useContext } from "react"
import { SidebarContext } from "@/utils/Contexts"
import styles from "./SidebarMobile.module.scss"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faAngleLeft } from "@fortawesome/free-solid-svg-icons"

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
        <button
          className="border-2 border-white px-5 py-4"
          onClick={() => setExpanded(false)}
        >
          <FontAwesomeIcon icon={faAngleLeft} />
        </button>
        Some content here
      </aside>
      <div className={styles.backdrop} aria-hidden="true"></div>
    </>
  )
}
