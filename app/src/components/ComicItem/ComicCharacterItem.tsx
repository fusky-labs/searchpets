import styles from "./ComicItem.module.scss"
import { faPlus } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { parseRegex } from "@/utils/TextParsers"

export default function CharacterItem({ name }: { name?: string }) {
  const characterName = parseRegex(name)

  return (
    <li
      role="button"
      title="Append character to the search query"
      className={styles["char-item"]}
      style={{
        backgroundColor: `var(--bg-${characterName})`,
        color: `var(--fg-${characterName})`
      }}
    >
      {name}
      <FontAwesomeIcon icon={faPlus} className={styles.spacing} />
    </li>
  )
}
