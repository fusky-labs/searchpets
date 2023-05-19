import { defineStore } from "pinia"

export const useModalStore = defineStore("modalStates", {
  state: (): { [modalState: string]: boolean } => {
    return {
      isComicModalOpen: false,
      isDialogOpen: false
    }
  },
  actions: {
    toggleComicModal() {
      this.isComicModalOpen = !this.isComicModalOpen
    },
    toggleDialog() {
      this.isDialogOpen = !this.isDialogOpen
    }
  }
})
