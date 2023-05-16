<script setup lang="ts">
const currentYear = new Date().getFullYear()
const copyright = `© 2023-${currentYear} OpenFurs`
</script>

<template>
  <footer class="grid px-12 text-sm gap-y-4 py-9">
    <div>
      <span class="name-emphasis">Searchpets!</span> is an open source project
      created by kuroji-fusky and thatITfox, licensed under GNU General Public
      License v2.0. SP does not own any of the contents used on this website and
      has no direct affiliation with
      <span class="name-emphasis">Housepets!</span> or all of Rick Griffin's
      intellectual property.
    </div>
    <div class="flex gap-x-2.5 flex-wrap">
      <span>{{ copyright }}</span>
      <span>Release 2.3.0-COMMITHASH</span>
    </div>
  </footer>
</template>

<style scoped>
.name-emphasis {
  @apply italic font-bold;
}
</style>
