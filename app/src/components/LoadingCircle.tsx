import styles from "@/styles/LoadingCircle.module.scss"

export default function LoadingCircle({ hidden }: { hidden?: boolean }) {
  return (
    <div
      className={
        hidden !== true
        ? styles.wrapper.toString()
        : styles["wrapper-hidden"].toString()
      }
    >
      <div className={styles.circle}>
        <svg>
          <circle
            cx="50"
            cy="50"
            r="35"
            stroke="black"
            className={styles.circle}
          />
        </svg>
      </div>
      <span id={styles.label}>Loading...</span>
    </div>
  )
}
