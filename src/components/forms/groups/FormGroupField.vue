<template>
  <div class="form-group">
    <label :for="inputId">{{ label }}</label>
    <input
      :id="inputId"
      :type="fieldType"
      class="input"
      :value="modelValue"
      @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
    />
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits, type InputTypeHTMLAttribute } from "vue"

const props = defineProps<{
  modelValue: string
  fieldType: InputTypeHTMLAttribute
  label: string
  inputId: string
}>()

const emit = defineEmits<{
  (e: "update:modelValue", value: string): void
}>()
</script>

<style scoped>
  .form-group{
    display: flex;
    flex-direction: column;
    gap:var(--spacing-xs)
  }
  input{
    border: 1px solid var(--color-interactive);
  }
  input:focus{
    outline: 2px solid var(--color-interactive);
  }
</style>