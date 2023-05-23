<script setup lang="ts">
defineProps<{ title: string }>()
</script>

<template>
  <div id="faq-item">
    <h3>{{ title }}</h3>
    <ContentSlot :use="$slots.default" />
  </div>
</template>
