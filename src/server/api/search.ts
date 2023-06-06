import client, { checkSocketOpen } from "~/utils/redis"

function toArrayIfNotArray(value: unknown) {
  // turns any element, except undefined, to an array with only a single value
  return Array.isArray(value) || !value ? value : [value]
}

interface ComicItem {
  title: string
  comicLink: string
  date: string
  image: string
  chapter: string
  characters: string[]
}

export default defineEventHandler(async (event) => {
  checkSocketOpen()

  let { years, characters, chapters } = await readBody(event)
  const comicsOutput: ComicItem[] = []

  try {
    years = toArrayIfNotArray(years)
    characters = toArrayIfNotArray(characters)
    chapters = toArrayIfNotArray(chapters)

    const characterQuery = characters
      ? characters
          .map((character: string) => `@characters:{${character}}`)
          .join(" ")
      : ""
    const chapterQuery = chapters ? `@chapter:(${chapters.join(" | ")})` : ""

    const fullQuery =
      characters || chapters ? `${characterQuery} ${chapterQuery}` : "*"

    await console.log(`${characterQuery} ${chapterQuery}`)
    for (const year of years) {
      const comics = await client.ft.search(year, fullQuery, {
        LIMIT: { from: 0, size: 500 },
        SORTBY: { BY: "index" }
      })

      const comicsList = comics.documents.map(
        (comic) =>
          ({
            title: comic.value.title,
            comicLink: comic.value.comic_link,
            image: comic.value.image,
            chapter: comic.value.chapter,
            date: comic.value.date,
            characters: (comic.value.characters as string).split(",")
          } as ComicItem)
      )
      comicsOutput.push(...comicsList)
    }
  } catch (e) {
    console.log(e)
  }

  return comicsOutput
})
