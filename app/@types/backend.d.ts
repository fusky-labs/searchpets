import type { SetStateAction } from "react"

declare global {
  type CharacterArray = {
    characters: string[]
  }

  type SearchRes = {
    years: string
    comics: string[]
  } & CharacterArray

  type ComicItems = {
    title: string
    comic_link: string
    image: string
  } & CharacterArray

  type DataRes = {
    comicCount: number
    charCount: number
  }
}
