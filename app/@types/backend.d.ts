declare type CharactersArrayType = {
  characters_db?: string[]
}

declare type SearchResponseType = {
  years: string
  comics: string[]
} & CharactersArrayType

declare type ComicItemType = {
  title: string
  characters: string[]
  comic_link: string
  image: string
  guest: string
} & CharactersArrayType

declare type DataResponseType = {
  comicCount: number
  charCount: number
}
