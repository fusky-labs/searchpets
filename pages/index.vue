<script setup lang="ts">
const label = "A new and better Searchpets is currently in the works!"

usePageMeta({
  title: "Searchpets is under construction",
  description: label
})
</script>

<template>
  <article
    class="flex flex-col items-center my-20 text-center prose-p:font-open-sans font-inter gap-y-5"
  >
    <NuxtImg
      src="./sp-logo.png"
      role="presentation"
      decoding="async"
      loading="lazy"
      class="md:w-[15vw] w-[12rem] rounded-2xl"
    />
    <h2 class="text-4xl font-bold">Under construction</h2>
    <p>{{ label }}</p>
    <p>© 2023 OpenFurs - an open source project licensed under GPL-2.0</p>
  </article>
</template>
