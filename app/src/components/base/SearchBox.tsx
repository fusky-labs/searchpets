import styles from "@/styles/components/Searchbox.module.scss"
import { faSearch } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { ExpandSearchContext } from "@/utils/Contexts"
import { useContext } from "react"

export default function SearchBox() {
  const { expanded } = useContext(ExpandSearchContext)

  return (
    <div
      className={styles["search-box-container"]}
      style={{ marginLeft: !expanded ? "10.25rem" : "-1rem" }}
    >
      <span className={styles.icon}>
        <FontAwesomeIcon icon={faSearch} />
      </span>
      <input type="text" placeholder="Search" />
    </div>
  )
}
