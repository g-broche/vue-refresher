<template>
    <form @submit.prevent="handleSubmit">
        <FormGroupField
            v-model="email"
            field-type="email"
            label="Email"
            inputId="email-field"
        />

        <FormGroupField
            v-model="password"
            field-type="password"
            label="Password"
            inputId="password-field"
        />

        <button type="submit" class="button submit">Login</button>
    </form>
</template>

<script setup lang="ts">
    import { ref, defineEmits } from "vue";
    import FormGroupField from "./groups/FormGroupField.vue";
    import type { LoginRequest } from "@/types/Requests";
    import { useAuthStore } from "@/stores/auth";

    const email = ref("");
    const password = ref("");

    const authStore = useAuthStore();

    const emit = defineEmits(["close"]);

    async function handleSubmit() {
        // console.log("Login with", email.value, password.value)
        try {
            const credentials : LoginRequest = {email: email.value, password: password.value};
            await authStore.login(credentials);
            if (authStore.isAuthenticated) {
                emit("close");
            }
        } catch (err) {
            const message = err instanceof Error ? err.message : "Unknown error during the operation";
            alert(message);
        }
    }
</script>

<style></style>