<template>
  <header>
    <div class="nav-wrapper">
      <NavbarItem href="/" minimal>
        <span
          role="img"
          aria-label="Searchpets!"
          class="text-3xl italic font-bold select-none"
          >Searchpets!</span
        >
      </NavbarItem>
      <div class="flex text-lg select-none gap-x-2" role="list">
        <NavbarItem href="/search">Search</NavbarItem>
        <NavbarItem href="/characters">Characters</NavbarItem>
        <NavbarItem href="/chapters">Chapters</NavbarItem>
      </div>
    </div>
  </header>
</template>

<style>
.nav-wrapper {
  @apply flex items-center gap-x-8 px-10 py-5;
}
</style>
