import { useState, useEffect } from "react"
import {
  faDisplay,
  faSlidersH,
  faUniversalAccess,
  faWarning
} from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import styles from "@/styles/components/OptionsMenu.module.scss"
import OptionsItem from "./OptionsItem"

export default function OptionsMenu() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <div
      className={
        !menuOpen
          ? styles["button-wrapper"].toString()
          : styles["button-wrapper-active"].toString()
      }
    >
      <button
        aria-label="Options"
        title="Options"
        className={styles.button}
        onClick={() => setMenuOpen((prev) => !prev)}
      >
        <FontAwesomeIcon icon={faSlidersH} />
      </button>
      <div
        className={
          menuOpen
            ? styles["dropdown-wrapper"].toString()
            : styles["dropdown-wrapper-closed"].toString()
        }
      >
        <section className={styles.section}>
          <OptionsItem icon={faDisplay} header="Appearance" />
          <OptionsItem title="Theme" themeItem>
            Changing the theme will override system theme and is applied to this
            browser only
            <span className={styles["override-label"]}>
              THEME OVERWRITTEN &bull; REVERT TO DEFAULT
            </span>
          </OptionsItem>
          <OptionsItem title="Expand width contents">
            Fill comic contents for larger displays
          </OptionsItem>
          <OptionsItem title="Item height">
            Specify comic height, optimal for longer strips of a comic page
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
          <OptionsItem icon={faWarning} header="Danger zone" />
          <div className={styles.toggle}>
            <article>
              <p>Revert to default settings</p>
              <p>
                All existing settings will be reverted to their default settings
              </p>
            </article>
            <button
              className={styles["reset-btn"]}
              aria-label="Reset"
              title="Reset"
            >
              Reset
            </button>
          </div>
        </section>
      </div>
    </div>
  )
}
