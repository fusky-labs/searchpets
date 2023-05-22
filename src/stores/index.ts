import { defineStore } from "pinia"
import { spMockData } from "~/constants"

interface ComicInfo {
  title: string
  comic_link: string
  image: string
  characters: string[] | never[]
}

interface ModalStore extends ComicInfo {
  isComicModalOpen: boolean
  storedQuery: ComicInfo[] | never[]
  comicIndex: number
}

export const useModalStore = defineStore("modalStates", {
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
      this.comicIndex = index
      this.title = this.storedQuery[index].title
      this.comic_link = this.storedQuery[index].comic_link
      this.characters = this.storedQuery[index].characters
      this.image = this.storedQuery[index].image

      if (!this.isComicModalOpen) this.isComicModalOpen = true

      console.log(this.storedQuery[index])
    }
  }
})
