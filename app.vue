<script setup lang="ts">
import { storeToRefs } from "pinia"
import { useModalStore } from "~/stores"

const comicModalStore = useModalStore()
const { isComicModalOpen } = storeToRefs(comicModalStore)

onMounted(() => {
  const $htmlEl = document.documentElement

  $htmlEl.style.overflowY = "auto"

  watch(isComicModalOpen, () => {
    !isComicModalOpen.value
      ? ($htmlEl.style.overflowY = "auto")
      : ($htmlEl.style.overflowY = "hidden")
  })

  window.onkeydown = (e) => {
    if (isComicModalOpen.value) {
      if (e.key === "Escape") {
        isComicModalOpen.value = false
      }
    }
  }
})
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
