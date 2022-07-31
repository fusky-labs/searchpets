import styles from "@/styles/Search.module.scss"
import { faCaretDown } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

export default function SearchContainer({}) {
  return (
    <aside className={styles.wrapper}>
      <input type="text" placeholder="Search" />
      <div className={styles["picker-contents"]}>
        <div className={styles["detail-heading"]}>Filters
        </div>
        <div className={styles["picker-wrapper"]}>
          <section className={styles["picker-container"]}>
            <h2>Chronology</h2>
            <div className={styles["filter-container"]}>
              <span className={styles["filter-item"]}>
                <input type="checkbox" id="chronology" />
                <label htmlFor="chronology">2020</label>
              </span>
              <span className={styles["filter-item"]}>
                <input type="checkbox" id="chronology" />
                <label htmlFor="chronology">2020</label>
              </span>
              <span className={styles["filter-item"]}>
                <input type="checkbox" id="chronology" />
                <label htmlFor="chronology">2020</label>
              </span>
              <span className={styles["filter-item"]}>
                <input type="checkbox" id="chronology" />
                <label htmlFor="chronology">2020</label>
              </span>
            </div>
          </section>
          <section className={styles["picker-container"]}>
            <h2>Chapters</h2>
            <div className={styles["filter-container"]}>
              <span className={styles["filter-item"]}>
                <input type="checkbox" id="chronology" />
                <label htmlFor="chronology">The Heckening</label>
              </span>
              <span className={styles["filter-item"]}>
                <input type="checkbox" id="chronology" />
                <label htmlFor="chronology">The Heckening</label>
              </span>
              <span className={styles["filter-item"]}>
                <input type="checkbox" id="chronology" />
                <label htmlFor="chronology">The Heckening</label>
              </span>
              <span className={styles["filter-item"]}>
                <input type="checkbox" id="chronology" />
                <label htmlFor="chronology">The Heckening</label>
              </span>
            </div>
          </section>
        </div>
      </div>
    </aside>
  )
}
