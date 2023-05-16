<script setup lang="ts">
const props = defineProps<{
  reset?: boolean
  icon?: boolean
  ghost?: boolean
}>()
</script>

<template>
  <button
    :class="[
      props.reset ? '' : 'bui-styled',
      props.ghost ? 'bui-type-ghost' : '',
      props.icon ? 'has-icon' : ''
    ]"
  >
    <slot />
  </button>
</template>

<style lang="scss">
.bui-styled {
  @apply rounded-md border border-blue-600 bg-blue-200 hover:bg-blue-300 transition-colors;

  &:not(.has-icon) {
    @apply px-3 py-2.5;
  }

  &.has-icon {
    @apply p-2.5;
  }
}

.bui-type-ghost {
  @apply bg-transparent border-transparent hover:bg-blue-300;
}
</style>
