<template>
    <form @submit.prevent="handleSubmit">
        <div class="form-group">
            <label>Email</label>
            <input v-model="email" type="email" class="input" />
        </div>
        
        <div class="form-group">
            <label>Password</label>
            <input v-model="password" type="password" class="input" />
        </div>

        <button type="submit" class="btn btn-submit">Login</button>
    </form>
</template>

<script setup lang="ts">
    import { ref, defineEmits } from "vue"

    const email = ref("")
    const password = ref("")

    const emit = defineEmits(["success"])

    function handleSubmit() {
        console.log("Login with", email.value, password.value)
        emit("success")
    }
</script>

<style></style>