interface IHeaderHeroProps {
  characterCount: number
  comicCount: number
}

export default function HeaderHero({ characterCount, comicCount}: IHeaderHeroProps) {
  return (
    <div className="text-center max-w-[900px] p-4 mt-[12vh] mx-0 flex justify-center">
      <h1 className="text-center max-w-3xl text-3xl">
        Search through{" "}
        <span
          id="pages-count"
          className="font-black bg-clip-text text-transparent"
        >
          {comicCount}
        </span>
        &nbsp;pages and{" "}
        <span
          id="character-count"
          className="font-black bg-clip-text text-transparent"
        >
          {characterCount}
        </span>{" "}
        characters from your favorite furry comic!
      </h1>
    </div>
  );
};
