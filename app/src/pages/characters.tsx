import Container from "@/components/base/Container"
import { useEffect, useState } from "react"
import { characterHandler } from "src/handlers/ApiHandler"

export default function CharactersPage() {
  const [characters, setCharacters] = useState([])

  useEffect(() => {
    characterHandler().then((res) => {
      console.log(res)
      setCharacters(res as never[])
    })
  }, [])

  return <Container wrap>Characters page</Container>
}
