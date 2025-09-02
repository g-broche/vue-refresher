<template>
    <header class="background-light">
        <h1 class="interactive-text">MyPhotoApp</h1>
        <div class="actions">
            <button @click="emitLoginOpen">Sign in</button>
            <button @click="emitRegisterOpen">Sign up</button>
        </div>
    </header>
</template>

<script setup lang="ts">
    import { defineEmits } from 'vue';
    const emit = defineEmits(["triggerRegister", "triggerLogin"]);
    function emitLoginOpen() {
        emit("triggerLogin")
    }
    function emitRegisterOpen() {
        emit("triggerRegister")
    }
</script>

<style scoped>
    header{
        padding: 1rem;
        height: 100px;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    div.actions{
        display: flex;
        gap:1rem;
        align-items: center;
    }
</style>