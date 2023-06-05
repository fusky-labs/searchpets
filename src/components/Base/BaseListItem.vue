<script setup lang="ts">
defineProps<{
  title: string
  link: string
  img?: string
  count?: string
}>()
</script>

<template>
  <NuxtLink
    :aria-label="title"
    :to="link"
    class="px-3.5 py-3 rounded-md flex items-center justify-between bui-card-item hover:bg-[var(--sp-button--hover)]"
  >
    <span>{{ title }}</span>
    <span v-if="count" class="text-sm">
      {{ count }}
    </span>
  </NuxtLink>
</template>
