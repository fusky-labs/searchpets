import Image from 'next/image';
import Link from 'next/link';

interface IComicItemProps {
  title?: string;
  characters: string;
  link: string;
  src?: string;
}

export default function ComicItem({
  title, characters, link, src
}: IComicItemProps) {
  return (
    <div id="comic-item" className="drop-shadow-md rounded-md p-4">
      <h3>{title}</h3>
      <Link href={link} passHref>
        {/* <Image src={src} alt={title} /> */}
        <span>{characters}</span>
      </Link>
    </div>
  );
}