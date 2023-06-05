<script setup lang="ts">
const { data } = await useFetch("/api/characters/")
const characters = Object.keys(data?.value ?? {})

const charsLen = characters?.length

console.log(data.value)

usePageMeta({
  title: "Characters",
  description: `Search through ${charsLen} characters from Housepets!`
})
</script>

<template>
  <!-- TODO use virtual scrolling for this; filter character items via lodash -->
  <div class="max-w-screen-2xl px-12">
    <section class="py-3.5">
      <h1 class="text-3xl font-semibold">{{ charsLen }} characters</h1>
    </section>
    <ol class="grid grid-cols-3 gap-2.5 w-full">
      <li v-for="character in characters">
        <BaseListItem
          :title="(data as any)?.[character]"
          :link="`/characters/${character}`"
          count="69"
        />
      </li>
    </ol>
  </div>
</template>

<style lang="scss" scoped></style>
