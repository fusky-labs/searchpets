<script setup lang="ts">
const props = defineProps<{ date: string }>()

const [machineDate, readableDate] = useParseDate(props.date)
</script>

<template>
  <time :datetime="machineDate">{{ readableDate }}</time>
</template>
