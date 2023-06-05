<script setup lang="ts">
let { character } = useRoute().params
</script>

<template>
  <div>
    <h1>{{ character }}</h1>
  </div>
</template>

<style lang="scss" scoped></style>
