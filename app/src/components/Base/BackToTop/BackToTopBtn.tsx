import { useState, useEffect } from "react"
import { faAngleUp } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import styles from "./BackToTop.module.scss"

export default function BackToTopBtn() {
  const [show, setShow] = useState(styles["btt-hidden"].toString())

  useEffect(() => {
    const handleScroll = () => {
      window.scrollY > 350
        ? setShow(styles.btt.toString())
        : setShow(styles["btt-hidden"].toString())
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <button
      onClick={() => window.scrollTo(0, 0)}
      className={show}
      aria-label="Back to top"
    >
      <FontAwesomeIcon icon={faAngleUp} />
      <strong>Back to top</strong>
    </button>
  )
}
