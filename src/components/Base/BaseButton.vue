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
  @apply rounded-md border border-[var(--sp-button-border)] bg-[var(--sp-button)] hover:bg-[var(--sp-button--hover)] transition-colors;

  &:not(.biroui-has-icon) {
    @apply px-3 py-2.5;
  }

  &.biroui-has-icon {
    @apply p-2.5;
  }
}

.biroui-button-ghost {
  @apply bg-transparent border-transparent hover:bg-[var(--sp-button-ghost--hover)];
}
</style>
