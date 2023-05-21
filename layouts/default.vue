<template>
  <div data-scroll-area />
  <div id="searchpets">
    <TheBaseNavbar />
    <BackToTop />
    <main id="main-content" class="flex justify-center">
      <slot />
    </main>
    <TheBaseFooter />
  </div>
  <LazyComicDetailsModal />
</template>

<style>
[data-scroll-area] {
  @apply h-24 pointer-events-none;
}
</style>
