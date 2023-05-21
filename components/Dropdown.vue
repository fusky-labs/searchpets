<script setup lang="ts">
defineProps<{
  dir?: "left" | "right"
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
      class="w-max absolute top-14 bg-white shadow-lg border rounded-md menu-container transition-[opacity,transform] duration-200"
      :aria-hidden="!isMenuOpen ? true : undefined"
      :class="[
        !isMenuOpen
          ? 'opacity-0 pointer-events-none -translate-y-1'
          : 'opacity-100'
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
