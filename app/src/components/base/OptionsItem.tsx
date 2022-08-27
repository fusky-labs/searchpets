import { useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import styles from "@/styles/components/OptionsItem.module.scss"

export default function OptionsItem({
  title,
  header,
  icon,
  children,
  state,
  themeItem
}: {
  title?: string
  header?: string | boolean
  icon?: any
  children?: React.ReactNode
  state?: boolean
  themeItem?: boolean
}) {
  const [checked, isChecked] = useState<boolean | undefined>()

  const handleChange = (event: any) => {}

  if (header)
    return (
      <h4>
        <FontAwesomeIcon icon={icon} style={{ marginRight: "0.35rem" }} />
        {header}
      </h4>
    )

  return (
    <div className={styles.toggle}>
      <article>
        <p>{title}</p>
        <p className={styles["subtext-wrap"]}>{children}</p>
      </article>
      <label className={styles.switch}>
        <input type="checkbox" onChange={handleChange} checked={checked} />
        <span
          className={
            !themeItem
              ? styles.slider.toString()
              : styles["theme-slider"].toString()
          }
        ></span>
      </label>
    </div>
  )
}
