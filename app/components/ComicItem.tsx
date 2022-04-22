import { faLink } from '@fortawesome/free-solid-svg-icons';
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
    <div id="comic-item" className="drop-shadow-md rounded-md p-4">
      <h3 className="text-lg text-center italic">&#34;{title}&#34;</h3>
      <div className="pointer-events-none">
        <Image
          src={image}
          alt={title}
          objectFit="contain"
          width={900}
          height={700}
          className=""
          />
      </div>
      <div className="flex justify-between">
        <span>{characters}</span>
        <Link href={link} passHref>
          <a target="_blank" className="py-[0.25ex] px-1 underline decoration-2 transition-colors duration-150 decoration-blue-500  hover:decoration-blue-300">
            Original Link
          </a>
        </Link>
      </div>
    </div>
  );
}