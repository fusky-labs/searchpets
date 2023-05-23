<script setup lang="ts">
import { StarIcon } from "lucide-vue-next"

interface ComicItemProps {
  title?: string
  characterCount?: string | number
  img?: string
  date?: string
  chapter?: string
  comicLink?: string
  isFavorite?: boolean
}

const props = withDefaults(defineProps<ComicItemProps>(), {
  title: "Moppet Babies",
  characterCount: 4,
  chapter: "A chapter",
  comicLink: "https://www.housepetscomic.com/comic/2016/03/18/moppet-babies/",
  img: "https://www.housepetscomic.com/wp-content/uploads/2016/07/2016-03-18-moppet-babies.png",
  date: "2016-03-18",
  isFavorite: false
})

const emit = defineEmits<{
  (e: "expandToModal", payLoad?: object): void
}>()

const loadImgNotifier = () => {
  console.log(`${props.title} is loaded`)
}
</script>

<template>
  <div
    aria-labelledby="comic-title"
    class="flex flex-col px-5 py-4 border rounded-md shadow-lg border-neutral-400"
  >
    <div class="flex items-center justify-between">
      <h2 class="text-xl" id="comic-title">{{ title }}</h2>
      <BaseButton aria-label="Favorite button">
        <StarIcon :size="18" />
      </BaseButton>
    </div>
    <div class="aspect-[1] h-[50rem]">
      <NuxtImg
        :src="props.img"
        class="object-contain cursor-zoom-in"
        role="presentation"
        loading="lazy"
        decoding="async"
        draggable="false"
        sizes="sm:500px md:675px lg:800px"
        :quality="80"
        @click="emit('expandToModal')"
        @load="loadImgNotifier"
      />
    </div>

    <div class="flex justify-between">
      <ComicDate :date="props.date" />
      <span>
        {{ chapter }}
      </span>
    </div>
  </div>
</template>
