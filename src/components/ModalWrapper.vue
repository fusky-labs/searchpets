<script setup lang="ts">
const props = defineProps<{
  modalActive?: boolean
  modalClass?: string
}>()

const emit = defineEmits<{
  (e: "dismissModal", payload?: object): void
}>()

const renderModalContent = ref<boolean>(false)

watch(
  (): Ref<boolean> => toRef(props.modalActive),
  () => {
    !props.modalActive
      ? setTimeout(() => (renderModalContent.value = false), 300)
      : (renderModalContent.value = true)
  }
)
</script>

<template>
  <div
    biroui-modal-container
    :class="{ 'biroui-active': modalActive }"
    role="dialog"
  >
    <div biroui-modal-content :class="modalClass">
      <slot v-if="renderModalContent" />
    </div>
  </div>
</template>

<style lang="scss">
[biroui-modal-container] {
  @apply fixed inset-0 z-[5] grid place-items-center;

  &:not(.biroui-active) {
    @apply pointer-events-none backdrop-blur-0 #{!important};

    [biroui-modal-content] {
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

[biroui-modal-content] {
  @apply opacity-100 translate-y-0 transition-[opacity,transform] duration-300 bg-[var(--sp-modal-window)];
}
</style>
