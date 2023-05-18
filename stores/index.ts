import { defineStore } from "pinia"

export const useComicModalStore = defineStore("comicModal", {
  state: () => {
    return {
      isModalOpen: false
    }
  },
  actions: {
    toggleModal() {
      this.isModalOpen = !this.isModalOpen
    }
  }
})
