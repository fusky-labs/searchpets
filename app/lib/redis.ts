import { createClient } from "redis"

const searchComics = async (years: string[], characters: string[]) => {
  const client = createClient({
    url: process.env.REDIS_URL
  })
  client.connect()
  try {
    years = Array.isArray(years) ? years : [years]
    characters = Array.isArray(characters) ? characters : [characters]

    let comicsOutput: SearchComicsType[] = []

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
      await client.ft
        .search(year, character_query, { LIMIT: { from: 0, size: 500 } })
        .then((result) => {
          // console.log(result.documents)

          result.documents.forEach((doc) => {
            // console.log(doc.value.title)
            const comic: SearchComicsType = {
              title: doc.value.title as string,
              characters: (doc.value.characters as string).split(","),
              comic_link: doc.value.comic_link as string,
              image: doc.value.image as string
            }
            comicsOutput.push(comic)
          })
        })
    }
    client.quit()
    // console.log(comicsOutput)
    return { comics: comicsOutput }
  } catch {
    client.quit()
    return { comics: "ERROR: Search failed!" }
  }
}

const grabData = async () => {
  const client = createClient({
    url: process.env.REDIS_URL
  })
  client.connect()
  let comicCount = 0
  let charCount = 0

  await client.DBSIZE().then((result) => {
    console.log(result - 1)
    comicCount = result - 1
  })
  await client.LLEN("characters_db").then((result) => {
    console.log(result)
    charCount = result
  })
  client.quit()
  return { comicCount: comicCount, charCount: charCount }
}

const grabCharacters = async () => {
  const client = createClient({
    url: process.env.REDIS_URL
  })
  client.connect()

  let characters: string[] | undefined

  await client.LRANGE("characters_db", 0, -1).then((result) => {
    client.quit()
    characters = result
  })
  return { characters_db: characters }
}

export { searchComics, grabData, grabCharacters }
