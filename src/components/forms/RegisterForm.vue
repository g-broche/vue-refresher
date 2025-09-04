<template>
    <form @submit.prevent="handleSubmit">
        <FormGroupField
            v-model="firstName"
            field-type="text"
            label="First name"
            inputId="first-name-field"
        />
        <FormGroupField
            v-model="lastName"
            field-type="text"
            label="Last name"
            inputId="last-name-field"
        />
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
        <FormGroupField
            v-model="passwordConfirm"
            field-type="password"
            label="Confirmation Password"
            inputId="password-confirm-field"
        />
        
        <button type="submit" class="button submit">Register </button>
    </form>
</template>

<script setup lang="ts">
    import { ref, defineEmits } from "vue";
    import { useAuthStore } from "@/stores/auth";
    import { storeToRefs } from "pinia";
    import FormGroupField from "./groups/FormGroupField.vue";

    const authStore = useAuthStore();

    const firstName = ref("");
    const lastName = ref("");
    const email = ref("");
    const password = ref("");
    const passwordConfirm = ref("");

    const emit = defineEmits(["close"])
    async function handleSubmit() {
        try {
            const registerData = {
                firstName: firstName.value,
                lastName: lastName.value,
                email: email.value,
                password: password.value,
                passwordConfirm: passwordConfirm.value,
            };
        await authStore.login(registerData);
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