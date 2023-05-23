<script setup lang="ts">
import {
  ListFilterIcon,
  ChevronsLeftRightIcon,
  ChevronsRightLeftIcon
} from "lucide-vue-next"
import { useComicModalStore } from "~/stores"
import { spMockData } from "~/constants"

const comicStore = useComicModalStore()
const isExpanded = ref(false)

usePageMeta({
  title: "Search",
  description: "Search comics from Housepets lol"
})
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
      <Dropdown menu-dir="right" :offset="3">
        <BaseButton ghost class="flex items-center !py-1.5 !px-4 gap-x-2">
          <ListFilterIcon :size="20" />
          <span>Sort</span>
        </BaseButton>
        <template #contents>
          <ul class="flex flex-col">
            <li class="">
              <BaseButton
                reset
                class="w-full px-4 py-2 text-left hover:bg-blue-300"
                >Ascending</BaseButton
              >
            </li>
            <li class="">
              <BaseButton
                reset
                class="w-full px-4 py-2 text-left hover:bg-blue-300"
                >Desending</BaseButton
              >
            </li>
            <li class="">
              <BaseButton
                reset
                class="w-full px-4 py-2 text-left hover:bg-blue-300"
                >Favs</BaseButton
              >
            </li>
            <li class="">
              <BaseButton
                reset
                class="w-full px-4 py-2 text-left hover:bg-blue-300"
                >NotFavs</BaseButton
              >
            </li>
          </ul>
        </template>
      </Dropdown>
    </section>
    <!-- Comic Lists -->
    <section id="comic-list-container" class="list-render-grid">
      <ComicItem
        v-for="(item, index) in spMockData"
        :key="index"
        :title="item.title"
        :img="item.image"
        @expandToModal="comicStore.updateComicModal(index)"
      />
    </section>
  </div>
</template>

<style lang="scss">
#comic-list-container {
  @apply px-4 md:px-8 lg:px-12 grid mx-auto gap-4 w-full;
}

:is(.not-expanded, .is-expanded) .list-render-grid {
  @apply grid-cols-1 lg:grid-cols-2;
}

.not-expanded {
  @apply max-w-screen-xl 2xl:max-w-screen-2xl;
}

.is-expanded {
  @apply max-w-full;

  .list-render-grid {
    @apply 2xl:grid-cols-3;
  }
}
</style>
