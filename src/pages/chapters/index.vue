<script setup lang="ts">
const { data } = await useFetch("/api/chapters/")
const chapters = Object.keys(data?.value ?? {})
</script>

<template>
  <div>
    <h1>{{ chapters.length }}</h1>
    <div class="row">
      <div v-for="chapter in chapters">
        <NuxtLink :to="`/chapters/${chapter}`">
          {{ data?.[chapter] }}
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
