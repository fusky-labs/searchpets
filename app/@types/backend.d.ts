declare interface ICharactersArray {
  characters_db?: string[]
}

declare interface ISearchResponse extends ICharactersArray {
  years: string
  comics: string[]
}

declare interface ComicItemType extends ICharactersArray {
  title: string
  characters: string[]
  comic_link: string
  image: string
  guest: string
	chapters: string
}

declare interface IDataResponse {
  comicCount: number
  charCount: number
}
