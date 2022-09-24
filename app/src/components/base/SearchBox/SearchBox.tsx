import { useContext, useEffect, useState, useRef } from "react"
import styles from "./SearchBox.module.scss"
import {
  faAngleLeft,
  faClose,
  faMagnifyingGlass,
  faQuestionCircle,
  faSearch
} from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import SearchDropdown from "./SearchDropdown"
import { ModalContext } from "@/utils/Contexts"

export default function SearchBox() {
  const { setModalOpen } = useContext(ModalContext)

  // Handle searchbox input state
  const [inputVal, setInputVal] = useState("")
  const [hasInput, setHasInput] = useState(false)

  const handleInput = (e: any) => {
    setInputVal(e.target.value)
    if (inputVal === "") {
      setHasInput(false)
    }
  }

  const resetInput = () => {
    setInputVal("")
  }

  const clearStyles = !hasInput
    ? styles["clear-btn-hidden"].toString()
    : styles["clear-btn"].toString()

  useEffect(() => {
    setHasInput(inputVal !== "" ? true : false)
  }, [inputVal])

  // Handle focus on searchbox state
  const [searchFocus, setSearchFocus] = useState(false)
  const searchRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const keyboardSearch = (e: KeyboardEvent) => {
      if (e.key === "Escape") return setSearchFocus(false)

      if (e.ctrlKey) {
        if (e.key === "/") {
          setModalOpen(true)
          setSearchFocus(false)
        }
      }
    }

    const handleSearch = (e: any) => {
      if (!searchRef.current?.contains(e.target)) {
        setSearchFocus(false)
        return
      }
      setSearchFocus(true)
    }

    document.addEventListener("mousedown", handleSearch)
    document.addEventListener("keydown", keyboardSearch)

    return () => {
      document.removeEventListener("mousedown", handleSearch)
      document.removeEventListener("keydown", keyboardSearch)
    }
  }, [setModalOpen])

  return (
    <div
      className={styles["search-box-container"]}
      data-focus={searchFocus ? true : false}
      ref={searchRef}
    >
      <div className={styles.root} suppressContentEditableWarning>
        <button id={styles["mobile-nav"]}>
          <FontAwesomeIcon icon={faAngleLeft} />
        </button>
        <div
          className={styles["search-box-wrapper"]}
          role="searchbox"
          suppressContentEditableWarning
          contentEditable
        >
          <span className={styles.icon}>
            <FontAwesomeIcon icon={faSearch} />
          </span>
          <input
            type="text"
            placeholder={!searchFocus ? "Search" : "Press Ctrl+/ for help"}
            value={inputVal}
            onChange={handleInput}
          />
        </div>
        <div className={styles["search-actions"]}>
          <button
            id={clearStyles}
            aria-label="Clear results"
            onClick={resetInput}
          >
            <FontAwesomeIcon icon={faClose} />
          </button>
          <button
            id={styles["help-btn"]}
            aria-label="Show help"
            onClick={() => setModalOpen(true)}
          >
            <FontAwesomeIcon icon={faQuestionCircle} />
          </button>
          <button id={styles["search-btn"]} aria-label="Search">
            <FontAwesomeIcon icon={faSearch} />
          </button>
        </div>
        <button id={styles["mobile-nav"]}>
          <FontAwesomeIcon icon={faMagnifyingGlass} />
        </button>
      </div>
      <div
        id={styles["dropdown-handler"]}
        aria-hidden={!searchFocus ? true : undefined}
      >
        <SearchDropdown />
      </div>
    </div>
  )
}
