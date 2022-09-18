export async function searchHandler(
  years: string[],
  characters: string[]
): Promise<SearchRes | string[]> {
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
    .then((res: SearchRes) => {
      return res.comics
    })
}

export async function dataHandler(): Promise<DataRes> {
  return fetch("/api/data").then((res) => {
    return res.json()
  })
}

export async function characterHandler(): Promise<CharacterArray | string[]> {
  return fetch("/api/characters")
    .then((res) => res.json())
    .then((data: { characters_db: string[] }) => {
      return data.characters_db
    })
}
