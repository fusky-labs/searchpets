import { useState, useEffect, useRef } from "react"
import {
  faDisplay,
  faCog,
  faUniversalAccess,
  faWarning
} from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import styles from "./OptionsMenu.module.scss"
import { OptionsItem } from "./OptionsItem"

export default function OptionsMenu() {
  const [menuOpen, setMenuOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleDropdown = (e: any) => {
      if (!menuRef.current?.contains(e.target)) {
        setMenuOpen(false)
      }
    }

    document.addEventListener("mousedown", handleDropdown)
    return () => document.removeEventListener("mousedown", handleDropdown)
  }, [])

  return (
    <div
      className={
        !menuOpen
          ? styles["button-wrapper"].toString()
          : styles["button-wrapper-active"].toString()
      }
      ref={menuRef}
    >
      <button
        aria-label="Options"
        className={styles.button}
        onClick={() => setMenuOpen(!menuOpen)}
      >
        <FontAwesomeIcon icon={faCog} />
      </button>
      <div
        className={
          menuOpen
            ? styles["sidebar"].toString()
            : styles["sidebar-hidden"].toString()
        }
        aria-hidden={!menuOpen ? "true" : undefined}
      >
        <section className={styles.section}>
          <OptionsItem icon={faDisplay} header="Appearance" />
          <OptionsItem title="Theme" themeItem>
            Changing the theme will override system theme and is applied to this
            browser only
            {/* <span className={styles["override-label"]}>
              THEME OVERWRITTEN &bull; REVERT TO DEFAULT
            </span> */}
          </OptionsItem>
          <OptionsItem title="Results view">
            Fill comic contents for larger displays
          </OptionsItem>
        </section>
        <section className={styles.section}>
          <OptionsItem icon={faUniversalAccess} header="Accessibility" />
          <OptionsItem title="High contrast">
            Provide high contrast colors for legibility
          </OptionsItem>
          <OptionsItem title="Animations">
            NOTE: For people with{" "}
            <a
              className={styles["subtext-link"]}
              href="https://developer.mozilla.org/en-US/docs/Web/CSS/animation#accessibility_concerns"
              target="_blank"
              rel="noreferrer noopener"
            >
              certain disabilities
            </a>
            , you may turn off animations to override this setting
          </OptionsItem>
        </section>
        <section className={styles.section}>
          <OptionsItem icon={faWarning} header="Reset settings" />
          <div className={styles.toggle}>
            <article>
              <p>Revert to default settings</p>
              <p>
                All existing settings will be reverted to their default settings
              </p>
            </article>
            <button className={styles["reset-btn"]} aria-label="Reset">
              Reset
            </button>
          </div>
        </section>
      </div>
    </div>
  )
}
