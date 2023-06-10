<script setup lang="ts">
import { GithubIcon } from "lucide-vue-next"

const currentYear = new Date().getFullYear()
const copyright = `© 2022-${currentYear} Foosky Labs`

const config = useRuntimeConfig()
const commitSha = config.public.COMMIT_SHA.slice(0, 8)
const ghUrl = "https://github.com/foosky-labs/searchpets"
const commitUrl = `${ghUrl}/commit/${commitSha}`
</script>

<template>
  <footer
    class="grid px-12 gap-y-4 py-9 text-center place-items-center max-w-screen-2xl mx-auto"
  >
    <p>
      <span class="name-emphasis">Searchpets!</span>
      is an open source fan project created by
      <BaseLink to="https://github.com/foosky-labs" external>Foosky Labs</BaseLink>,
      a group created by maxthecomputerfox and Kuroji Fusky, two passionate
      developers from Southeast Asia; licensed under GNU General Public License
      v2.0. Searchpets! does not own all of the contents used on this website
      and has no direct affiliation with
      <span class="name-emphasis">Housepets!</span> or all of Rick Griffin's
      intellectual property.
    </p>
    <p>
      Character and chapter metadata taken
      <BaseLink to="https://www.housepetscomic.com" external
        >from the official site</BaseLink
      >
      and the
      <BaseLink to="https://housepetscomic.fandom.com" external
        >Housepets! Fandom wiki</BaseLink
      >.
    </p>
    <p class="flex gap-x-4 flex-wrap">
      <span id="copyright">{{ copyright }}</span>
      <span
        >{{ "Version 2.1.0" }}
        <BaseLink :to="commitUrl" external v-if="commitSha">{{
          commitSha
        }}</BaseLink>
        <span v-else>dev</span>
      </span>
      <BaseLink :to="ghUrl" external class="inline-flex items-center gap-x-2">
        <GithubIcon :size="20" />
        View source on GitHub
      </BaseLink>
    </p>
  </footer>
</template>

<style scoped>
.name-emphasis {
  @apply italic font-bold;
}
</style>
