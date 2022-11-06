import { lazy } from "react"
import Container from "@/components/Base/Container"
import { GetStaticProps } from "next"
import { characterHandler } from "src/handlers/ApiHandler"

const CharacterItem = lazy(() => import("@/components/CharacterItem"))

export const getStaticProps: GetStaticProps = async () => {
  const data = await characterHandler().then((res) => {
    return res
  })

  return {
    props: data,
    revalidate: 120
  }
}

export default function CharacterListPage({ characters_db }: ICharactersArray) {
  const characters = characters_db

  return (
    <Container title="Character list" wrap>
      <h2>Character List - Count: {characters?.length}</h2>
      <div className="grid grid-cols-3 p-4 gap-3" role="list">
        {characters?.sort().map((character) => (
          <CharacterItem key={character} name={character} />
        ))}
      </div>
    </Container>
  )
}
