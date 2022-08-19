import { useContext } from "react"
import styles from "@/styles/components/SearchBox.module.scss"
import { faSearch } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { InView } from "react-intersection-observer"
import { SearchLockContext } from "@/utils/Contexts"

export default function SearchBox() {
  const { searchLocked, isSearchLock } = useContext(SearchLockContext)

  return (
    <InView
      rootMargin="40px 0px 0px 0px"
      // onChange={() => {}}
      className={styles.wrapper}
    >
      <div className={styles["search-box-container"]}>
        <span className={styles.icon}>
          <FontAwesomeIcon icon={faSearch} />
        </span>
        <input type="text" placeholder="Search" />
      </div>
    </InView>
  )
}
