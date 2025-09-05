<!-- src/components/Modal.vue -->
<template>
  <div v-if="modalContent" class="modal-overlay">
    <div class="modal-content content-box scroll-container">
      <ButtonIcon
        :icon="'close'"
        :button-classes="['modal-close']"
        :onClick="triggerModalClosure"
      />
      <header class="modal-header">
        <h2>{{ title }}</h2>
      </header>

      <!-- Render the dynamic component -->
      <component
        :is="modalContent"
        v-bind="componentProps"
        @close="triggerModalClosure"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
  import { defineEmits } from 'vue'
  import ButtonIcon from './elements/ButtonIcon.vue';
  import type { Component } from "vue"
  
const props = defineProps<{
  modalContent: Component | null;
  title: string;
  componentProps?: Record<string, unknown>;
}>();

  const emit = defineEmits(["close"])

  function triggerModalClosure() {
    emit("close")
  }
</script>

<style scoped>
/* same modal styling from before */
.modal-overlay {
  position: fixed;
  inset: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
}
.modal-content {
  position:relative;
  padding: 5rem;
  border-radius: var(--radius);
  min-width: 50vw;
  max-width: 80vw;
  max-height: 80vh;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}
.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}
.modal-close {
  position: absolute;
  top:0;
  right:0;
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: #555;
}
</style>