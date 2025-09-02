<template>
  <svg
    :viewBox="icon.viewBox"
    xmlns="http://www.w3.org/2000/svg"
    :width="icon.width"
    :height="icon.height"
  >
    <path v-for="(d, i) in icon.paths" :key="i" :d="d" />
  </svg>
</template>

<script setup lang="ts">
import { icons, type IconName } from "@/assets/icons"

const props = defineProps<{
  name: IconName
}>()

const icon = icons[props.name]
</script>

<style scoped>
svg {
  display: inline-block;
  vertical-align: middle;
}
</style>