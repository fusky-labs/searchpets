import { useState, useEffect } from "react"
import { faCaretUp } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import styles from "@/styles/components/BackToTop.module.scss"

export default function BackToTopBtn() {
  const [show, setShow] = useState("back-to-top-btn")

  const handleScroll = () => {
    window.scrollY > 500
      ? setShow(styles.btt.toString())
      : setShow(styles["btt-hidden"].toString())
  }

  useEffect(() => {
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <button
      onClick={() => {
        window.scrollTo(0, 0)
      }}
      className={show}
      aria-label="Back to top"
    >
      <FontAwesomeIcon icon={faCaretUp} />
      <strong>Back to top</strong>
    </button>
  )
}
