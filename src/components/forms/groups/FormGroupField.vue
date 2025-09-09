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
  modelValue: string; // value corresponding to the name used in the parent component for the related ref
  fieldType: InputTypeHTMLAttribute;
  label: string;
  inputId: string;
  constraints: Set<BaseConstraint>; // set of constraints for validation
  modelModifiers?: { trim?: boolean }; 
}>();

// forward change of input value to the parent so the parent related ref can be updated
const emit = defineEmits<{
  (e: "update:modelValue", value: string): void;
}>();

const isTouched = ref(false); // turns true after first user action on input or through validation
const isValid = ref(true);
const errorMessage = ref<string | null>(null);

const inputElement = ref<HTMLInputElement | null>(null); // ref pointing to the input used in the form group so that its properties can be accessed

const validator = new InputFieldValidator(props.constraints);

/**
 * on submit validate the form group input and also forward the value to the parent
 * @param event change of input value
 */
function handleInputChange(event: Event) {
  let value = (event.target as HTMLInputElement).value;
  if (props.modelModifiers?.trim) {
    value = value.trim();
  }
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
  isTouched.value = true;
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