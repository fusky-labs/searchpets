import styles from "./SearchDropdown.module.scss"

export default function SearchDropdown() {
  return (
    <div className={styles.wrapper}>
      <span>Filter results</span>
      <InlayTemplate
        items={["character:", "characters:", "char:"]}
        label="Yeet"
      />
      <InlayTemplate
        items={["chapter:", "chapters:", "ch:"]}
        label="Search by chapters"
      />
      <InlayTemplate
        items={["year:", "years:", "y:"]}
        label="Search by years"
      />
      <InlayTemplate items={['"exact match"']} label="Look for exact matches" />
    </div>
  )
}

interface InlayTemplateProps {
  items: string[]
  label: string
}

export function InlayTemplate({ items, label }: InlayTemplateProps) {
  return (
    <button className={styles["filter-block"]}>
      {items!.map((i) => (
        <code aria-hidden="true" key={i}>
          {i}
        </code>
      ))}
      <span>{label}</span>
    </button>
  )
}
