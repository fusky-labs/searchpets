<script setup lang="ts">
usePageMeta({
  title: "Search",
  description: "lol"
})
</script>

<template>
  <div id="search-options">lol</div>
  <section id="comic-list-renderer" class="list-render-grid not-expanded">
    <LazyComicItem
      v-for="_ in Array(21)"
      :character-count="Math.floor(Math.random() * 12)"
    />
  </section>
</template>

<style lang="scss">
#comic-list-renderer {
  @apply px-12 grid mx-auto gap-4;
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
