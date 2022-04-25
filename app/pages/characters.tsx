import { useState, useEffect } from "react"
import dynamic from "next/dynamic"
import Container from "../components/Container"
import BaseHead from "../components/BaseHead"

const CharacterItem = dynamic(() => import("../components/CharacterItem"))

export default function Characters() {
  const [characters, setCharacters] = useState([])

  useEffect(() => {
    fetch("/api/characters")
      .then((res) => res.json())
      .then((data) => {
        setCharacters(data.characters_db)
        console.log(data)
      })
  }, [])

  

  return (
    <>
      <BaseHead
        title="Housepets! Character List"
        description="Browse through the entire catalog of Housepets! characters"
      />
      <Container mainClassName="" classNames="page_searchChars-wrapper">
        <div
          className="grid my-0 mx-auto gap-4 max-w-[1440px]"
          style={{
            gridTemplateColumns: "repeat(auto-fill, minmax(360px, 1fr))",
          }}
        >
          {characters.sort().map((character) => {
            return <CharacterItem character={character} key="character" />;
          })}
        </div>
      </Container>
    </>
  );
};
