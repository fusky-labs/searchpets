<script setup lang="ts">
let { chapter } = useRoute().params
</script>

<template>
  <div>
    <h1>{{ chapter }}</h1>
  </div>
</template>

<style lang="scss" scoped></style>
