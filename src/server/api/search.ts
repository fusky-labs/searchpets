import Client from "~/utils/redis"

function toArrayIfNotArray(value: any){
  // turns any element, except undefined, to an array with only a single value
  return Array.isArray(value) || !value ? value : [value]
}

export default defineEventHandler(async (event) => {
  await Client.connect()
  let { years, characters, chapters } = await readBody(event)
  const comicsOutput: object[] = []

  try {
    years = toArrayIfNotArray(years)
    characters = toArrayIfNotArray(characters)
    chapters = toArrayIfNotArray(chapters)

    const characterQuery = characters ? characters
      .map((character: string) => `@characters:{${character}}`)
      .join(" ") : '*'
    const chapterQuery = chapters ? `@chapter:(${chapters.join(" | ")})` : ''

    for (const year of years) {
      const comics = await Client.ft.search(
        year,
        `${characterQuery} ${chapterQuery}`,
        {
          LIMIT: { from: 0, size: 500 },
          SORTBY: { BY: "index"}
        }
      )

      const comics_list = comics.documents.map((comic) => (
        {
          title: comic.value.title as string,
          comic_link: comic.value.comic_link as string,
          image: comic.value.image as string,
          chapter: comic.value.chapter as string,
          date: comic.value.date as string,
          characters: (comic.value.characters as string).split(",")
        }
      ))
      comicsOutput.push(...comics_list)
    }
  } catch (e) {
    console.log(e)
  }
  await Client.quit()

  return comicsOutput
})
