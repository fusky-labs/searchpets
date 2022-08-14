import styles from "@/styles/components/Filters.module.scss"

export default function FilterItem({ name, yearType }: IFilterItemProps) {
  let finalname = name.toString().replace(/\s/g, "-").toLowerCase()

  return (
    <span className={styles["filter-item"]}>
      <input type="checkbox" id={yearType ? `year-${name}` : finalname} />
      <label htmlFor={yearType ? `year-${name}` : finalname}>{name}</label>
    </span>
  )
}
