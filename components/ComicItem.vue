<script setup lang="ts">
import { StarIcon } from "lucide-vue-next"

interface ComicItemProps {
  title: string
  characterCount: string | number
  chapter: string
  date: string
  isFavorite?: boolean
}

const props = withDefaults(defineProps<Partial<ComicItemProps>>(), {
  title: "Comic title",
  characterCount: 1,
  chapter: "A chapter",
  date: "2023-03-15",
  isFavorite: false
})

const formattedDate = new Date(props.date).toLocaleDateString()
</script>

<template>
  <div
    id="comic-item"
    class="flex flex-col p-4 border rounded-md"
    aria-labelledby="comic-title"
  >
    <div class="flex items-center justify-between">
      <h2 class="text-xl" id="comic-title">{{ title }}</h2>
      <BaseButton aria-label="Favorite button">
        <StarIcon :size="18" />
      </BaseButton>
    </div>
    <div>image element</div>
    <div class="grid grid-flow-col">
      <span>
        {{ characterCount }}
      </span>
      <span>
        {{ chapter }}
      </span>
      <time>
        {{ formattedDate }}
      </time>
    </div>
  </div>
</template>
