import { useContext, useEffect, useRef, useState } from "react"
import { ModalContext } from "@/utils/Contexts"
import { faClose } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import styles from "./ModalBase.module.scss"

interface ModalBaseProps {
  component?: NonNullable<React.ReactElement> | undefined
  heading: string
  hidden?: boolean
}

export default function ModalBase({
  component,
  heading,
  hidden
}: ModalBaseProps) {
  const { modalOpen, setModalOpen } = useContext(ModalContext)
  const [stateClear, setStateClear] = useState(true)
  const rootModalRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const escapeModal = (e: KeyboardEvent) => {
      if (e.key === "Escape") return setModalOpen(false)
    }

    if (!modalOpen) {
      setTimeout(() => {
        rootModalRef.current!.style.display = "none"
        setStateClear(true)
      }, 500)
    }

    rootModalRef.current!.style.display = ""
    setStateClear(false)

    document.addEventListener("keydown", escapeModal)
    return () => document.removeEventListener("keydown", escapeModal)
  }, [modalOpen, setModalOpen])

  return (
    <>
      <div
        className={styles.wrapper.toString()}
        aria-hidden={!hidden ? undefined : "true"}
        ref={rootModalRef}
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
          {stateClear ? null : <article>{component}</article>}
        </div>
      </div>
      <div
        id={styles.backdrop}
        aria-hidden="true"
        onClick={() => setModalOpen(false)}
      ></div>
    </>
  )
}
