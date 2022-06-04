import { useEffect, useState } from "react"
import { FontAwesomeIcon as FaIcon } from "@fortawesome/react-fontawesome"
import { faAngleUp } from "@fortawesome/free-solid-svg-icons"

export default function BackToTopButton() {
  const [show, setShow] = useState("back-to-top-btn")

  const handleScroll = () => {
    window.scrollY > 400
      ? setShow("back-to-top-btn show")
      : setShow("back-to-top-btn")
  }

  useEffect(() => {
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <button
      className={`${show} `}
      onClick={() => {
        window.scrollTo(0, 0)
      }}
    >
      <FaIcon icon={faAngleUp} size="lg" className="mr-4 ml-2" />
      <strong className="text-lg hidden md:inline-block">Back to top</strong>
    </button>
  )
}
