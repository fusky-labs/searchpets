import { defineStore } from "pinia"
import { spMockData } from "~/constants"

type PrependArrayNever<T> = T[] | never[]

interface ComicInfo {
  title: string
  comicLink: string
  image: string
  characters: PrependArrayNever<string>
}

interface ModalStore extends ComicInfo {
  isComicModalOpen: boolean
  comicIndex: number
  storedQuery: PrependArrayNever<ComicInfo>
}

export const useComicModalStore = defineStore("comicModal", {
  state: (): ModalStore => {
    return {
      storedQuery: spMockData,
      isComicModalOpen: false,
      title: "",
      comicLink: "",
      image: "",
      characters: [],
      comicIndex: 0
    }
  },
  actions: {
    toggleComicModal() {
      this.isComicModalOpen = !this.isComicModalOpen
    },
    updateComicModal(index: number) {
      if (!this.isComicModalOpen) this.isComicModalOpen = true

      this.comicIndex = index

      this.title = this.storedQuery[index].title
      this.comicLink = this.storedQuery[index].comicLink
      this.characters = this.storedQuery[index].characters
      this.image = this.storedQuery[index].image
    }
  }
})
