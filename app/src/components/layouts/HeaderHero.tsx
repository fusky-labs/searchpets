import { useEffect, useState } from "react"

interface IHeaderHeroProps {
  characterCount: number
  comicCount: number
}

export default function HeaderHero({
  characterCount,
  comicCount,
}: IHeaderHeroProps) {



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
