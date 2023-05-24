<script setup lang="ts">
interface TooltipInt {
  text?: string
  right?: number
  left?: number
}

withDefaults(defineProps<TooltipInt>(), {
  text: "Tooltip"
})
</script>

<template>
  <div class="biroui-tooltip-wrapper">
    <slot />
    <div
      role="tooltip"
      :style="[
        right ? `right: calc(1rem * ${right})` : '',
        left ? `left: calc(1rem * ${left})` : ''
      ]"
    >
      <slot name="tooltip">
        <span class="contents">{{ text }}</span>
      </slot>
    </div>
  </div>
</template>

<style lang="scss">
.biroui-tooltip-wrapper {
  @apply relative;

  * ~ [role="tooltip"] {
    @apply opacity-0 pointer-events-none transition-[opacity,transform] delay-200  z-10 bg-[var(--sp-background)] p-3.5 rounded-lg shadow-lg w-max;
  }

  *:hover ~ [role="tooltip"] {
    @apply opacity-100;
  }
}

[role="tooltip"] {
  @apply absolute lg:block hidden border border-[var(--sp-tooltip-border)] translate-y-1.5;
}
</style>
