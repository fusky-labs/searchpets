<script setup lang="ts">
const { data } = await useFetch("/api/characters/")
const characters = Object.keys(data?.value ?? {})
</script>

<template>
  <div>
    <h1>{{ characters?.length }} characters</h1>
    <div class="row">
      <div v-for="character in characters">
        <NuxtLink :to="`/characters/${character}`">
          {{ data?.[character] }}
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
