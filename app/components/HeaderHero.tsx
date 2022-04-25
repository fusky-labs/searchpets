interface IHeaderHeroProps {
  characterCount: number
  comicCount: number
}

export default function HeaderHero({ characterCount, comicCount}: IHeaderHeroProps) {
  return (
    <div className="hero-header-container">
      <h1 className="hero-header">
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
