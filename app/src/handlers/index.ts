const server =
  process.env.NODE_ENV !== "production"
    ? "http://localhost:3000"
    : process.env.SERVER_URL


export async function searchHandlers(
  years: string[],
  characters: string[]
): Promise<SearchHandler> {

  return await fetch(`${server}/api/search`, {
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
    .then((res: SearchResponse) => {
      return res.comics
    })
}

export async function fetchSomeStuff(url: string, methods?: "POST" | "GET") {
  const response = await fetch(`${server}${url}`, {
    method: methods,
    headers: {
      "Content-Type": "application/json",
    }
  })

  if (!response.ok) {
    throw new Error(`Status ${response.status}: Something went wrong while fetching the data`)
  }

  return await response.json()
}


export async function dataHandlers(): Promise<DataHandler> {
  return await fetch(`${server}/api/data`).then((res) => res.json())
}

export async function characterHandlers(): Promise<CharacterHandler> {
  return await fetch(`${server}/api/characters`).then((res) => res.json())
}
