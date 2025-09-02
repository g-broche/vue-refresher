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
    import { ref, defineEmits } from "vue"
    import FormGroupField from "./groups/FormGroupField.vue"

    const email = ref("")
    const password = ref("")

    const emit = defineEmits(["success"])

    function handleSubmit() {
        console.log("Login with", email.value, password.value)
        emit("success")
    }
</script>

<style></style>