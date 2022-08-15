import { faSlidersH } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useState, useEffect } from "react"
import styles from "@/styles/components/ThemeToggle.module.scss"

export default function ThemeToggle() {
  return (
    <div className={styles["button"]}>
      <button>
        <FontAwesomeIcon icon={faSlidersH} />
      </button>
    </div>
  )
}
