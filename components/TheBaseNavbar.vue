<script setup lang="ts">
import { SettingsIcon, MenuIcon } from "lucide-vue-next"

const isMenuOpen = ref(false)
const isScrolledDown = ref(false)

onMounted(() => {
  const scrollArea = document.querySelector("[data-scroll-area]")

  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      isScrolledDown.value = !entry.isIntersecting
    })
  })

  io.observe(scrollArea!)
})
</script>

<template>
  <header
    class="fixed inset-0 flex justify-center px-8 py-4 transition-shadow bg-white bottom-unset"
    :class="[isScrolledDown ? 'shadow-lg' : 'shadow-none']"
  >
    <!-- Skip to main content -->
    <a
      href="#main-content"
      class="absolute top-0 left-0 px-5 py-3.5 focus:translate-y-0 -translate-y-full transition-transform duration-500"
    >
      Skip to main content
    </a>
    <!-- Menus  -->
    <div
      class="relative top-0 left-0 flex flex-row-reverse items-center justify-between w-full px-2 py-0 lg:pl-8 lg:flex-row lg:justify-normal lg:py-4 lg:absolute gap-x-5"
    >
      <div class="relative">
        <BaseButton ghost aria-label="Menu button">
          <MenuIcon />
        </BaseButton>
        <div class="absolute menu-container" aria-hidden="true" />
      </div>
      <NuxtLink to="/search" class="text-[1.75rem] italic font-bold select-none">
        Searchpets!
      </NuxtLink>
    </div>
    <!-- Searchbox -->
    <div id="input-visible-on-scroll">
      <BaseSearchbox />
    </div>
    <!-- Settings stuff -->
    <div class="absolute top-0 right-0 hidden py-4 pr-8 lg:block">
      <BaseButton aria-label="Settings button">
        <SettingsIcon />
      </BaseButton>
    </div>
  </header>
</template>
