import { faExternalLinkAlt } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Image from "next/image"
import Link from "next/link"
interface IComicItemProps {
  title: string
  characters: string
  link: string
  image: string
}

export default function ComicItem({
  title,
  characters,
  link,
  image,
}: IComicItemProps) {
  return (
    <div className="comic-item">
      <h3 className="comic-item__title">"{title}"</h3>
      <div className="comic-item__img">
        <Image
          src={image}
          alt={title}
          objectFit="contain"
          width={1000}
          height={700}
        />
      </div>
      <hr className="border-dashed my-3" />
      <div className="comic-item__lower">
        <div className="comic-item__characters">
          <span className="uppercase text-sm font-bold text-gray-200">
            Characters
          </span>
          <div className="flex gap-x-1 flex-wrap">
            {characters.split(", ").map((character, i) => {
              const characterName = character
                .replace(/(\s)|(\')/g, "-")
                .replace(/(\()|(\))|(\.)/g, "")
                .toLowerCase()
              return (
                <span className={`char-inline ${characterName}`} key={i}>
                  {character}
                </span>
              )
            })}
          </div>
        </div>
        <Link href={link} passHref>
          <a target="_blank" className="comic-item__link">
            Original Link <FontAwesomeIcon icon={faExternalLinkAlt} size="sm" />
          </a>
        </Link>
      </div>
    </div>
  )
}

export function ComicItemLoading() {
  return (
    <div className="comic-item">
      <div className="grid place-items-center h-full">
        <div className="flex flex-col items-center gap-y-3">
          <div id="circle-loader"></div>
          <strong className="text-lg">Loading...</strong>
        </div>
      </div>
    </div>
  )
}
