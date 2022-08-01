import { useRef, useState, useLayoutEffect } from "react"
import styles from "@/styles/Search.module.scss"
import { IFilterItemProps } from "@/utils/Interfaces"
import { faCaretDown } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

export default function SearchContainer() {
  // Generate a list of years from 2008 to the current year as strings
  const generateYears = () => {
    const currentYear = new Date().getFullYear()
    const years = []
    for (let i = 2008; i <= currentYear; i++) {
      years.push(i.toString())
    }
    return years
  }

  const yearList = generateYears()

  // Get the current height of the filter container based on the height of the element
  // const [filterHeight, setFilterHeight] = useState(45)
  // const filterRef = useRef<HTMLDivElement>(null)

  // useLayoutEffect(() => {
  //   setFilterHeight(filterRef.current!.clientHeight)
  // }, [])

  return (
    <div className={styles.wrapper}>
      <div className={styles["search-box-container"]}>
        <input type="text" placeholder="Search" />
      </div>
      <div
        className={styles["picker-contents"]}
/*         style={{ "height": `${filterHeight}px` }}
        ref={filterRef} */
      >
        <div className={styles["detail-heading"]}>
          <h2>Filters</h2>
          <FontAwesomeIcon icon={faCaretDown} />
        </div>
        <div className={styles["picker-wrapper"]}>
          <section className={styles["picker-container"]}>
            <h2>Chronology</h2>
            <div className={styles["filter-container"]}>
              {yearList.map((year) => {
                return <FilterItem yearType key={year} name={year} />
              })}
            </div>
          </section>
          <section className={styles["picker-container"]}>
            <h2>Chapters</h2>
            <div className={styles["filter-container"]}>
              <FilterItem name="The Heckening" />
              <FilterItem name="The Heckening 2" />
              <FilterItem name="The Heckening 3" />
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}

export function FilterItem({ name, yearType }: IFilterItemProps) {
  let finalname = name.toString().replace(/\s/g, "-").toLowerCase()

  return (
    <span className={styles["filter-item"]}>
      <input type="checkbox" id={yearType ? `year-${name}` : finalname} />
      <label htmlFor={yearType ? `year-${name}` : finalname}>{name}</label>
    </span>
  )
}
