import { defineStore } from "pinia"

interface SearchStore {
  years: string[] | never[]
  characters: string[] | never[]
}

export const useSearchStore = defineStore("search", () => {
  (): SearchStore => {
    return {
      years: [],
      characters: []
    }
  }
})
