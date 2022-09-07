import styles from "@/styles/components/Searchbox.module.scss"
import { faSearch } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import SearchDropdown from "./SearchDropdown"

export default function SearchBox() {
  return (
    <div className={styles["search-box-container"]}>
      <span className={styles.icon}>
        <FontAwesomeIcon icon={faSearch} />
      </span>
      <input type="text" placeholder="Search" />
      <div id={styles["dropdown-handler"]}>
        <SearchDropdown />
      </div>
    </div>
  )
}
