<template>
    <button @click="onClick" :class="finalClass">     
        <SvgIcon :name="icon"/>
    </button>
</template>

<script setup lang="ts">
  import SvgIcon from "./SvgIcon.vue"
  import type { IconName } from "@/assets/icons"

  const props = defineProps<{
    icon: IconName
    buttonClasses?: string[]
    onClick: (...args: any[]) => any
  }>()

  const finalClass = props.buttonClasses
    ? `svg-button ${props.buttonClasses.join(" ")}`
    : "svg-button";
</script>