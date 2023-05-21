<script setup lang="ts">
import {
  ListFilterIcon,
  ChevronsLeftRightIcon,
  ChevronsRightLeftIcon
} from "lucide-vue-next"
import { useModalStore } from "~/stores"
const comicModalStore = useModalStore()

usePageMeta({
  title: "Search",
  description: "X"
})

const isExpanded = ref(false)
</script>

<template>
  <div
    class="grid w-full transition-[max-width] duration-300 gap-y-4"
    :class="[!isExpanded ? 'not-expanded' : 'is-expanded']"
  >
    <section id="search-options" class="flex px-12 gap-x-0.5 justify-end">
      <BaseButton
        ghost
        class="hidden items-center !py-1.5 !px-4 gap-x-2 xl:flex"
        @click="isExpanded = !isExpanded"
      >
        <ChevronsLeftRightIcon :size="20" v-if="!isExpanded" />
        <ChevronsRightLeftIcon :size="20" v-else />
        <span>{{ !isExpanded ? "Expand" : "Collapse" }}</span>
      </BaseButton>
      <Dropdown>
        <BaseButton ghost class="flex items-center !py-1.5 !px-4 gap-x-2">
          <ListFilterIcon :size="20" />
          <span>Sort</span>
        </BaseButton>
        <template #contents>
          lol
        </template>
      </Dropdown>
    </section>
    <!-- Comic Lists -->
    <section id="comic-list-renderer" class="list-render-grid">
      <ComicItem
        v-for="(_, index) in Array(15)"
        :key="index"
        @click="comicModalStore.toggleComicModal()"
      />
    </section>
  </div>
</template>

<style lang="scss">
#comic-list-renderer {
  @apply px-4 md:px-8 lg:px-12 grid mx-auto gap-4;
}

.not-expanded {
  @apply max-w-screen-xl 2xl:max-w-screen-2xl;
}

.is-expanded {
  @apply max-w-full;
}

:is(.not-expanded, .is-expanded) .list-render-grid {
  @apply grid-cols-1 lg:grid-cols-2;
}
</style>
