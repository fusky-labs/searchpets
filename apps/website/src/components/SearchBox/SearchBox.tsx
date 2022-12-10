import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import styles from "./SearchBox.module.scss"

export default function SearchBox() {
  return (
    <div id={styles["wrapper"]}>
      <div className={styles["form-container"]}>
        <input
          type="search"
          className={styles["form-input"]}
          placeholder="Search (ex: Grape disturbing Peanut for the 69th time)"
          aria-label="Search"
          autoCapitalize="false"
          spellCheck="false"
          autoComplete="false"
          autoCorrect="false"
        />
        <span id={styles["icon"]}>
          <FontAwesomeIcon icon={faMagnifyingGlass} />
        </span>
      </div>
			<div className={styles["autocomplete-container"]} role="listitem">
				lmao
			</div>
    </div>
  )
}
