<script lang="ts" setup>
withDefaults(defineProps<{ text?: string }>(), {
  text: "Tooltip"
})
</script>

<template>
  <div id="bui-tooltip-wrapper" class="relative">
    <slot />
    <div role="tooltip" class="absolute bottom-0 left-0">
      <slot id="bui-tooltip" name="custom-tooltip">
        <span class="contents">{{ text }}</span>
      </slot>
    </div>
  </div>
</template>

<style lang="scss" scoped>
#bui-tooltip-wrapper {
  * ~ [role="tooltip"] {
    @apply opacity-0 pointer-events-none transition-[opacity,transform];
  }

  *:hover ~ [role="tooltip"] {
    @apply opacity-100;
  }
}
</style>
