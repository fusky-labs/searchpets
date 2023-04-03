import { defineStore } from "pinia";

interface SearchStore<S = (string[] | never[])> {
  years: S
  characters: S
}

export const useSearchStore = defineStore("search", () => {
  state: (): SearchStore => {
    return {
      years: [],
      characters: []
    }
  }
});
