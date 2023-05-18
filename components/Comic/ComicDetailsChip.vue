<script setup lang="ts">
withDefaults(defineProps<{ name: string }>(), {
  name: "Grape"
})
</script>

<template>
  <li
    class="inline-flex items-center px-3 py-1 border border-black rounded-full gap-x-2"
    aria-labelledby="chip-name"
  >
    <NuxtImg
      src="https://images.discotech.me/artists/None/be9e4bdb-9ba0-4858-904a-bfde1f13d718.jpg?auto=format%2Ccompress&w=200"
      class="object-cover w-6 rounded-full aspect-square"
      draggable="false"
      loading="lazy"
      decoding="async"
    />
    <span id="chip-name">{{ name }}</span>
  </li>
</template>
