<script setup lang="ts">
import { storeToRefs } from "pinia"
import { useModalStore } from "~/stores"

const comicModalStore = useModalStore()
const { isComicModalOpen: modalState } = storeToRefs(comicModalStore)

onMounted(() => {
  const htmlStyle = document.documentElement.style

  htmlStyle.overflowY = "auto"

  watch(modalState, () => {
    !modalState.value
      ? (htmlStyle.overflowY = "auto")
      : (htmlStyle.overflowY = "hidden")
  })

  window.addEventListener("keydown", (e) => {
    if (modalState.value && e.key === "Escape") {
      modalState.value = false
    }
  })
})
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<style>
.lucide {
  @apply pointer-events-none;
}
</style>
