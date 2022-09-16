const fetchData = async <T>(url: string, ...params: any): Promise<T> => {
  return fetch(url, params).then((res) => res.json())
}

// @ts-ignore
// prettier-ignore
export async function Search(years: string[], characters: string[]): Promise<SearchRes> {
  fetchData<SearchRes>("/api/search", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      year: years.sort(),
      characters: characters
    })
  }).then((res: SearchRes) => {
    return res.comics
  })
}

// @ts-ignore
export function Data(): Promise<CharacterRes> {
  fetchData<DataRes>("/api/data").then((data: DataRes) => {
    return data
  })
}

// @ts-ignore
export function Characters(): Promise<CharacterRes> {
  fetchData<CharacterRes>("/api/characters").then(
    (characters: CharacterRes) => {
      return characters
    }
  )
}
