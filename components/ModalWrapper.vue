<script setup lang="ts">
const props = withDefaults(
  defineProps<{ modalActive?: boolean; modalClass?: string }>(),
  {
    modalActive: false
  }
)

const renderContent = ref(false)

watch(
  () => toRef(props.modalActive),
  () => {
    !props.modalActive
      ? setTimeout(() => (renderContent.value = false), 300)
      : (renderContent.value = true)
  }
)
</script>

<template>
  <div class="biroui-modal-container" :class="{ 'biroui-active': modalActive }">
    <div data-biroui-modal-content :class="modalClass">
      <slot v-if="renderContent" />
    </div>
  </div>
</template>

<style lang="scss">
.biroui-modal-container {
  @apply fixed inset-0 z-[5] grid place-items-center;

  &:not(.biroui-active) {
    @apply pointer-events-none backdrop-blur-0;

    [data-biroui-modal-content] {
      @apply opacity-0 -translate-y-8;
    }

    &::before {
      @apply bg-transparent;
    }
  }

  &::before {
    content: "";
    @apply fixed inset-0 bg-black bg-opacity-70 transition-colors duration-300;
  }
}

[data-biroui-modal-content] {
  @apply opacity-100 translate-y-0 transition-[opacity,transform] duration-300 bg-white;
}
</style>
