import styles from "@/styles/components/SearchBox.module.scss"

export default function SearchBox({}) {
  return (
    <div className={styles.wrapper}>
      <div className={styles["search-box-container"]}>
        <input type="text" placeholder="Search" />
      </div>
    </div>
  )
}
