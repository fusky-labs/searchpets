<script setup lang="ts">
import { SettingsIcon, MenuIcon } from "lucide-vue-next"

const isScrolledDown = ref(false)

onMounted(() => {
  const scrollArea: HTMLDivElement | null =
    document.querySelector("[data-scroll-area]")

  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      isScrolledDown.value = !entry.isIntersecting
    })
  })

  io.observe(scrollArea!)
})

const toggleContainerRef = ref<HTMLDivElement>()
const menuBtnRef = ref()
const isMenuOpen = ref(false)

onMounted(() => {
  const menuBtn: HTMLButtonElement = menuBtnRef.value.baseButtonRef

  window.onclick = (e) => {
    const isModalContents =
      e.target == menuBtn ||
      e.target === toggleContainerRef.value!.lastElementChild

    if (!isMenuOpen.value) return
    if (!isModalContents) isMenuOpen.value = false
  }
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
      <!-- !isolate -->
      <div class="relative" ref="toggleContainerRef">
        <BaseButton
          ghost
          aria-label="Menu button"
          ref="menuBtnRef"
          @click="isMenuOpen = !isMenuOpen"
        >
          <MenuIcon />
        </BaseButton>
        <div
          class="absolute top-14 p-6 bg-white shadow-lg border rounded-md menu-container transition-[opacity,transform] duration-200"
          :aria-hidden="!isMenuOpen ? true : undefined"
          :class="[
            !isMenuOpen
              ? 'opacity-0 pointer-events-none -translate-y-1'
              : 'opacity-100'
          ]"
        >
          this my status
        </div>
      </div>
      <!-- !isolate -->
      <NuxtLink
        to="/search"
        class="text-[1.75rem] italic font-bold select-none"
      >
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
