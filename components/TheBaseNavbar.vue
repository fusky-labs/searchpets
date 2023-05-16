<script setup lang="ts">
import { SettingsIcon, MenuIcon } from "lucide-vue-next"

const isMenuOpen = ref(false)

onMounted(() => {})
</script>

<template>
  <header class="relative flex justify-center px-8 py-5">
    <!-- Menus  -->
    <div class="absolute top-0 left-0 flex items-center py-5 pl-8 gap-x-5">
      <div class="relative">
        <BaseButton ghost>
          <MenuIcon />
        </BaseButton>
        <div class="absolute menu-container"></div>
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
      <BaseButton>
        <SettingsIcon />
      </BaseButton>
    </div>
  </header>
</template>
