<script setup lang="ts">
const props = defineProps<{
  to: string
  external?: boolean
}>()
</script>

<template>
  <NuxtLink
    :to="to"
    :external="props.external ? true : undefined"
    :target="props.external ? '_blank' : undefined"
    class="text-blue-600 underline hover:text-blue-800"
  >
    <slot />
  </NuxtLink>
</template>
