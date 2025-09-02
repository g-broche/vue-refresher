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
    import { ref, defineEmits } from "vue"
    import FormGroupField from "./groups/FormGroupField.vue"

    const firstName = ref("")
    const lastName = ref("")
    const email = ref("")
    const password = ref("")
    const passwordConfirm = ref("")

    const emit = defineEmits(["success"])
    function handleSubmit() {
        const user = {
            firstName: firstName.value,
            lastName: lastName.value,
            email: email.value,
            password: password.value,
            passwordConfirm: passwordConfirm.value,
        }
        console.log("Registering with", user);
        emit("success");
    }
</script>

<style></style>