<script setup lang="ts">
const props = defineProps<{
  menuDir?: "left" | "right"
  offset?: number
}>()

const containerRef = ref<HTMLElement>()
const isMenuOpen = ref(false)

onMounted(() => {
  const buttonElSlot = containerRef.value?.children[0] as HTMLElement

  if (buttonElSlot.tagName !== "BUTTON") {
    throw new Error(
      "[Dropdown] Non button element detected! It must be a button element"
    )
  }

  buttonElSlot.addEventListener("click", () => {
    isMenuOpen.value = !isMenuOpen.value
  })

  window.addEventListener("click", ({ target }) => {
    const offsetTarget = (target as HTMLElement).offsetParent
    const wrapperContainerTarget = !!offsetTarget?.attributes.getNamedItem(
      "biroui-dropdown-slot"
    )

    const wrapperRootTarget =
      !!offsetTarget?.attributes.getNamedItem("biroui-dropdown")

    const spanTarget = (target as HTMLElement).tagName === "SPAN"
    const buttonTarget = (target as HTMLElement).tagName === "BUTTON"

    const dropdownClicked =
      spanTarget || buttonTarget || wrapperContainerTarget || wrapperRootTarget

    if (!isMenuOpen.value) return
    if (!dropdownClicked) isMenuOpen.value = false
  })
})
</script>

<template>
  <div biroui-dropdown ref="containerRef">
    <slot />
    <div
      biroui-dropdown-slot
      class="w-max absolute bg-white shadow-lg border rounded-md menu-container transition-[opacity,transform] duration-200 z-[2]"
      :style="`top: calc(1rem * ${props.offset ?? 3})`"
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
[biroui-dropdown] {
  @apply relative;
}
</style>
