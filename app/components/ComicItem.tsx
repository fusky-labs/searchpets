import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Image from 'next/image';
import Link from 'next/link';

interface IComicItemProps {
  title?: string;
  characters: string;
  link: string;
  image: string;
}

export default function ComicItem({
  title, characters, link, image
}: IComicItemProps) {
  return (
    <div className="comic-item">
      <h3 className="comic-item__title">&#34;{title}&#34;</h3>
      <div className="pointer-events-none">
        <Image
          src={image}
          alt={title}
          objectFit="contain"
          width={900}
          height={700}
          />
      </div>
      <div className="comic-item__lower">
        <div className="comic-item__characters">
          <span className="uppercase text-sm">Characters</span>
          {
            characters.split(', ').map((character, index) => {
              const characterName = character.replace(/\s+/g, '-').toLowerCase();
              return (
                <div id={characterName}>
                  <span>{character}</span>
                </div>
              );
            }
          )}
        </div>
        <Link href={link} passHref>
          <a target="_blank" className="comic-item__link">
            Original Link{" "}
            <FontAwesomeIcon icon={['fas', 'external-link-alt']} size="sm" />
          </a>
        </Link>
      </div>
    </div>
  );
}

export function ComicItemLoading() {
  return(
    <div id="comic-item">
      <h3 className="text-lg text-center italic">Loading...</h3>
      <div className="flex justify-between">
        <span>Loading...</span>
      </div>
    </div>
  )
}