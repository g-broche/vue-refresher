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
    <div class="app-content-wrapper">
      <Navigation class="nav content-box" />
      <main>
        <router-view />
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { shallowRef, ref } from "vue";
  import Modal from "./components/Modal.vue";
  import AppHeader from "./components/AppHeader.vue";
  import LoginForm from "./components/forms/LoginForm.vue"
  import RegisterForm from "./components/forms/RegisterForm.vue"
  import type { Component } from "vue"
import Navigation from "./components/Navigation.vue";

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
    background-color: var(--color-primary);
  }

  .app-content-wrapper {
    min-height: 100vh;
    width:100%;
    padding: var(--spacing-xl);
    display: flex;
    gap: var(--spacing-l);
  }

  .nav{
    width: 15%;
  }

  main{
    width: 85%;
  }
</style>