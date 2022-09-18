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
import FoxSpin from "../FoxSpin"
import CharacterItem from "./ComicCharacterItem"

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
  const comicStyleWrapper = !guestItem
    ? styles.wrapper.toString()
    : styles["wrapper-guest"].toString()

  return (
    <section
      className={comicStyleWrapper}
      id={title
        ?.replace(/(\s)|(\')/g, "-")
        .replace(/(\()|(\))|(\.)|(\")|(,)|(\?)|(\!)|(\')/g, "")
        .toLowerCase()}
      aria-label={title}
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
          <strong>Debug</strong>
        </div>
        <code>
          <DebugContext
            name="Next.js image module - naturalWidth"
            value={nWidth}
          />
          <DebugContext
            name="Next.js image module - naturalHeight"
            value={nHeight}
          />
          <DebugContext
            name="nWidth threshold >450"
            value={nWidth! > 450 ? true : false}
          />
          <DebugContext
            name="nHeight threshold >500"
            value={nHeight! > 500 ? true : false}
          />
          <hr className="my-1.5" />
          <DebugContext
            name="prop.favoriteItem?<expected: bool>"
            value={favoriteItem}
          />
          <DebugContext
            name="prop.guestItem?<expected: bool>"
            value={guestItem}
          />
        </code>
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

export function DebugContext({ name, value }: { name: string; value: any }) {
  return (
    <div
      className={`flex gap-x-2 bg-opacity-25 border-b-2 border-gray-600 ${
        !value ? "bg-red-600" : "bg-green-700"
      }`}
    >
      {name}
      <span className={`px-2 ${!value ? "bg-red-600" : "bg-green-700"}`}>
        {value === undefined ? "undefined" : value!.toString()}
      </span>
    </div>
  )
}
