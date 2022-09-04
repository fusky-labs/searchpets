export function Search(years:string[], characters:string[]): any{
    return fetch("/api/search", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          year: years.sort(),
          characters: characters,
        }),
        })
        .then((res) => res.json())
        .then((res) => {
          return res.comics
        })
}

export function Data(): any{
    return fetch("/api/data")
    .then((res) =>res.json())
    .then((data) => {
      return data
    })
}

export function Characters(): any{
    return fetch("/api/characters")
    .then((res) => res.json())
    .then((characters) => {
      return characters.characters_db
    })
}