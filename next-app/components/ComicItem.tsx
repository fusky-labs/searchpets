interface IComicItemProps {
  characters: string;
  link: string;
}

export default function ComicItem({
  characters, link
}: IComicItemProps) {
  return(
    <sp-comic-item>
      <h4>{characters}</h4>
      <span>{link}</span>
    </sp-comic-item>
  )
}