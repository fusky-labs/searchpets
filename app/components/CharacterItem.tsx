interface ICharacterItemProps {
  character: string;
  appearance?: number;
  color?: string;
}

export default function CharacterItem({ character, appearance, ...props }: ICharacterItemProps) {
  return (
    <div className="bg-white text-black p-4 rounded-md">
      <span className="text-md md:text-xl">{character}</span>
    </div>
  );
};
