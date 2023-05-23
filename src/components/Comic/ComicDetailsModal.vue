<script setup lang="ts">
import {
  XIcon,
  LinkIcon,
  StarIcon,
  ChevronLeftIcon,
  ChevronRightIcon
} from "lucide-vue-next"

import { storeToRefs } from "pinia"
import { useModalStore } from "~/stores"

const modalStore = useModalStore()

const {
  isComicModalOpen,
  characters,
  title,
  comicLink,
  image,
  comicIndex,
  storedQuery
} = storeToRefs(modalStore)

const placeholders = {
  title: "Moppet Babies",
  img: "https://www.housepetscomic.com/wp-content/uploads/2016/07/2016-07-07-making-an-adjustment.png",
  date: "2016-03-18"
}
</script>

<template>
  <ModalWrapper
    :modal-active="isComicModalOpen"
    style="--h-lg-limiter: 80dvh; --m-lg-limiter: 90dvh"
    modal-class="absolute inset-0 overflow-hidden rounded-none lg:w-10/12 lg:rounded-md lg:inset-unset min-h-[var(--h-lg-limiter)]"
  >
    <!--Title bar-->
    <div
      class="sticky top-0 flex items-center gap-x-2.5 px-6 py-4 bg-white z-[2]"
    >
      <span
        class="w-full text-xl font-semibold whitespace-nowrap text-ellipsis"
        >{{ title }}</span
      >
      <div class="flex items-center gap-x-1.5">
        <BaseTooltipWrapper text="Your mom">
          <BaseButton ghost aria-label="Close button">
            <XIcon :size="19" />
          </BaseButton>
        </BaseTooltipWrapper>
        <hr class="h-8 border-l border-l-neutral-300" />
        <BaseButton ghost aria-label="Favorite button">
          <StarIcon :size="19" />
        </BaseButton>
        <BaseTooltipWrapper>
          <BaseButton
            ghost
            aria-label="Close button"
            @click="modalStore.toggleComicModal()"
          >
            <XIcon :size="19" />
          </BaseButton>
        </BaseTooltipWrapper>
      </div>
    </div>
    <!--Contents-->
    <div
      class="flex flex-col lg:flex-row overflow-y-scroll max-h-[var(--m-lg-limiter)] lg:max-h-[var(--h-lg-limiter)]"
    >
      <!-- Responsive Image -->
      <div
        class="relative flex items-start w-full px-5 mb-5 select-none max-h-[var(--h-lg-limiter)]"
      >
        <div class="contents">
          <BaseButton
            ghost
            class="fixed left-2 top-[calc(100%/2.1)]"
            aria-label="Go to previous comic"
            v-if="storedQuery[comicIndex - 1]"
            @click="modalStore.updateComicModal(comicIndex - 1)"
          >
            <ChevronLeftIcon />
          </BaseButton>
          <BaseButton
            ghost
            class="fixed right-2 lg:right-1/3 top-[calc(100%/2.1)]"
            aria-label="Go to next comic"
            @click="modalStore.updateComicModal(comicIndex + 1)"
            v-if="storedQuery[comicIndex + 1]"
          >
            <ChevronRightIcon />
          </BaseButton>
        </div>
        <NuxtImg
          format="webp"
          :src="image"
          class="w-full"
          sizes="sm:500px md:675px lg:800px"
          role="presentation"
          draggable="false"
          quality="80"
          loading="lazy"
          fetchpriority="high"
        />
      </div>
      <!-- Details -->
      <aside
        id="details-pane"
        class="sticky top-0 flex-shrink-0 w-full overflow-x-hidden lg:w-1/3 lg:h-[90%]"
      >
        <div
          class="sticky top-0 grid place-items-start grid-cols-2 p-6 pr-5 gap-3.5"
        >
          <div class="grid gap-y-1.5">
            <span class="text-sm font-semibold uppercase opacity-60">DATE</span>
            <ComicDate :date="placeholders.date" />
          </div>
          <div class="grid gap-y-1.5">
            <span class="text-sm font-semibold uppercase opacity-60"
              >CHAPTER</span
            >
            <span>Placeholder</span>
          </div>
          <div class="col-span-2 grid gap-y-1.5">
            <span class="text-sm font-semibold uppercase opacity-60"
              >Characters</span
            >
            <ul class="flex flex-wrap gap-2">
              <ComicDetailsChip :name="hehe" v-for="hehe in characters" />
            </ul>
          </div>
          <div
            class="col-span-2 w-full border-t grid gap-y-1.5 border-t-neutral-500"
          >
            <BaseLink
              :to="comicLink"
              external
              class="inline-flex items-center py-3 gap-x-2 w-max"
            >
              <LinkIcon :size="19" />
              Link to comic
            </BaseLink>
          </div>
          <!-- DevOnly -->
          <!-- <DevOnly>
            <div class="col-span-2 grid gap-y-1.5">
              <span class="text-sm font-semibold uppercase opacity-60"
                >DEBUG INFORMATION</span
              >
              <span>Previous comic computed</span>
              <code class="bg-neutral-200">{{
                storedQuery[comicIndex - 1] || "undefined"
              }}</code>
              <span>Next comic computed</span>
              <code class="bg-neutral-200">{{
                storedQuery[comicIndex + 1] || "undefined"
              }}</code>
            </div>
          </DevOnly> -->
        </div>
      </aside>
    </div>
  </ModalWrapper>
</template>
