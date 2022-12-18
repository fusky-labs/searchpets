import { useState } from "react"
import { mutate } from "swr"

export default function useSearchpets(years: string[], characters: string[]) {
  // const [comics, setComics] = useState([])

  const data = fetch("/api/search", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      year: years.sort(),
      characters: characters
    })
  })

  return data.then((r) => r.json())
}
