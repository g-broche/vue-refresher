<template>
  <div class="container">
    <AppHeader
      @triggerLogin="openLoginModal"
      @triggerRegister="openRegisterModal"
    />

    <Modal
      v-if="modalContent"
      :modalContent="modalContent"
      :title="modalTitle"
      @close="closeModal"
    >
    </Modal>
  </div>
</template>

<script setup lang="ts">
  import { shallowRef, ref } from "vue";
  import Modal from "./components/Modal.vue";
  import AppHeader from "./components/AppHeader.vue";
  import LoginForm from "./components/forms/LoginForm.vue"
  import RegisterForm from "./components/forms/RegisterForm.vue"
  import type { Component } from "vue"

  const modalContent = shallowRef<Component | null>(null)

  const modalTitle = ref("")

  function openLoginModal(){
    openModal(LoginForm, "Connect to your account");
  }

  function openRegisterModal(){
    openModal(RegisterForm, "Create a new account");
  }

  function openModal(content: Component, title: string) {
    modalTitle.value = title;
    modalContent.value = content;
  }

  function closeModal() {
    modalTitle.value = "";
    modalContent.value = null;
  }
</script>

<style scoped>
  .container {
    background-color: #2b76a7;
    min-height: 100vh;
  }

  .btn {
    padding: 0.5rem 1rem;
    border-radius: 6px;
    border: none;
    cursor: pointer;
    font-size: 0.95rem;
  }

  .btn + .btn {
    margin-left: 0.5rem;
  }

  .btn-primary {
    background-color: #2563eb;
    color: white;
  }

  .btn-secondary {
    background-color: #16a34a;
    color: white;
  }

  .btn-submit {
    width: 100%;
    background-color: #3b82f6;
    color: white;
    margin-top: 0.5rem;
  }

  .form-group {
    margin-bottom: 1rem;
  }

  .input {
    width: 100%;
    padding: 0.5rem;
    border: 1px solid #d1d5db;
    border-radius: 6px;
    font-size: 0.9rem;
  }
</style>

<!-- Global styles and reset -->
<style>
  *,
  *::before,
  *::after {
    box-sizing: border-box;
    margin:0;
    padding:0
  }

  body {
    min-height: 100vh;
  }

  img, picture, video, canvas, svg {
    display: block;
    max-width: 100%;
  }

  input, button, textarea, select {
    font: inherit;
  }

  button {
    padding: .25rem .5rem;
  }

  form {
    display: flex;
    flex-direction: column;
    gap:1rem;
  }
  .form-group{
    display: grid;
    grid-template-columns: 2fr 5fr;
  }
</style>