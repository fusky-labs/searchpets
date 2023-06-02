<template>
  <Teleport to="body">
    <div data-scroll-area style="height: 6rem; pointer-events: none" />
    <LazyNuxtLoadingIndicator />
  </Teleport>
  <div id="searchpets">
    <TheBaseNavbar />
    <BackToTop />
    <main id="main-content" class="flex justify-center">
      <slot />
    </main>
    <TheBaseFooter />
  </div>
  <ClientOnly>
    <Teleport to="html > body">
      <LazyComicDetailsModal />
    </Teleport>
  </ClientOnly>
</template>
