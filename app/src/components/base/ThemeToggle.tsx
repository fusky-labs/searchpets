import { useState, useEffect } from "react"
import {
  faCheck,
  faSlidersH,
  faSun,
  faUniversalAccess
} from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import styles from "@/styles/components/ThemeToggle.module.scss"

export default function ThemeToggle() {
  // I need to touch some grass
  const [menuOpen, setMenuOpen] = useState(false)
  const [theme, setTheme] = useState("")

  const menuToggle = () => {
    setMenuOpen(!menuOpen)
  }

  return (
    <div
      className={
        !menuOpen
          ? styles["button-wrapper"].toString()
          : styles["button-wrapper-active"].toString()
      }
    >
      <button className={styles.button} onClick={menuToggle}>
        <FontAwesomeIcon icon={faSlidersH} />
      </button>
      <div
        className={
          menuOpen
            ? styles["dropdown-wrapper"].toString()
            : styles["dropdown-wrapper-closed"].toString()
        }
      >
        <section className={styles.theme}>
          <h4>
            <FontAwesomeIcon icon={faSun} style={{ marginRight: "0.35rem" }} />
            Theme
          </h4>
          <div className={styles.toggle}>
            <article>
              <p>Theme</p>
              <p className={styles["subtext-wrap"]}>
                Changing the theme will override system theme and is applied to
                this browser only
              </p>
              <span className={styles["override-label"]}>
                THEME OVERWRITTEN &bull; REVERT TO DEFAULT
              </span>
            </article>
            <label className={styles.switch}>
              <input type="checkbox" />
              <span className={styles.slider}></span>
            </label>
          </div>
        </section>
        <section className={styles.shortcuts}>
          <h4>
            <FontAwesomeIcon
              icon={faUniversalAccess}
              style={{ marginRight: "0.35rem" }}
            />
            Accessibility
          </h4>
          <div className={styles.toggle}>
            <article>
              <p>High contrast</p>
              <p>Provide high contrast colors for legibility</p>
            </article>
            <label className={styles.switch}>
              <input type="checkbox" />
              <span className={styles.slider}></span>
            </label>
          </div>
          <div className={styles.toggle}>
            <article>
              <p>Animations</p>
              <p className={styles["subtext-wrap"]}>
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
              </p>
            </article>
            <label className={styles.switch}>
              <input type="checkbox" />
              <span className={styles.slider}></span>
            </label>
          </div>
        </section>
      </div>
    </div>
  )
}
