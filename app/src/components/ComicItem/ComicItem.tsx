import { useState } from "react"
import Image from "next/image"
import styles from "@/styles/components/ComicItem.module.scss"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faExternalLink,
  faLink,
  faStar
} from "@fortawesome/free-solid-svg-icons"
import Link from "next/link"
import LoadingClient from "../Loading.client"
import CharacterItem from "./CharacterItem"

export default function ComicItem({
  title,
  img,
  characters,
  link
}: ComicItemProps) {
  const [isLoaded, setIsLoaded] = useState(false)

  return (
    <section
      className={styles.wrapper}
      id={title
        ?.replace(/(\s)|(\')/g, "-")
        .replace(/(\()|(\))|(\.)|(\")|(,)|(\?)|(\!)|(\')/g, "")
        .toLowerCase()}
      aria-label={title}
      aria-labelledby={`Contains ${
        characters?.length
      } characters - whom are ${characters?.join(", ")}`}
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
        <LoadingClient hidden={!isLoaded ? false : true} />
        <Image
          src={img}
          loading="lazy"
          alt={`Image comic for "${title}", containing characters: ${characters?.join(
            ", "
          )}`}
          objectFit="contain"
          layout="fill"
          quality={75}
          onLoadingComplete={() => setIsLoaded(true)}
        />
      </div>
      <div
        className={styles["info-container"]}
        aria-label={`This comic contains ${characters?.length} character(s)`}
      >
        <div className={styles.subheading}>
          <strong>Characters</strong>
          <span className={styles.count}>{characters?.length}</span>
        </div>
        <ul className={styles["characters-list"]}>
          {characters!.map((character: string) => (
            <CharacterItem key={character} name={character} />
          ))}
        </ul>
      </div>
    </section>
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
