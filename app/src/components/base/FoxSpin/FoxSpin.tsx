import Image from "next/image"
import styles from "./FoxSpin.module.scss"

export default function FoxSpin({ hidden }: { hidden: boolean }) {
  return (
    <div id={styles.wrapper} style={{ display: hidden ? "none" : undefined }}>
      <Image
        id={styles["fox-speen"]}
        src="/static/foxplushie_loading.png"
        alt="Loading..."
        width="120"
        height="120"
        priority
      />
      <strong>Loading...</strong>
    </div>
  )
}
