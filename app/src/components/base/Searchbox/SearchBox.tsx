import styles from "@/styles/components/Searchbox.module.scss"
import { faClose, faSearch } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import SearchDropdown from "./SearchDropdown"

export default function SearchBox() {
  return (
    <div className={styles["search-box-container"]}>
      <div className={styles["search-box-wrapper"]}>
        <span className={styles.icon}>
          <FontAwesomeIcon icon={faSearch} />
        </span>
        <input type="text" placeholder="Search" />
        <div className={styles["search-actions"]}>
          <button id={styles["clear-btn"]} aria-label="Clear results">
            <FontAwesomeIcon icon={faClose} />
          </button>
          <button id={styles["search-btn"]} aria-label="Search">
            <FontAwesomeIcon icon={faSearch} />
          </button>
        </div>
      </div>
      <div id={styles["dropdown-handler"]}>
        <SearchDropdown />
      </div>
    </div>
  )
}
