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
  const [theme, setTheme] = useState("light")

  const menuToggle = () => {
    setMenuOpen(!menuOpen)

    // if menu is open and if the user clicks anywhere else, close the menu
    if (menuOpen) {
      document.addEventListener("click", () => setMenuOpen(false))
    }
  }

  return (
    <div className={styles["button-wrapper"]}>
      <button className={styles.button} onClick={menuToggle}>
        <FontAwesomeIcon icon={faSlidersH} />
      </button>
      <div className={styles["dropdown-wrapper"]}>
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
            </article>
            <input type="checkbox" />
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
            <input type="checkbox" />
          </div>
          <div className={styles.toggle}>
            <article>
              <p>Shortcuts</p>
              <p>Use keyboard shortcuts for quicker navigation</p>
            </article>
            <input type="checkbox" />
          </div>
          <div className={styles.toggle}>
            <article>
              <p>Animations</p>
              <p className={styles["subtext-wrap"]}>
                NOTE: For people with{" "}
                <a
                  href="https://developer.mozilla.org/en-US/docs/Web/CSS/animation#accessibility_concerns"
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  certain disabilities
                </a>
                , you may turn off animations to override this setting
              </p>
            </article>
            <input type="checkbox" />
          </div>
        </section>
      </div>
    </div>
  )
}
