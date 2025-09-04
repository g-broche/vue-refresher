<template>
    <header class="background-light">
        <h1 class="interactive-text">MyPhotoApp</h1>
        <template v-if="!isAuthenticated">
            <div class="auth-menu">
                <button @click="emitLoginOpen">Sign in</button>
                <button @click="emitRegisterOpen">Sign up</button>
            </div>
        </template>
        <template v-else>
            <div class="auth-menu">
                <span>{{ user?.firstName }}</span>
                <button @click="handleLogout">Logout</button>
            </div>
        </template>
        
    </header>
</template>

<script setup lang="ts">
    import { defineEmits } from 'vue';
    import { useAuthStore } from "@/stores/auth";
    import { storeToRefs } from "pinia";

    const authStore = useAuthStore();
    const { user, isAuthenticated } = storeToRefs(authStore);

    const emit = defineEmits(["triggerRegister", "triggerLogin"]);
    function emitLoginOpen() {
        emit("triggerLogin")
    }
    function emitRegisterOpen() {
        emit("triggerRegister")
    }
    async function handleLogout(){
        try {
            await authStore.logout()
        } catch (err) {
            const message = err instanceof Error ? err.message : "Unknown error during the operation";
            alert(message);
        }
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
    div.auth-menu{
        display: flex;
        gap:1rem;
        align-items: center;
    }
</style>