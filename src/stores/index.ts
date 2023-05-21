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
  query: ComicInfo[] | never[]
  comicIndex: number
}

export const useModalStore = defineStore("modalStates", {
  state: (): ModalStore => {
    return {
      query: spMockData,
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
      this.title = this.query[index].title
      this.comic_link = this.query[index].comic_link
      this.characters = this.query[index].characters
      this.image = this.query[index].image

      if (!this.isComicModalOpen) this.isComicModalOpen = true

      console.log(this.query[index])
    }
  }
})
