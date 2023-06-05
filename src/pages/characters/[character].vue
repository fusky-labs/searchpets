<script setup lang="ts">
let { character } = useRoute().params

usePageMeta({
  title: character as string,
  description: `Looking through ${character}`
})
</script>

<template>
  <div>
    <h1>{{ character }}</h1>
  </div>
</template>

<style lang="scss" scoped></style>
