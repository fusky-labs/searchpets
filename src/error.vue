<script setup lang="ts">
defineProps(["error"])

usePageMeta({
  title: "Page not found!",
  description: "Page not found"
})
</script>

<template>
  <NuxtLayout name="default">
    <ErrorFragment :status-code="error.statusCode" :message="error.message" />
  </NuxtLayout>
</template>
