import { useEffect, useState, lazy } from "react"
import Container from "@/components/Base/Container"
import FoxSpin from "@/components/Base/FoxSpin"
import { characterHandler } from "src/handlers/ApiHandler"

const CharacterItem = lazy(() => import("@/components/CharacterItem"))

export default function CharactersPage() {
  const [characters, setCharacters] = useState<string[]>([])

  const charNull = characters.length == 0

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
      <div className="grid grid-cols-3 p-4 gap-3" role="list">
        {charNull
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
