const Search = async (
  years: string[],
  characters: string[]
): Promise<HPSearchTypes> => {
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
    .then((res) => {
      return res.comics
    })
}

const Data = (): Promise<HPDataTypes> => {
  return fetch("/api/data")
    .then((res) => res.json())
    .then((data: HPDataTypes) => {
      return data
    })
}

const Characters = (): Promise<HPCharacterTypes> => {
  return fetch("/api/characters")
    .then((res) => res.json())
    .then((characters) => {
      return characters.characters_db
    })
}

export { Search, Data, Characters }
