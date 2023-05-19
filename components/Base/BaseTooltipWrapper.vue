<script lang="ts" setup>
withDefaults(defineProps<{ text?: string }>(), {
  text: "Tooltip"
})
</script>

<template>
  <div biroui-tooltip-wrapper>
    <slot />
    <div biroui-tooltip role="tooltip">
      <slot name="tooltip">
        <span class="contents">{{ text }}</span>
      </slot>
    </div>
  </div>
</template>

<style lang="scss">
[biroui-tooltip-wrapper] {
  @apply relative;

  * ~ [biroui-tooltip] {
    @apply opacity-0 pointer-events-none transition-[opacity,transform] z-10 bg-white p-3.5 rounded-lg shadow-lg;
  }

  *:hover ~ [biroui-tooltip] {
    @apply opacity-100;
  }
}

[biroui-tooltip] {
  position: absolute;
}
</style>
