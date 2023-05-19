<script setup lang="ts">
import { XIcon, LinkIcon, StarIcon } from "lucide-vue-next"

import { storeToRefs } from "pinia"
import { useModalStore } from "~/stores"

const modalStore = useModalStore()

const { isComicModalOpen } = storeToRefs(modalStore)

const placeholders = {
  title: "Moppet Babies",
  img: "https://www.housepetscomic.com/wp-content/uploads/2016/07/2016-07-07-making-an-adjustment.png",
  date: new Date("2016-03-18").toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric"
  })
}

</script>

<template>
  <ModalWrapper
    :modal-active="isComicModalOpen"
    modal-class="absolute top-0 overflow-hidden rounded-md lg:top-unset"
  >
    <!--Title bar-->
    <div
      class="sticky top-0 flex items-center gap-x-2.5 px-6 py-4 bg-white z-[2]"
    >
      <span class="w-full text-xl font-semibold whitespace-nowrap text-ellipsis"
        >Comic Title Placeholder</span
      >
      <div class="inline-flex gap-x-1">
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
      class="flex flex-col lg:flex-row overflow-y-scroll max-h-[90dvh] lg:max-h-[80dvh]"
    >
      <!-- Responsive Image -->
      <div id="img-responsive" class="w-full px-5 mb-5 select-none">
        <NuxtImg
          format="webp"
          :src="placeholders.img"
          class="w-full"
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
        class="sticky top-0 flex-shrink-0 w-full lg:w-1/3 lg:h-screen bg-neutral-200"
      >
        <div class="sticky top-0 grid place-items-start p-6 pr-5 gap-3.5">
          <div class="grid gap-y-1.5">
            <span class="text-sm font-semibold uppercase opacity-60">Date</span>
            <time>{{ placeholders.date }}</time>
          </div>
          <div class="grid gap-y-1.5">
            <span class="text-sm font-semibold uppercase opacity-60"
              >chapter</span
            >
            <span>Yes Babies</span>
          </div>
          <div class="col-span-2 grid gap-y-1.5">
            <span class="text-sm font-semibold uppercase opacity-60"
              >Characters</span
            >
            <ul class="flex flex-wrap gap-2">
              <ComicDetailsChip name="Maxie Pads" />
              <ComicDetailsChip name="Melanie Martinez" />
              <ComicDetailsChip name="Kuroji" />
            </ul>
          </div>
          <div
            class="col-span-2 w-full border-t grid gap-y-1.5 border-t-neutral-500"
          >
            <BaseLink
              to="https://www.youtube.com/"
              external
              class="inline-flex items-center py-3 gap-x-2 w-max"
            >
              <LinkIcon :size="19" />
              Link to comic
            </BaseLink>
          </div>
          <!-- DevOnly -->
          <DevOnly>
            <div class="col-span-2 grid gap-y-1.5">
              <span>Debug Information</span>
            </div>
          </DevOnly>
        </div>
      </aside>
    </div>
  </ModalWrapper>
</template>
