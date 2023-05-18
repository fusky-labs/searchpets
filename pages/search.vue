<script setup lang="ts">
import { useComicModalStore } from "~/stores"
const comicModalStore = useComicModalStore()

usePageMeta({
  title: "Search",
  description: "lol"
})
</script>

<template>
  <div id="search-options">search options</div>
  <section id="comic-list-renderer" class="list-render-grid not-expanded">
    <ComicItem
      v-for="(_, index) in Array(15)"
      :key="index"
      :data-item-index="index"
      @click="comicModalStore.toggleModal()"
    />
  </section>
</template>

<style lang="scss">
#comic-list-renderer {
  @apply px-4 md:px-8 lg:px-12 grid mx-auto gap-4;
}

.not-expanded {
  @apply max-w-screen-xl 2xl:max-w-screen-2xl;
}

.list-render-grid {
  &.not-expanded {
    @apply grid-cols-1 lg:grid-cols-2;
  }
  &.is-expanded {
    @apply grid-cols-1 lg:grid-cols-2 xl:grid-cols-3;
  }
}
</style>
