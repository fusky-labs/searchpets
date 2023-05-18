<script setup lang="ts">
import { storeToRefs } from "pinia"
import { useComicModalStore } from "~/stores"

const comicModalStore = useComicModalStore()
const { isModalOpen } = storeToRefs(comicModalStore)

onMounted(() => {
  const $htmlEl = document.documentElement

  $htmlEl.style.overflowY = "auto"

  watch(isModalOpen, () => {
    !isModalOpen.value
      ? ($htmlEl.style.overflowY = "auto")
      : ($htmlEl.style.overflowY = "hidden")
  })

  window.onkeydown = (e) => {
    if (isModalOpen.value) {
      if (e.key === "Escape") {
        isModalOpen.value = false
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
