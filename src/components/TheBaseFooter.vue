<script setup lang="ts">
import { GithubIcon } from "lucide-vue-next"

const currentYear = new Date().getFullYear()
const copyright = `© 2022-${currentYear} OpenFurs`
</script>

<template>
  <footer class="grid px-12 gap-y-4 py-9">
    <p>
      <strong>NOTE:&nbsp;</strong><span class="name-emphasis">Searchpets!</span>
      is an open source project created by maxthecomputerfox and Kuroji Fusky,
      two passionate developers from Southeast Asia; licensed under GNU General
      Public License v2.0. SP does not own any of the contents used on this
      website and has no direct affiliation with
      <span class="name-emphasis">Housepets!</span> or all of Rick Griffin's
      intellectual property.
    </p>
    <p>
      Character chapter metadata taken
      <BaseLink to="https://www.housepetscomic.com" external
        >from the official site</BaseLink
      >
      and the
      <BaseLink to="https://housepetscomic.fandom.com" external
        >Housepets! wiki</BaseLink
      >.
    </p>
    <div class="flex gap-x-2.5 flex-wrap">
      <span id="copyright">{{ copyright }}</span>
      <span>Release 2.3.0-COMMITHASH</span>
      <BaseLink
        to="https://github.com/openfurs/searchpets"
        external
        class="inline-flex items-center gap-x-2"
      >
        <GithubIcon :size="20" />
        View source on GitHub
      </BaseLink>
    </div>
  </footer>
</template>

<style scoped>
.name-emphasis {
  @apply italic font-bold;
}
</style>
