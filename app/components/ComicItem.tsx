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
      <Image 
        src={image} 
        alt={title}
        objectFit="contain"
        width={900}
        height={700}
        className="relative"
      />
      <div>
        <span>{characters}</span>
        <Link href={link} passHref>
          <a>
            Link
          </a>
        </Link>
      </div>
    </div>
  );
}