<script setup lang="ts">
withDefaults(defineProps<{ name: string }>(), {
  name: "Grape"
})
</script>

<template>
  <li id="chip">
    <span>{{ name }}</span>
  </li>
</template>
