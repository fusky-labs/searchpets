import styles from "./SearchBox.module.scss"
import {
  faAngleLeft,
  faClose,
  faMagnifyingGlass,
  faQuestion,
  faQuestionCircle,
  faSearch
} from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import SearchDropdown from "./SearchDropdown"
import { useContext } from "react"
import { ModalContext } from "@/utils/Contexts"

export default function SearchBox() {
  const { setModalOpen } = useContext(ModalContext)

  return (
    <div className={styles["search-box-container"]}>
      <div className={styles.root}>
        <button id={styles["mobile-nav"]}>
          <FontAwesomeIcon icon={faAngleLeft} />
        </button>
        <div className={styles["search-box-wrapper"]}>
          <span className={styles.icon}>
            <FontAwesomeIcon icon={faSearch} />
          </span>
          <input type="text" placeholder="Search" />
        </div>
        <div className={styles["search-actions"]}>
          <button id={styles["clear-btn"]} aria-label="Clear results">
            <FontAwesomeIcon icon={faClose} />
          </button>
          <button
            id={styles["help-btn"]}
            aria-label="Show help"
            onClick={() => setModalOpen(true)}
          >
            <FontAwesomeIcon icon={faQuestion} />
          </button>
          <button id={styles["search-btn"]} aria-label="Search">
            <FontAwesomeIcon icon={faSearch} />
          </button>
        </div>
        <button id={styles["mobile-nav"]}>
          <FontAwesomeIcon icon={faMagnifyingGlass} />
        </button>
      </div>
      <div id={styles["dropdown-handler"]}>
        <SearchDropdown />
      </div>
    </div>
  )
}
