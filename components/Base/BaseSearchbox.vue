<script lang="ts" setup>
import { SearchIcon } from "lucide-vue-next"
</script>

<template>
  <div id="biroui-searchbox" class="relative">
    <div
      id="search-input-wrapper"
      class="relative overflow-hidden border border-blue-500 rounded-md"
    >
      <input
        type="search"
        placeholder="Search"
        class="py-2.5 px-4 w-[40vw] rounded-md"
        spellcheck="false"
        autocapitalize="false"
        autocomplete="false"
      />
      <BaseButton
        reset
        class="px-3.5 py-2.5 absolute inset-0 left-unset"
        aria-label="Search button"
      >
        <SearchIcon :size="20" />
      </BaseButton>
    </div>
    <div id="suggestions-box" class="absolute inset-x-0" role="listbox">
      <!-- items here -->
    </div>
  </div>
</template>
