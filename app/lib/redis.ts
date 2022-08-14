import { createClient } from "redis"

export async function searchComics(years: string[], characters: string[]) {
  // create a client and connect to the Redis server
  const client = createClient({
    url: process.env.REDIS_URL
  })
  client.connect()
  // for every year index given, search that year index that have the characters given
  let comics: string[] = []
  console.log(years)
  console.log(characters)
  const character_query = characters
    .map((character) => {
      return `@characters:{${character}}`
    })
    .join(" ")
  console.log(character_query)
  for (const year of years) {
    console.log(year)
    console.log("this needs to run after the above")
    await client.ft.search(year, character_query).then((result) => {
      // console.log(result.documents)
      result.documents.forEach((doc) => {
        console.log(doc.value.title)
        const comic: any = {
          title: doc.value.title,
          characters: (doc.value.characters as string).split(","),
          comic_link: doc.value.comic_link,
          image: doc.value.image
        }
        comics.push(comic)
      })
    })
  }
  client.quit()
  console.log(comics)
  return { comics: comics }
}
