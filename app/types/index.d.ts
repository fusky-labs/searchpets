declare interface ComicItemType {
  title: string
  characters: string[]
  comic_link: string
  guest: string
  image: string
  chapters: string
}

declare interface CharactersArray {
  characters_db?: string[]
}

declare interface SearchResponse {
  years: string
  comics: string[]
}

declare interface DataResponse {
  comicCount: number
  charCount: number
}

type CharacterHandler = CharactersArray
type SearchHandler = SearchResponse | SearchResponse["comics"]
type DataHandler = DataResponse