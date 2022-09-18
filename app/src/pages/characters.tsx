import Container from "@/components/base/Container"
import { useEffect, useState } from "react"
import { characterHandler } from "src/handlers/ApiHandler"
import { Suspense, lazy } from "react"
import dynamic from "next/dynamic"
import LoadingClient from "@/components/Loading.client"

// const CharacterItem = dynamic(() => import("../components/CharacterItem"), {
//   suspense: true
// })

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
      <div className="w-full grid grid-cols-3 p-4 gap-3">
        {characters.length == 0 ? (
          <div className="text-center w-full flex justify-center">
            Loading...
          </div>
        ) : (
          characters
            .sort()
            .map((character) => (
              <CharacterItem key={character} name={character} />
            ))
        )}
      </div>
    </Container>
  )
}
