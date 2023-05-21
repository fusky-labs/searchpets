<script setup lang="ts">
const props = defineProps<{
  reset?: boolean
  icon?: boolean
  ghost?: boolean
}>()

const baseButtonRef = ref<HTMLButtonElement | null>(null)

defineExpose({ baseButtonRef })
</script>

<template>
  <button
    :class="[
      props.reset ? '' : 'biroui-button',
      props.ghost ? 'biroui-button-ghost' : '',
      props.icon ? 'biroui-has-icon' : ''
    ]"
    ref="baseButtonRef"
  >
    <slot />
  </button>
</template>

<style lang="scss">
.biroui-button {
  @apply rounded-md border border-blue-600 bg-blue-200 hover:bg-blue-300 transition-colors;

  &:not(.biroui-has-icon) {
    @apply px-3 py-2.5;
  }

  &.biroui-has-icon {
    @apply p-2.5;
  }
}

.biroui-button-ghost {
  @apply bg-transparent border-transparent hover:bg-blue-300;
}
</style>
