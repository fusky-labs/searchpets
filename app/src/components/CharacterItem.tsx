interface ICharacterItemProps {
  character: string;
  appearance?: number;
  color?: string;
}

export default function CharacterItem({ character, appearance, ...props }: ICharacterItemProps) {
  const characterName = character
    .replace(/(\s)|(\')/g, "-")
    .replace(/(\()|(\))|(\.)/g, "")
    .toLowerCase()
  return (
    <div className={`${characterName} rounded-md p-2 border-current border-[1px]`}>
      <span className="text-md md:text-xl">{character}</span>
    </div>
  );
};
