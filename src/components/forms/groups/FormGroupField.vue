<template>
  <div class="form-group">
    <label :for="inputId">{{ label }}</label>
    <input
      :id="inputId"
      :type="fieldType"
      class="input"
      :value="modelValue"
      @input="handleInputChange"
      ref="inputElement"
    />
    <p v-if="isTouched && errorMessage" class="error">
      {{ errorMessage }}
    </p>
  </div>
</template>

<script setup lang="ts">
import type { BaseConstraint } from "@/validators/constraints/Constraint";
import { InputFieldValidator } from "@/validators/InputFieldValidator";
import { defineProps, defineEmits, type InputTypeHTMLAttribute, ref, defineExpose } from "vue";

const props = defineProps<{
  modelValue: string;
  fieldType: InputTypeHTMLAttribute;
  label: string;
  inputId: string;
  constraints: Set<BaseConstraint>;
}>();

const emit = defineEmits<{
  (e: "update:modelValue", value: string): void;
}>();

const isTouched = ref(false);
const isValid = ref(true);
const errorMessage = ref<string | null>(null);

const inputElement = ref<HTMLInputElement | null>(null);

const validator = new InputFieldValidator(props.constraints);

function handleInputChange(event: Event) {
  const value = (event.target as HTMLInputElement).value;
  isTouched.value = true;
  runValidation(value);
  emit("update:modelValue", value);
}

/**
 * Runs validation and updates state.
 * Can be called manually by parent via `validate()`.
 */
function runValidation(value: string): boolean {
  const result = validator.validate(value);
  isValid.value = result.valid;
  errorMessage.value = result.message;
  return result.valid;
}

/**
 * Validate current field value on demand.
 * Exposed so parent can call via ref.
 */
function validate(): boolean {
  isTouched.value = true;
  return runValidation(props.modelValue);
}

// Expose functions/refs to parent
defineExpose({
  validate,
  isValid,
  errorMessage,
});
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