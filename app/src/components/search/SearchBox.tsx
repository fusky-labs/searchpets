import styles from "@/styles/components/SearchBox.module.scss"
import { faSearch } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

export default function SearchBox({}) {
  return (
    <div className={styles.wrapper}>
      <div className={styles["search-box-container"]}>
        <span className={styles.icon}>
          <FontAwesomeIcon icon={faSearch} />
        </span>
        <input type="text" placeholder="Search" />
      </div>
    </div>
  )
}
