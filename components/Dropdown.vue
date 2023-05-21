<script setup lang="ts">
const props = defineProps<{
  menuDir?: "left" | "right"
  offset?: number
}>()

const containerRef = ref<HTMLButtonElement>()
const isMenuOpen = ref(false)

onMounted(() => {
  const buttonElSlot = containerRef.value?.children[0] as HTMLButtonElement

  buttonElSlot.addEventListener("click", () => {
    isMenuOpen.value = !isMenuOpen.value
  })

  window.addEventListener("click", ({ target }) => {
    const offsetTarget = (target as HTMLElement).offsetParent

    if (!isMenuOpen.value) return
    console.log("Target:", target, "\nOffset:", offsetTarget)
  })
})
</script>

<template>
  <div class="biroui-dropdown" ref="containerRef">
    <slot />
    <div
      biroui-dropdown-container-slot
      class="w-max absolute bg-white shadow-lg border rounded-md menu-container transition-[opacity,transform] duration-200"
      :style="`top: calc(1rem * ${props.offset})`"
      :aria-hidden="!isMenuOpen ? true : undefined"
      :class="[
        !isMenuOpen
          ? 'opacity-0 pointer-events-none -translate-y-1'
          : 'opacity-100',
        props.menuDir !== 'right' ? 'left-0' : 'right-0'
      ]"
    >
      <slot name="contents">
        <div class="contents">Container</div>
      </slot>
    </div>
  </div>
</template>

<style>
.biroui-dropdown {
  @apply relative;
}
</style>
