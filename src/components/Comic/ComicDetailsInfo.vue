<script setup lang="ts">
import { LinkIcon, SearchIcon } from "lucide-vue-next"

import { storeToRefs } from "pinia"
import { useComicModalStore } from "~/stores"

const comicModal = useComicModalStore()

const { storedQuery, characters, comicLink, comicIndex } =
  storeToRefs(comicModal)
</script>

<template>
  <div class="sticky top-0 grid place-items-start grid-cols-2 p-6 pr-9 gap-3.5">
    <div class="col-span-2 flex gap-1.5 items-center justify-between w-full">
      <div class="flex items-center gap-x-1.5">
        <SearchIcon :size="16" />
        <span class="text-sm font-semibold uppercase">FROM SEARCH RESULTS</span>
      </div>
      <div>{{ comicIndex + 1 }} of {{ storedQuery.length }}</div>
    </div>
    <div class="grid gap-y-1.5">
      <span class="text-sm font-semibold uppercase opacity-60">DATE</span>
      <ComicDate date="2002-03-15" />
    </div>
    <div class="grid gap-y-1.5">
      <span class="text-sm font-semibold uppercase opacity-60">CHAPTER</span>
      <span>Placeholder</span>
    </div>
    <div class="col-span-2 grid gap-y-1.5">
      <span class="text-sm font-semibold uppercase opacity-60"
        >Characters ({{ characters.length }})</span
      >
      <ul class="flex flex-wrap gap-2" tabindex="0">
        <ComicDetailsChip :name="char" v-for="char in characters" />
      </ul>
    </div>
    <div class="col-span-2 w-full border-t grid gap-y-1.5 border-t-neutral-500">
      <BaseLink
        :to="comicLink"
        external
        class="inline-flex items-center py-3 gap-x-2 w-max"
      >
        <LinkIcon :size="19" />
        Link to comic
      </BaseLink>
    </div>
  </div>
</template>
