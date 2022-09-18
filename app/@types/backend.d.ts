import type { SetStateAction } from "react"

declare global {
  type CharacterArrayType = {
    characters: string[]
  }

  type SearchResponseType = {
    years: string
    comics: string[]
  } & CharacterArrayType

  type ComicItemType = {
    title: string
    comic_link: string
    image: string
    guest: string
  } & CharacterArrayType

  type DataResponseType = {
    comicCount: number
    charCount: number
  }
}
