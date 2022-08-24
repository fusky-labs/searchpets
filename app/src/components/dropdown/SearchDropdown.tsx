import styles from "@/styles/components/SearchDropdown.module.scss"

export default function SearchDropdown() {
  return (
    <div className={styles.wrapper}>
      <span>Filter results</span>
      <button className={styles["filter-block"]}>
        <code>character:</code>
        <code>characters:</code>
        <code>char:</code>
        <span>label</span>
      </button>
      <button className={styles["filter-block"]}>
        <code>chapter:</code>
        <code>chapters:</code>
        <code>ch:</code>
        <span>label</span>
      </button>
      <button className={styles["filter-block"]}>
        <code>year:<strong>&lt;number(s)&gt;</strong></code>
        <code>years:<strong>&lt;number(s)&gt;</strong></code>
        <code>y:<strong>&lt;number(s)&gt;</strong></code>
        <span>label</span>
      </button>
      <button className={styles["filter-block"]}>
        <code>isguest:<strong>&lt;yes|no&gt;</strong></code>
        <span>label</span>
      </button>
      <button className={styles["filter-block"]}>
        <code>"exact match"</code>
        <span>label</span>
      </button>
    </div>
  )
}
