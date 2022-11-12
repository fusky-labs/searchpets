type SearchHandlerTypes = ISearchResponse | ISearchResponse["comics"]
type DataHandlerTypes = IDataResponse
type CharacterHandlerTypes = ICharactersArray

const server =
  process.env.NODE_ENV !== "production"
    ? "http://localhost:3000"
    : process.env.SERVER_URL

export async function searchHandler(
  years: string[],
  characters: string[]
): Promise<SearchHandlerTypes> {
  return await fetch("/api/search", {
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
    .then((res: ISearchResponse) => {
      return res.comics
    })
}

export async function dataHandler(): Promise<DataHandlerTypes> {
  return await fetch(`${server}/api/data`).then((res) => res.json())
}

export async function characterHandler(): Promise<CharacterHandlerTypes> {
  return await fetch(`${server}/api/characters`).then((res) => res.json())
}
