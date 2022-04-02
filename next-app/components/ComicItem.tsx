interface IComicItemProps {
  characters: string;
  link: string;
}

export default function ComicItem({
  characters, link
}: IComicItemProps) {
  return(
    <sp-comic-item className="block shadow-lg rounded-md p-4">
      <h4>{characters}</h4>
      <span>{link}</span>
    </sp-comic-item>
  )
}