import { useState } from "react"
import Image from "next/image"
import styles from "@/styles/components/ComicItem.module.scss"
import LoadingCircle from "./LoadingCircle"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faExternalLink,
  faLink,
  faStar
} from "@fortawesome/free-solid-svg-icons"
import Link from "next/link"

export default function ComicItem({
  title,
  img,
  characters,
  link
}: ComicItemProps) {
  const [isLoaded, setIsLoaded] = useState(false)

  return (
    <div
      className={styles.wrapper}
      id={title
        ?.replace(/(\s)|(\')/g, "-")
        .replace(/(\()|(\))|(\.)|(\")|(,)|(\?)|(\!)/g, "")
        .toLowerCase()}
    >
      <div className={styles["heading-container"]}>
        <h2 className={styles.heading}>
          <Link href={link} passHref>
            <a title="Click for original source">
              {title}
              <FontAwesomeIcon
                icon={faLink}
                style={{ marginLeft: "0.65rem" }}
                size="sm"
              />
            </a>
          </Link>
        </h2>
        <div className={styles["heading-actions"]}>
          <button
            className={styles["bookmark-btn"]}
            title="Copy comic link"
            aria-label="Copy comic link"
          >
            <FontAwesomeIcon icon={faExternalLink} size="sm" />
          </button>
          <button
            className={styles["bookmark-btn"]}
            title="Favorite"
            aria-label="Star button, click to bookmark"
          >
            <FontAwesomeIcon icon={faStar} size="sm" />
          </button>
        </div>
      </div>
      <div className={styles["image-container"]}>
        <LoadingCircle hidden={!isLoaded ? false : true} />
        <Image
          src={img}
          loading="lazy"
          alt={`Comic for "${title}", containing characters: ${characters}`}
          objectFit="contain"
          layout="fill"
          quality={75}
          onLoadingComplete={() => setIsLoaded(true)}
        />
      </div>
      <div className={styles["info-container"]}>
        <div>
          <strong className={styles.subheading}>Characters</strong>
          <ul className={styles["characters-list"]}>
            {characters!.map((character: string) => {
              const c = character
                .replace(/(\s)|(\')/g, "-")
                .replace(/(\()|(\))|(\.)|(\")/g, "")
                .toLowerCase()

              return (
                <li
                  key={character}
                  className={styles["char-item"]}
                  style={{
                    backgroundColor: `var(--bg-${c})`,
                    color: `var(--fg-${c})`
                  }}
                >
                  {character}
                </li>
              )
            })}
          </ul>
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
