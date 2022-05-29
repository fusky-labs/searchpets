import { useEffect, useState } from "react"
import { FontAwesomeIcon as FaIcon } from "@fortawesome/react-fontawesome"
import { faAngleUp } from "@fortawesome/free-solid-svg-icons"

export default function BackToTopButton() {
  // Display the button only if the user scrolls down 400px down
  const [show, setShow] = useState(
    "pointer-events-none opacity-0 translate-y-9"
  )

  const handleScroll = () => {
    window.scrollY > 400
      ? setShow("pointer-events-auto opacity-100 translate-y-0")
      : setShow("pointer-events-none opacity-0 translate-y-2")
  }

  useEffect(() => {
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <button
      className={`${show} fixed bottom-0 right-0 m-7 px-5 py-4 z-40 bg-blue-600 hover:bg-blue-700 text-white rounded-md shadow-lg transition-all duration-200 ease-in-out`}
      onClick={() => {
        window.scrollTo(0, 0)
      }}
    >
      <FaIcon icon={faAngleUp} size="lg" className="mr-4 ml-2" />
      <strong className="text-lg hidden md:inline-block">Back to top</strong>
    </button>
  )
}
