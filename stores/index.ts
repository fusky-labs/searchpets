import { defineStore } from "pinia"

interface SearchStore {
  years: string[] | never[]
  characters: string[] | never[]
}

export const useSearchStore = defineStore("search", {
  state: (): SearchStore => {
    return {
      years: [],
      characters: []
    }
  },
  getters: {}
})
