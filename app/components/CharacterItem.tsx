interface ICharacterItemProps {
  character: string;
  appearance?: number;
  color?: string;
}

export default function CharacterItem({ character, appearance, ...props }: ICharacterItemProps) {
  const characterName = character.replace(/\s+/g, "-").toLowerCase();
  return (
    <div id={characterName} className="bg-white text-black p-4 rounded-md">
      <span className="text-md md:text-xl">{character}</span>
    </div>
  );
};
