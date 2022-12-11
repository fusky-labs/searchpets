import { Button } from "./Button"
import { faChevronUp } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import useScrollScreen from "@/hooks/useScrollScreen"

export function BackToTop() {
  const scroll = useScrollScreen({ value: 69 })

  return (
    <Button className={scroll ? "block" : "hidden"}>
      <FontAwesomeIcon icon={faChevronUp} />
      <span>Back to top</span>
    </Button>
  )
}
