import Link from "next/link"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import styles from "@/styles/base/SidebarItem.module.scss"
import { useRouter } from "next/router"
import type { IconProp } from "@fortawesome/fontawesome-svg-core"

export default function SidebarItem({
  link = "",
  name,
  icon,
  disabled,
  header
}: {
  link?: string
  name?: string
  icon?: IconProp | any
  disabled?: boolean
  header?: string
}) {
  const router = useRouter()

  // prettier-ignore
  const linkHandler = router.pathname !== link ? styles["item"].toString() : styles["item-active"].toString()

  if (header) return <span className={styles.heading}>{header}</span>

  if (disabled)
    return (
      <div className={styles["item-disabled"]} aria-disabled="true" role="link">
        <FontAwesomeIcon icon={icon} size="1x" />
        <span>{name}</span>
        <div className={styles.tooltip}>
          This feature has been planned but still currently in the works or not
          working as expected
        </div>
      </div>
    )

  return (
    <Link href={link}>
      <a className={linkHandler}>
        <FontAwesomeIcon icon={icon} size="1x" />
        <span>{name}</span>
      </a>
    </Link>
  )
}
