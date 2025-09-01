<!-- src/components/Modal.vue -->
<template>
  <div v-if="modalContent" class="modal-overlay" @click.self="close">
    <div class="modal-content">
      <header class="modal-header">
        <h2>{{ title }}</h2>
        <button @click="close" class="modal-close">&times;</button>
      </header>

      <!-- Render the dynamic component -->
      <component
        :is="modalContent"
        v-bind="componentProps"
        @success="handleSuccess"
        @cancel="close"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
  import { defineEmits } from 'vue'
  import type { Component } from "vue"
  
const props = defineProps<{
  modalContent: Component | null;
  title: string;
  componentProps?: Record<string, unknown>;
}>();

  const emit = defineEmits(["close", "success"])

  function close() {
    emit("close")
  }

  function handleSuccess() {
    close()
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
  background: white;
  padding: 1.5rem;
  border-radius: 8px;
  width: 380px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}
.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}
.modal-close {
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: #555;
}
</style>