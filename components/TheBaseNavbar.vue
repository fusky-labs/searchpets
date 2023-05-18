<script setup lang="ts">
import { SettingsIcon, MenuIcon } from "lucide-vue-next"

const isMenuOpen = ref(false)
const isScrolledDown = ref(false)

onMounted(() => {
  const scrollArea = document.querySelector("[data-io-scroll-area]")

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
    class="fixed inset-0 flex justify-center px-8 py-5 transition-shadow bg-white bottom-unset"
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
    <div class="absolute top-0 left-0 flex items-center py-5 pl-8 gap-x-5">
      <div class="relative">
        <BaseButton ghost aria-label="Menu button">
          <MenuIcon />
        </BaseButton>
        <div class="absolute menu-container" aria-hidden="true"></div>
      </div>
      <NuxtLink to="/search" class="text-3xl italic font-bold select-none">
        Searchpets!
      </NuxtLink>
    </div>
    <!-- Searchbox -->
    <div id="input-visible-on-scroll">
      <BaseSearchbox />
    </div>
    <!-- Settings stuff -->
    <div class="absolute top-0 right-0 py-5 pr-8">
      <BaseButton aria-label="Settings button">
        <SettingsIcon />
      </BaseButton>
    </div>
  </header>
</template>
