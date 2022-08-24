import styles from "@/styles/base/DropdownMenu.module.scss"
import { faGithub } from "@fortawesome/free-brands-svg-icons"
import {
  faBars,
  faChartLine,
  faCode,
  faDownload,
  faHistory,
  faInfoCircle,
  faList,
  faSearch
} from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useState } from "react"
import DropdownHeader from "./DropdownHeader"
import DropdownItem from "./DropdownItem"

// prettier-ignore
export default function DropdownMenu() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <div
      className={
        !menuOpen
          ? styles["button-wrapper"].toString()
          : styles["button-wrapper-active"].toString()
      }
    >
      <button
        className={styles["dropdown-btn"]}
        aria-label="Menu"
        title="Menu"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        <FontAwesomeIcon icon={faBars} />
      </button>
      <aside
        className={
          menuOpen
            ? styles["dropdown-wrapper"].toString()
            : styles["dropdown-wrapper-closed"].toString()
        }
      >
        <div className="flex flex-col">
          <DropdownItem name="Search" link="/" icon={faSearch} />
          <DropdownItem name="Bookmarks and History" link="/bookmarks" icon={faHistory} />
          <DropdownHeader title="Browse" />
          <DropdownItem name="Characters List" link="/characters" icon={faList} />
          <DropdownItem name="Chapters List" link="/chapters" icon={faList} />
          <hr className="mx-5 my-1" />
          <DropdownItem name="Search analytics" link="/statistics" icon={faChartLine} />
          <DropdownItem name="About this project" link="/about" icon={faInfoCircle} />
          <DropdownItem name="Install Searchpets" link="/install" icon={faDownload} />
          <DropdownHeader title="Developers" />
          <DropdownItem name="Housepets API" link="#" icon={faCode} />
          <DropdownItem name="Source code on GitHub" link="https://github.com/openfurs/searchpets" icon={faGithub} />
          <span className="px-5 text-sm font-bold mt-1">Searchpets beta v2.0.0</span>
        </div>
      </aside>
    </div>
  )
}
