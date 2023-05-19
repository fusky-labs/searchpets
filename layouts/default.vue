<template>
  <div id="searchpets">
    <div data-scroll-area />
    <TheBaseNavbar />
    <main id="main-content">
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
