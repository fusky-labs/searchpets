import Link from "next/link"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import styles from "@/styles/base/DropdownItem.module.scss"
import { useRouter } from "next/router"
import type { IconProp } from "@fortawesome/fontawesome-svg-core"

export default function DropdownItem({
  link = "",
  name,
  icon
}: {
  link: string
  name: string
  icon: IconProp
}) {
  const router = useRouter()

  const linkHandler =
    router.pathname !== link
      ? styles["item"].toString()
      : styles["item-active"].toString()

  return (
    <Link href={link}>
      <a className={linkHandler}>
        <FontAwesomeIcon icon={icon} />
        <span>{name}</span>
      </a>
    </Link>
  )
}
