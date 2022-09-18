import {
  faCircleInfo,
  faTimesCircle,
  faWarning
} from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import styles from "./ToastNotification.module.scss"

interface ToastNotificationProps {
  type: "warning" | "notice" | "error"
  message: string
}

export default function ToastNotification({
  type,
  message
}: ToastNotificationProps) {
  const logoTypes =
    type == "warning"
      ? faWarning
      : type == "notice"
      ? faCircleInfo
      : type == "error"
      ? faTimesCircle
      : faWarning

  return (
    <div className={styles["toast-notification"]}>
      <div>
        <FontAwesomeIcon icon={logoTypes} />
      </div>
      <div className={styles["inline-msg"]}>{message}</div>
    </div>
  )
}
