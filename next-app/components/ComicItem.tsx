interface IComicItemProps {
  characters: string;
  link: string;
}

export default function ComicItem({
  characters, link
}: IComicItemProps) {
  return(
    <div>
      <h4>{characters}</h4>
      <span>{link}</span>
    </div>
  )
}