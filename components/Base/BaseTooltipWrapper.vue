<script lang="ts" setup>
withDefaults(defineProps<{ text?: string }>(), {
  text: "Tooltip"
})
</script>

<template>
  <div class="biroui-tooltip-wrapper">
    <slot />
    <div role="tooltip" class="absolute bottom-0 left-0">
      <slot name="tooltip">
        <span class="contents">{{ text }}</span>
      </slot>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.biroui-tooltip-wrapper {
  @apply relative;
  * ~ [role="tooltip"] {
    @apply opacity-0 pointer-events-none transition-[opacity,transform];
  }

  *:hover ~ [role="tooltip"] {
    @apply opacity-100;
  }
}
</style>
