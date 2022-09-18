import { useContext, useRef, useEffect } from "react"
import { ModalContext } from "@/utils/Contexts"
import { faClose } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import styles from "./ModalBase.module.scss"

export default function ModalBase({
  component,
  heading,
  hidden
}: {
  component?: NonNullable<React.ReactElement> | undefined
  heading: string
  hidden?: boolean
}) {
  const { setModalOpen } = useContext(ModalContext)
  const modalRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const escapeModal = (e: KeyboardEvent) => {
      if (e.key === "Escape") return setModalOpen(false)
    }

    document.addEventListener("keydown", escapeModal)
    return () => document.removeEventListener("keydown", escapeModal)
  })

  return (
    <div
      ref={modalRef}
      className={styles.wrapper.toString()}
      aria-hidden={!hidden ? undefined : "true"}
    >
      <div
        className={styles.container}
        tabIndex={-1}
        role="dialog"
        aria-labelledby="dialogTitle"
      >
        <div className={styles.heading}>
          <h3 id="dialogTitle">{heading}</h3>
          <button
            aria-label="Close dialog box"
            onClick={() => setModalOpen(false)}
          >
            <FontAwesomeIcon icon={faClose} />
          </button>
        </div>
        <article>{component}</article>
      </div>
    </div>
  )
}
