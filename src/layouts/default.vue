<template>
  <Teleport to="body">
    <div data-scroll-area style="height: 6rem; pointer-events: none" />
    <LazyNuxtLoadingIndicator />
    <!-- Skip to main content -->
    <a
      href="#main-content"
      class="absolute top-0 left-0 px-5 py-3.5 focus:translate-y-0 -translate-y-full transition-transform duration-300 z-[1000] bg-[var(--sp-button-active)]"
    >
      Skip to main content
    </a>
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
