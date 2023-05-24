<script setup lang="ts">
import { ArrowUpIcon } from "lucide-vue-next"

const isScrolledDown = ref(false)

onMounted(() => {
  const io = new IntersectionObserver(
    ([e]) => (isScrolledDown.value = !e.isIntersecting),
    { rootMargin: "900px 0px 0px 0px" }
  )

  io.observe(document.querySelector("[data-scroll-area]")!)
})

const scrollToTop = () => window.scrollTo(0, 0)
</script>

<template>
  <BaseButton
    reset
    class="z-[5] transition-[transform,opacity,background] duration-300 fixed flex items-center px-6 py-4 text-white bg-[var(--sp-button-active)] hover:bg-[var(--sp-button-active--hover)] rounded-md bottom-8 right-12 gap-x-2"
    :class="[
      !isScrolledDown
        ? 'opacity-0 pointer-events-none translate-y-2'
        : 'opacity-100 translate-y-0'
    ]"
    @click="scrollToTop"
  >
    <ArrowUpIcon :size="19" />
    <span> Back to top </span>
  </BaseButton>
</template>
