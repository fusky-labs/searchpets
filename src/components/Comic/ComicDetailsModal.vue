<script setup lang="ts">
import {
  XIcon,
  StarIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  PanelRightCloseIcon
} from "lucide-vue-next"
import { storeToRefs } from "pinia"
import { useComicModalStore } from "~/stores"

const comicStore = useComicModalStore()

const { isComicModalOpen, title, image, comicIndex, storedQuery } =
  storeToRefs(comicStore)

onMounted(() => {
  const handleArrowKeys = ({ key }: KeyboardEvent) => {
    // TODO add limit when index goes out of bounds
    if (key === "ArrowLeft") {
      comicStore.updateComicModal(comicIndex.value - 1)
    }
    if (key === "ArrowRight") {
      comicStore.updateComicModal(comicIndex.value + 1)
    }
  }

  watch(isComicModalOpen, () => {
    !isComicModalOpen.value
      ? window.removeEventListener("keydown", handleArrowKeys)
      : window.addEventListener("keydown", handleArrowKeys)
  })
})
</script>

<template>
  <ModalWrapper
    :modal-active="isComicModalOpen"
    style="--h-lg-limiter: 80dvh; --m-lg-limiter: 90dvh"
    modal-class="absolute inset-0 overflow-hidden rounded-none lg:w-10/12 lg:rounded-md lg:inset-unset min-h-[var(--h-lg-limiter)]"
  >
    <!--Title bar-->
    <div class="sticky top-0 flex items-center gap-x-2.5 px-6 py-4 z-[2]">
      <span class="w-full text-xl font-semibold">{{ title }}</span>
      <div class="flex items-center gap-x-1.5">
        <BaseTooltipWrapper text="Collapse info panel" :left="-3.75">
          <BaseButton ghost aria-label="Close button">
            <PanelRightCloseIcon :size="19" />
          </BaseButton>
        </BaseTooltipWrapper>
        <hr class="h-8 border-l border-l-neutral-300" />
        <BaseTooltipWrapper text="Favorite" :left="-1.5">
          <BaseButton ghost aria-label="Favorite button">
            <StarIcon :size="19" />
          </BaseButton>
        </BaseTooltipWrapper>
        <BaseTooltipWrapper :right="0.1">
          <BaseButton
            ghost
            aria-label="Close button"
            @click="comicStore.toggleComicModal()"
          >
            <XIcon :size="19" />
          </BaseButton>
          <template #tooltip>
            <strong> Protip: </strong>
            Press <kbd>ESC</kbd> to close this modal.
          </template>
        </BaseTooltipWrapper>
      </div>
    </div>
    <!--Contents-->
    <div
      class="flex flex-col lg:flex-row overflow-y-auto max-h-[var(--m-lg-limiter)] lg:max-h-[var(--h-lg-limiter)]"
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
            @click="comicStore.updateComicModal(comicIndex - 1)"
          >
            <ChevronLeftIcon />
          </BaseButton>
          <BaseButton
            ghost
            class="fixed right-2 lg:right-1/3 top-[calc(100%/2.1)]"
            aria-label="Go to next comic"
            v-if="storedQuery[comicIndex + 1]"
            @click="comicStore.updateComicModal(comicIndex + 1)"
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
        <ComicDetailsInfo />
      </aside>
    </div>
  </ModalWrapper>
</template>
