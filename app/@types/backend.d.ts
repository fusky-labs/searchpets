import type { SetStateAction } from "react"

declare global {
  type HPSearchTypes = {
    years: string
    characters: string
  } & SetStateAction<never[]>

  type HPDataTypes = {
    comicCount: number
    charCount: number
  }

  type HPCharacterTypes = {
    character: string[]
  }

  type SearchComicsType = {
    title: string
    characters: string[]
    comic_link: string
    image: string
  }
}
