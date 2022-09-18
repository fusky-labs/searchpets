import Container from "@/components/base/Container"
import { useEffect, useState } from "react"
import { characterHandler } from "src/handlers/ApiHandler"
import { lazy } from "react"
import FoxSpin from "@/components/FoxSpin"

const CharacterItem = lazy(() => import("../components/CharacterItem"))

export default function CharactersPage() {
  const [characters, setCharacters] = useState<string[]>([])

  useEffect(() => {
    characterHandler().then((res) => {
      setCharacters(res as never[])
    })
  }, [])

  return (
    <Container title="Character list" wrap>
      <h2>Character List</h2>
      <div className="grid place-items-center">
        <FoxSpin hidden={characters.length == 0 ? false : true} />
      </div>
      <div className="grid grid-cols-3 p-4 gap-3">
        {characters.length == 0
          ? null
          : characters
              .sort()
              .map((character) => (
                <CharacterItem key={character} name={character} />
              ))}
      </div>
    </Container>
  )
}
