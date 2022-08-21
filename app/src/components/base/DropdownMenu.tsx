import styles from "@/styles/base/DropdownMenu.module.scss"
import { faGithub } from "@fortawesome/free-brands-svg-icons"
import {
  faBars,
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
          <DropdownItem
            name="Bookmarks and History"
            link="/bookmarks"
            icon={faHistory}
          />
          <DropdownHeader title="Browse" />
          <DropdownItem
            name="Character List"
            link="/characters"
            icon={faList}
          />
          <DropdownItem name="Chapter List" link="/chapters" icon={faList} />
          <DropdownHeader title="Others" />
          <DropdownItem
            name="About this project"
            link="/about"
            icon={faInfoCircle}
          />
          <DropdownItem
            name="Install Searchpets"
            link="/install"
            icon={faDownload}
          />
          <DropdownHeader title="Developers" />
          <DropdownItem name="Housepets API" link="#" icon={faCode} />
          <DropdownItem name="Source Code on GitHub" link="https://github.com/openfurs/searchpets" icon={faGithub} />
          <div className="flex flex-col px-5">
            <hr className="my-2 border-purple-500" />
            <span className="text-sm font-bold">Searchpets v2.0</span>
          </div>
        </div>
      </aside>
    </div>
  )
}
