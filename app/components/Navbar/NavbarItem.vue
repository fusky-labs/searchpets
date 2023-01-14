<template>
  <NuxtLink
    :to="props.href"
    :class="!minimal && 'nav-link-item'"
    :role="!minimal && 'listitem'"
  >
    <slot />
  </NuxtLink>
</template>

<script setup lang="ts">
const props = defineProps<{
  href: string;
  minimal?: boolean;
}>();
</script>

<style>
.nav-link-item {
  @apply border border-none hover:text-white hover:bg-blue-400 hover:border-blue-500 transition-colors duration-200 px-4 py-1.5 rounded-lg;
}
</style>
