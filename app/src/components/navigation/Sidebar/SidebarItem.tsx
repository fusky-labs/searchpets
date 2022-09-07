import Link from "next/link"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import styles from "@/styles/base/Sidebar.module.scss"
import { useRouter } from "next/router"
import Image from "next/image"

export function SidebarItem({
  link = "",
  name,
  icon,
  disabled,
  header,
  kofi,
  hideOnCollapse
}: SidebarItemProps) {
  const router = useRouter()

  // prettier-ignore
  const linkHandler = router.pathname !== link
    ? styles["item"].toString()
    : styles["item-active"].toString()

  if (header) return <span className={styles.heading}>{header}</span>

  if (disabled)
    return (
      <div
        className={styles["item-disabled"]}
        aria-disabled="true"
        aria-label={name}
        role="link"
        hide-item-on-collapse={!hideOnCollapse ? null : ""}
      >
        <FontAwesomeIcon icon={icon} size="1x" />
        <span className={styles.text}>{name}</span>
        <div className={styles.tooltip}>
          This feature has been planned but still currently in the works or not
          working as expected
        </div>
      </div>
    )

  if (kofi)
    return (
      <Link href="https://ko-fi.com/openfurs">
        <a className={styles["item-kofi"]} aria-label={name}>
          <div className={styles["logo-wrapper"]}>
            <Image
              src="/static/kofilogo.png"
              alt="Ko-fi icon"
              layout="fill"
              objectFit="cover"
              priority
            />
          </div>
          <span className={styles.text}>{name}</span>
        </a>
      </Link>
    )

  return (
    <Link href={link}>
      <a
        className={linkHandler}
        aria-label={name}
        hide-item-on-collapse={!hideOnCollapse ? null : ""}
      >
        <FontAwesomeIcon icon={icon} size="1x" />
        <span className={styles.text}>{name}</span>
      </a>
    </Link>
  )
}
