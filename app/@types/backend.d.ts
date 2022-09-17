import type { SetStateAction } from "react"

declare global {
  type SearchRes = {
    years: string
    characters: string
    comics: string[]
  } & SetStateAction<never[]>

  type DataRes = {
    comicCount: number
    charCount: number
  }

  type CharacterRes = {
    characters: string[]
  }
}
