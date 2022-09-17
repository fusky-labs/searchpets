export function Search(years:string[], characters:string[]){
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

export function Data(){
  return fetch("/api/data").then((res) =>{
      return res.json()
  })
}

export function Characters(){
  return fetch("/api/characters")
    .then((res) => res.json())
    .then((data) => {
      return data.characters_db
    })
}