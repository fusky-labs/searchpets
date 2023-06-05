<script setup lang="ts">
import { SettingsIcon, MenuIcon, CatIcon } from "lucide-vue-next"

const isScrolledDown = ref(false)

onMounted(() => {
  const io = new IntersectionObserver(
    ([e]) => (isScrolledDown.value = !e.isIntersecting)
  )

  io.observe(document.querySelector("[data-scroll-area]")!)
})
</script>

<template>
  <header
    class="fixed inset-0 flex justify-center px-8 py-4 transition-shadow bg-[var(--sp-background)] bottom-unset z-[5]"
    :class="[isScrolledDown ? 'shadow-lg' : 'shadow-none']"
  >
    <!-- Menus  -->
    <div
      class="relative top-0 left-0 flex flex-row-reverse items-center justify-between w-full px-2 py-0 lg:pl-8 lg:flex-row lg:justify-normal lg:py-4 lg:absolute gap-x-5"
    >
      <Dropdown>
        <BaseButton ghost aria-label="Menu button">
          <MenuIcon />
        </BaseButton>
        <template #contents>
          <div class="grid">
            <NuxtLink
              to="/characters"
              class="px-4 py-2.5 flex items-center gap-x-3 hover:bg-[var(--sp-button--hover)]"
            >
              <CatIcon :size="19" />
              Characters
            </NuxtLink>
            <NuxtLink
              to="/chapters"
              class="px-4 py-2.5 flex items-center gap-x-3 hover:bg-[var(--sp-button--hover)]"
            >
              <CatIcon :size="20" />
              Chapter Arcs
            </NuxtLink>
            <NuxtLink
              to="/about"
              class="px-4 py-2.5 flex items-center gap-x-3 hover:bg-[var(--sp-button--hover)]"
            >
              <CatIcon :size="20" />
              <span>About <em>Searchpets!</em></span>
            </NuxtLink>
          </div>
        </template>
      </Dropdown>
      <NuxtLink
        to="/search"
        class="text-[1.65rem] font-bold select-none flex items-center gap-x-4"
      >
        <NuxtImg
          src="sp-logo.png"
          alt="Searchpets logo"
          class="transition-all rounded-md aspect-square"
          preload
          width="44"
          height="44"
          format="webp"
          fetchpriority="high"
        />
        <span>{{ "Searchpets!" }}</span>
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

<style>
.router-link-active > img {
  @apply border-2 p-0.5 border-[var(--sp-nav-border)];
}
</style>
