import { defineStore } from "pinia"
import { spMockData } from "~/constants"

type PrependArrayNever<T> = T[] | never[]

interface ComicInfo {
  title: string
  comic_link: string
  image: string
  characters: PrependArrayNever<string>
}

interface ModalStore extends ComicInfo {
  isComicModalOpen: boolean
  comicIndex: number
  storedQuery: PrependArrayNever<ComicInfo>
}

export const useModalStore = defineStore("comicModal", {
  state: (): ModalStore => {
    return {
      storedQuery: spMockData,
      isComicModalOpen: false,
      title: "",
      comic_link: "",
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
      this.comic_link = this.storedQuery[index].comic_link
      this.characters = this.storedQuery[index].characters
      this.image = this.storedQuery[index].image
    }
  }
})
