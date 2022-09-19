import { useState, useEffect } from "react"
import Image from "next/image"
import styles from "./ComicItem.module.scss"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faExternalLink,
  faLink,
  faStar
} from "@fortawesome/free-solid-svg-icons"
import Link from "next/link"
import FoxSpin from "../FoxSpin"
import CharacterItem from "./ComicCharacterItem"
import ParseRegexId from "@/utils/ParseRegexId"

export default function ComicItem({
  title,
  img,
  characters,
  link,
  guestItem,
  favoriteItem
}: ComicItemProps) {
  const [isLoaded, setIsLoaded] = useState(false)
  const [nWidth, setNWidth] = useState<number>()
  const [nHeight, setNHeight] = useState<number>()

  // console.log({ title: title , nw: nWidth, nH: nHeight })

  const comicStyleWrapper = !guestItem
    ? styles.wrapper.toString()
    : styles["wrapper-guest"].toString()

  const regexTitle = ParseRegexId(title)

  useEffect(() => {
    if (nHeight == undefined || nHeight === 1) {
      setNHeight(350)
    }
  }, [nHeight])

  return (
    <section
      className={comicStyleWrapper}
      id={regexTitle}
      aria-label={title}
      style={{ "--comic-height-column": `${nHeight}px` } as React.CSSProperties}
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
          <a
            href={`#${regexTitle}`}
            className={styles["link-btn"]}
            role="button"
            title="Copy comic link"
            aria-label="Copy comic link"
          >
            <FontAwesomeIcon icon={faExternalLink} size="sm" />
          </a>
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
        <FoxSpin hidden={!isLoaded ? false : true} />
        <Image
          src={img}
          loading="lazy"
          alt={`Image comic for "${title}", containing characters: ${characters?.join(
            ", "
          )}`}
          objectFit="contain"
          layout="fill"
          quality={75}
          style={{
            opacity: !isLoaded ? "0" : "1",
            transition: "all ease 420ms"
          }}
          onLoadingComplete={(e) => {
            setIsLoaded(true)
            setNWidth(e.naturalWidth)
            setNHeight(e.naturalHeight)
          }}
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
