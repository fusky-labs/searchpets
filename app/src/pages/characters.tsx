import React, { useState, useEffect, Suspense } from "react"
import dynamic from "next/dynamic"
import Container from "../components/Container"
import BaseHead from "../components/BaseHead"
import BackToTopButton from "../components/BackToTop"

const CharacterItem = dynamic(() => import("../components/CharacterItem"))

export default function Characters() {
  const [characters, setCharacters] = useState([])

  useEffect(() => {
    fetch("/api/characters")
      .then((res) => res.json())
      .then((data) => {
        setCharacters(data.characters_db)
      })
  }, [])

  const isServer = typeof window === "undefined" // ! This is most likely the cause of that hydration UI error

  const fallback = (
    <div className="my-0 mx-auto gap-4 max-w-[1440px]">
      <p>Loading...</p>
    </div>
  )

  return (
    <>
      <BaseHead
        title="Housepets! Character List"
        description="Browse through the entire catalog of Housepets! characters"
      />
      <BackToTopButton />
      <div className="my-0 mx-auto gap-4 max-w-[1440px] px-4 py-1">
        <h1 className="text-2xl font-bold">Character List</h1>
        <p>
          <div className="flex flex-wrap gap-4">
            <span>Legend:</span>
            <span
              id="legend-item"
              style={
                { "--legend-clr": "var(--char-person)" } as React.CSSProperties
              }
            >
              People/Non-Anthro characters
            </span>
            <span
              id="legend-item"
              style={
                { "--legend-clr": "var(--char-unknown)" } as React.CSSProperties
              }
            >
              Unknown/Unidentified
            </span>
            <span
              id="legend-item"
              style={
                {
                  "--legend-clr": "var(--char-inanimate)",
                } as React.CSSProperties
              }
            >
              Inanimate objects
            </span>
          </div>
        </p>
      </div>
      <Container mainClassName="" classNames="page_searchChars-wrapper">
        <div
          className="grid my-0 mx-auto gap-4 max-w-[1440px]"
          style={{
            gridTemplateColumns: "repeat(auto-fill, minmax(360px, 1fr))",
          }}
        >
          {!isServer ? (
            <React.Suspense fallback={fallback}>
              {characters.sort().map((character) => {
                return <CharacterItem character={character} key="character" />
              })}
            </React.Suspense>
          ) : (
            fallback
          )}
        </div>
      </Container>
    </>
  )
}
