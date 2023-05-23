<script setup lang="ts">
const props = withDefaults(defineProps<{ name: string }>(), {
  name: "Grape"
})
</script>

<template>
  <li
    :aria-label="props.name"
    class="px-3 py-1 text-sm border rounded-full border-neutral-300 bg-neutral-200 hover:bg-neutral-300 hover:border-neutral-400"
  >
    <NuxtLink
      :to="`/character/${props.name.toLowerCase()}`"
      class="flex items-center gap-x-2"
    >
      <NuxtImg
        src="https://images.discotech.me/artists/None/be9e4bdb-9ba0-4858-904a-bfde1f13d718.jpg?auto=format%2Ccompress&w=200"
        class="object-cover w-6 rounded-full aspect-square"
        draggable="false"
        loading="lazy"
        decoding="async"
      />
      <span id="chip-name">{{ name }}</span>
    </NuxtLink>
  </li>
</template>
