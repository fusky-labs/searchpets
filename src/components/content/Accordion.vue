<script setup lang="ts">
defineProps<{ title: string }>()
</script>

<template>
  <div class="border border-[var(--sp-nav-border)] rounded-md">
    <button class="w-full px-2 pt-2 text-2xl text-left">
      <h3>{{ title }}</h3>
    </button>
    <div class="grid px-2 pb-2" style="grid-template-rows: 1fr; grid-row: 0">
      <ContentSlot :use="$slots.default" />
    </div>
  </div>
</template>
