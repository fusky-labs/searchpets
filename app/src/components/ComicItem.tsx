import { useState } from "react"
import Image from "next/image"
import styles from "@/styles/components/ComicItem.module.scss"
import LoadingCircle from "./LoadingCircle"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faBookmark } from "@fortawesome/free-solid-svg-icons"

export default function ComicItem({ title, img, characters }: IComicItemProps) {
  const [isLoaded, setIsLoaded] = useState(false)

  return (
    <div className={styles.wrapper}>
      <div className={styles["heading-container"]}>
        <h2 className={styles.heading}>{title}</h2>
        <button className={styles["bookmark-btn"]}>
          <FontAwesomeIcon icon={faBookmark} size="sm" />
        </button>
      </div>
      <div className={styles["image-container"]}>
        <LoadingCircle hidden={isLoaded !== true ? false : true} />
        <Image
          src={img}
          loading="lazy"
          alt="comic"
          objectFit="contain"
          layout="fill"
          quality={75}
          onLoadingComplete={() => setIsLoaded(true)}
        />
      </div>
      <div className={styles["info-container"]}>
        <div>
          <strong className={styles.subheading}>Characters</strong>
          {/* <ul className={styles["characters-list"]}>
            {characters!.map((character: string) => (
              <li key={character}>{character}</li>
            ))}
          </ul> */}
          <ul className={styles["characters-list"]}></ul>
        </div>
      </div>
    </div>
  )
}

export function ComicItemLoading() {
  return (
    <div className={styles.wrapper}>
      <div className={styles["loading-container"]}></div>
      <div className={styles["loading-container"]}></div>
      <div className={styles["loading-container"]}></div>
    </div>
  )
}
