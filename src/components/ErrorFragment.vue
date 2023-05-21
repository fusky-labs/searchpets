<script setup lang="ts">
defineProps<{ statusCode?: number; message?: string }>()
</script>

<template>
  <div class="grid h-[90dvh] place-items-center">
    <div class="grid gap-4 place-items-center">
      <NuxtLink
        to="https://www.housepetscomic.com/comic/2010/12/03/the-best-game/"
        target="_blank"
      >
        <NuxtImg
          src="https://www.housepetscomic.com/wp-content/uploads/2016/07/2010-12-03-the-best-game.png"
          alt="DAD THAT'S NOT FUNNY"
          class="aspect-[12/4.5] w-[50rem]"
        />
      </NuxtLink>
      <h1 class="text-4xl font-bold">{{ statusCode }}</h1>
      <p>{{ message }}</p>
    </div>
  </div>
</template>
