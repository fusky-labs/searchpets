<script setup lang="ts">
const { data } = await useFetch("/api/chapters/")
const chapters = Object.keys(data?.value ?? {})

console.log(data.value)
</script>

<template>
  <div class="max-w-screen-2xl px-12">
    <section class="py-3.5">
      <h1 class="text-3xl font-semibold">{{ chapters.length }} chapters</h1>
    </section>
    <ol class="grid grid-cols-3 gap-2.5 w-full">
      <li v-for="chapter in chapters">
        <BaseListItem
          :title="(data as any)?.[chapter]"
          :link="`/characters/${chapter}`"
        />
      </li>
    </ol>
  </div>
</template>

<style lang="scss" scoped></style>
