import Link from "next/link"
import type { IconDefinition } from "@fortawesome/free-brands-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import styles from "./Navbar.module.scss"

interface NavItemProps {
  name: string
	link: string
  icon: IconDefinition
}

export function NavItem(props: NavItemProps) {
	return (
		<Link href={props.link} role="button" className={styles["nav-list-item"]}>
			<FontAwesomeIcon icon={props.icon} />
			<span>{props.name}</span>
		</Link>
	)
}
