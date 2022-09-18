export async function searchHandler(
  years: string[],
  characters: string[]
): Promise<SearchResponseType | string[]> {
  return fetch("/api/search", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      year: years.sort(),
      characters: characters
    })
  })
    .then((res) => res.json())
    .then((res: SearchResponseType) => {
      return res.comics
    })
}

export async function dataHandler(): Promise<DataResponseType> {
  return await fetch("http://localhost:3000/api/data").then((res) => res.json())
}

export async function characterHandler(): Promise<
  CharacterArrayType | string[]
> {
  return fetch("/api/characters")
    .then((res) => res.json())
    .then((data: { characters_db: string[] }) => {
      return data.characters_db
    })
}
