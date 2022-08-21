import { useContext } from "react"
import Link from "next/link"
import styles from "@/styles/base/Navbar.module.scss"
import OptionsMenu from "./OptionsMenu"
import DropdownMenu from "./DropdownMenu"
import SearchBox from "./SearchBox"
import { ExpandSearchContext } from "@/utils/Contexts"

export default function Navbar() {
  const { expanded } = useContext(ExpandSearchContext)

  return (
    <header className={styles.root}>
      <div className={styles.wrapper}>
        <div className={styles["nav-container"]}>
          <DropdownMenu />
          <strong style={{ opacity: !expanded ? "1" : "0" }}>
            <Link href="/">
              <a className={styles["logo-handler"]}>
                <span className={styles.logo}>Searchpets!</span>
              </a>
            </Link>
          </strong>
          <SearchBox />
        </div>
        <OptionsMenu />
      </div>
    </header>
  )
}
