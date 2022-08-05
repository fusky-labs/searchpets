import { createClient } from "redis"

export async function searchComics(years: string[], characters: string[]) {
  // create a client and connect to the Redis server
  const client = createClient({
    url: process.env.REDIS_URL,
  })
  client.connect()
  // for every year index given, search that year index that have the characters given
  let comics = []
  console.log(years)
  console.log(characters)
  const character_query = characters.map((character) => {
    return `@characters:{${character}}`
  }
  ).join(" ")
  console.log(character_query)

  await years.forEach((year) => {
    console.log(year)
    client.ft.search(`${year}`, character_query)
    .then((res) => {
      console.log(res.documents.length)
      res.documents.forEach((doc) => {
        // console.log(doc.value.title)
        const comic = {
          title: doc.value.title,
          characters: doc.value.characters,
          comic_link: doc.value.comic_link,
          image: doc.value.image,
        }
        console.log(comic)
        comics.push(comic)
      })
    })
  })
  client.quit()
  console.log(comics)
  return { comics: comics }
}
