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
          <DropdownItem
            name="Characters List"
            link="/characters"
            icon={faList}
          />
          <DropdownItem name="Chapters List" icon={faList} disabled />
          <DropdownItem
            name="About this project"
            link="/about"
            icon={faInfoCircle}
          />
          <hr className="mx-5 my-1" />
          <DropdownItem
            name="Bookmarks and History"
            icon={faHistory}
            disabled
          />
          <DropdownItem name="Install Searchpets" icon={faDownload} disabled />
          <hr className="mx-5 my-1" />
          <DropdownItem name="Housepets API" icon={faCode} disabled />
          <DropdownItem
            name="Source code on GitHub"
            link="https://github.com/openfurs/searchpets"
            icon={faGithub}
          />
          <hr className="mx-5 my-2" />
          <div className="px-5 text-[0.8rem]">
            <p className="w-[18.5rem]">
              <span className="font-bold italic">Searchpets!</span> is an open-source project for searching the entire{" "}
              <em>Housepets!</em> web comic catalog by Rick Griffin.
            </p>
            <span className="font-bold my-1">Searchpets v2 beta 1</span>
          </div>
        </div>
      </aside>
    </div>
  )
}
