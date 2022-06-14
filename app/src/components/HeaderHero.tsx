import { useEffect } from "react"

interface IHeaderHeroProps {
  characterCount: number
  comicCount: number
}

export default function HeaderHero({
  characterCount,
  comicCount,
}: IHeaderHeroProps) {
  useEffect(() => {
    window.onscroll = () => {
      const heroText = document.querySelector(".hero-header")
      const searchBox = document.querySelector(".search-box-wrapper")

      if (heroText.clientHeight === 72) {
        window.pageYOffset > 327
          ? searchBox.classList.add("lock")
          : searchBox.classList.remove("lock")
      }

      if (heroText.clientHeight === 108) {
        window.pageYOffset > 390
          ? searchBox.classList.add("lock")
          : searchBox.classList.remove("lock")
      }

      if (heroText.clientHeight === 144) {
        window.pageYOffset > 408
          ? searchBox.classList.add("lock")
          : searchBox.classList.remove("lock")
      }
    }
  }, [])
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
        characters from the entire <em>Housepets!</em> comic catalog!
      </h1>
    </div>
  )
}
