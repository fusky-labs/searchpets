import { useState, useEffect } from "react"
import Container from "../components/Container"
import CharacterItem from "../components/CharacterItem"
import BaseHead from "../components/BaseHead"

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
      <Container mainClassName="" classNames="select-none mx-auto my-0 p-5 ">
        <div
          className="grid my-0 mx-auto gap-4 max-w-[1440px]"
          style={{
            gridTemplateColumns: "repeat(auto-fill, minmax(360px, 1fr))"
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
