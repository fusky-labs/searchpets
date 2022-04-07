import Link from 'next/link';

interface IComicItemProps {
  title?: string;
  characters: string;
  link: string;
}

export default function ComicItem({
  title, characters, link
}: IComicItemProps) {
  return (
    <div id="comic-item" className="drop-shadow-md rounded-md p-4">
      <h3>{title}</h3>
      <Link href={link} passHref>
        <span>{characters}</span>
      </Link>
    </div>
  );
}