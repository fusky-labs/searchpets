import { useState, useEffect } from "react"
import {
  faDisplay,
  faSlidersH,
  faTrash,
  faUniversalAccess
} from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import styles from "@/styles/components/Options.module.scss"

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
        onClick={() => setMenuOpen(!menuOpen)}
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
        <section className={styles.theme}>
          <h4>
            <FontAwesomeIcon
              icon={faDisplay}
              style={{ marginRight: "0.35rem" }}
            />
            Appearance
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
          <div className={styles.toggle}>
            <article>
              <p>Expand width contents</p>
              <p className={styles["subtext-wrap"]}>
                Fill comic contents for larger displays
              </p>
            </article>
            <label className={styles.switch}>
              <input type="checkbox" />
              <span className={styles.slider}></span>
            </label>
          </div>
          <div className={styles.toggle}>
            <article>
              <p>Item height</p>
              <p className={styles["subtext-wrap"]}>
                Specify comic height, optimal for longer strips of a comic page
              </p>
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
        <section className={styles.theme}>
          <h4>
            <FontAwesomeIcon
              icon={faTrash}
              style={{ marginRight: "0.35rem" }}
            />
            Danger zone
          </h4>
          <div className={styles.toggle}>
            <article>
              <p>Revert to default settings</p>
              <p>All existing settings will be reverted to their default settings</p>
            </article>
            <button title="Reset settings">
              Reset settings
            </button>
          </div>
        </section>
      </div>
    </div>
  )
}
