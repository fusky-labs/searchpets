const server =
  process.env.NODE_ENV !== "production"
    ? "http://localhost:3000"
    : process.env.SERVER_URL

type SearchHandlerTypes = SearchResponseType | SearchResponseType["comics"]
type DataHandlerTypes = DataResponseType
type CharacterHandlerTypes =
  | CharactersArrayType
  | CharactersArrayType["characters_db"]

export async function searchHandler(
  years: string[],
  characters: string[]
): Promise<SearchHandlerTypes> {
  return fetch(`${server}/api/search`, {
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

export async function dataHandler(): Promise<DataHandlerTypes> {
  return await fetch(`${server}/api/data`).then((res) => res.json())
}

export async function characterHandler(): Promise<CharacterHandlerTypes> {
  return fetch(`${server}/api/characters`)
    .then((res) => res.json())
    .then((data: CharactersArrayType) => {
      return data.characters_db
    })
}
