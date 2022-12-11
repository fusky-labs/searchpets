import { useState } from "react"
import Link from "next/link"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faBars,
  faGear,
  faList,
  faMagnifyingGlass,
  faPaw
} from "@fortawesome/free-solid-svg-icons"
import styles from "./Navbar.module.scss"
import { NavItem } from "./NavItem"
import { Button } from "../../Buttons"
import { Dropdown } from "../Dropdown"

export function Navbar() {
  const [show, setShow] = useState(false)

  const nav = [
    { name: "Search", link: "/", icon: faMagnifyingGlass },
    { name: "Character List", link: "/characters", icon: faPaw },
    { name: "Chapter List", link: "/chapters", icon: faList }
  ]

  return (
    <header className={styles["fixed-nav"]}>
      <div className={styles["nav-row"]}>
        <Button transparent aria-label="Toggle menu">
          <FontAwesomeIcon icon={faBars} size="lg" />
        </Button>
        <Link href="/" className={styles["logo"]}>
          Searchpets!
        </Link>
        <nav>
          <ul className={styles["nav-list"]}>
            {nav.map((item, i) => (
              <li key={i}>
                <NavItem icon={item.icon} name={item.name} link={item.link} />
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <div className={styles["menu-actions"]}>
        <Button transparent aria-label="Site settings" onClick={() => setShow(!show)}>
          <FontAwesomeIcon icon={faGear} fixedWidth />
        </Button>
        <Dropdown dropdownShown={show} />
      </div>
    </header>
  )
}
