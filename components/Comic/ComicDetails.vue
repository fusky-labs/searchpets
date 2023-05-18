<script setup lang="ts">
import { XIcon, LinkIcon, StarIcon } from "lucide-vue-next"

import { storeToRefs } from "pinia"
import { useComicModalStore } from "~/stores"

const comicModalStore = useComicModalStore()

const { isModalOpen } = storeToRefs(comicModalStore)

const placeholders = {
  title: "Moppet Babies",
  img: "https://www.housepetscomic.com/wp-content/uploads/2020/12/2020-12-25-tidings-of-comfort-and-joy.png",
  date: new Date("2016-03-18").toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric"
  })
}
</script>

<template>
  <div
    id="comic-details-modal"
    class="fixed inset-0 z-[5] grid place-items-center"
    :class="{ 'modal-active': isModalOpen }"
    :aria-hidden="!isModalOpen"
  >
    <div
      id="modal-contents"
      class="absolute z-10 w-[95%] lg:w-[90%] xl:w-[80%] bg-white rounded-md top-4 lg:top-16 max-h-[100dvh] overflow-hidden"
    >
      <!--Title bar-->
      <div
        class="sticky top-0 flex items-center justify-between px-6 py-4 bg-white z-[2]"
      >
        <h2 class="text-xl font-semibold">Comic Details</h2>
        <div class="inline-flex gap-x-1">
          <BaseButton ghost aria-label="Favorite button">
            <StarIcon :size="19" />
          </BaseButton>
          <BaseTooltipWrapper>
            <BaseButton
              ghost
              aria-label="Close button"
              @click="comicModalStore.toggleModal()"
            >
              <XIcon :size="19" />
            </BaseButton>
          </BaseTooltipWrapper>
        </div>
      </div>
      <!--Contents-->
      <div
        class="flex flex-col-reverse lg:flex-row overflow-y-scroll max-h-[90dvh] lg:max-h-[80dvh]"
      >
        <div id="img-responsive" class="w-full px-5 mb-5 select-none">
          <NuxtImg
            :src="placeholders.img"
            class="w-full"
            role="presentation"
            loading="lazy"
            decoding="async"
            draggable="false"
          />
        </div>
        <aside
          id="details-pane"
          class="sticky top-0 flex-shrink-0 w-full lg:w-1/3 lg:h-screen bg-neutral-200"
        >
          <div class="sticky top-0 grid place-items-start p-6 pr-5 gap-y-2.5">
            <div class="grid gap-y-2.5">
              <span class="text-sm font-semibold uppercase opacity-60"
                >Characters</span
              >
              <ol id="character-chip-lists" class="flex flex-wrap gap-2">
                <ComicDetailsChip name="Melanie Martinez" />
                <ComicDetailsChip name="Kuroji" />
                <ComicDetailsChip name="Maxie Pads" />
                <ComicDetailsChip name="Jisoo" />
                <ComicDetailsChip name="Jungook" />
                <ComicDetailsChip name="Ozzy" />
              </ol>
            </div>
            <div class="grid gap-x-2.5">
              <span class="text-sm font-semibold uppercase opacity-60"
                >chapter</span
              >
              <span>Yes Babies</span>
            </div>
            <div class="grid gap-x-2.5">
              <span class="text-sm font-semibold uppercase opacity-60"
                >Date</span
              >
              <time>{{ placeholders.date }}</time>
            </div>
            <BaseLink
              to="https://www.youtube.com/"
              external
              class="inline-flex items-center gap-x-2"
            >
              <LinkIcon :size="19" />
              Link to comic
            </BaseLink>
          </div>
        </aside>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
#comic-details-modal {
  @apply pointer-events-auto duration-500 backdrop-blur-[2px];

  &:not(.modal-active) {
    @apply pointer-events-none backdrop-blur-0;

    #modal-contents {
      @apply opacity-0 translate-y-10;
    }

    &::before {
      @apply bg-transparent;
    }
  }

  &::before {
    content: "";
    @apply fixed inset-0 bg-black bg-opacity-70 transition-colors duration-500;
  }
}

#modal-contents {
  @apply opacity-100 translate-y-0 transition-[opacity,transform] duration-300;
}
</style>
