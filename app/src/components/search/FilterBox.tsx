import { useRef, useState, useLayoutEffect } from "react"
import styles from "@/styles/components/Filters.module.scss"
import FilterItem from "./FilterItem"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faFilter } from "@fortawesome/free-solid-svg-icons"

export default function SearchContainer() {
  const generateYears = () => {
    const currentYear = new Date().getFullYear()
    const years = []
    for (let i = 2008; i <= currentYear; i++) {
      years.push(i.toString())
    }
    return years
  }

  const yearList = generateYears()

  const [filterHeight, setFilterHeight] = useState(45)
  const [showFilter, setShowFilter] = useState(true)
  const filterRef = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    if (!showFilter) return setFilterHeight(filterRef.current!.scrollHeight)
    if (window.matchMedia("(min-width: 768px)").matches) return setFilterHeight(45)
    setFilterHeight(100)
  }, [showFilter])

  return (
    <div
      className={styles.wrapper}
      style={{
        height: `${filterHeight}px`
      }}
      ref={filterRef}
    >
      <div className={styles.heading}>
        <button
          className={!showFilter ? styles.active.toString() : ""}
          onClick={() => setShowFilter(!showFilter)}
        >
          <FontAwesomeIcon icon={faFilter} style={{ marginRight: "0.5rem" }} />
          Filters
        </button>
        <strong>Results returned text</strong>
      </div>
      <div className={styles["picker-wrapper"]}>
        <section className={styles["picker-container"]}>
          <h3>Chronology</h3>
          <div className={styles["filter-container"]}>
            {yearList.map((year) => {
              return <FilterItem yearType key={year} name={year} />
            })}
          </div>
        </section>
        <section className={styles["picker-container"]}>
          <h3>Chapters</h3>
          <div className={styles["filter-container"]}>
            <FilterItem name="The Heckening" />
            <FilterItem name="The Heckening 2" />
            <FilterItem name="The Heckening 3" />
          </div>
        </section>
        <section className={styles["picker-container"]}>
          <h3>Miscellaneous</h3>
          <div className={styles["filter-container"]}>
            <FilterItem name="Display guest comics" />
          </div>
        </section>
      </div>
    </div>
  )
}
