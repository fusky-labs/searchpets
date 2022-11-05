import styles from "./SearchInfoItem.module.scss"

interface SearchInfoItemProps {
  comics: string | number
}

export default function SearchInfoItem({ comics }: SearchInfoItemProps) {
  return (
    <div className={styles["info-contents"]} aria-live="polite">
      <span className={styles["results-text"]}>
        {comics !== 0 ? `Returned ${comics} results` : "No results found"}
      </span>
    </div>
  )
}
