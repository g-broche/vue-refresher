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
        
        <div class="form-group">
            <label>Password confirmation</label>
            <input v-model="passwordConfirm" type="password" class="input" />
        </div>
        
        <button type="submit" class="btn btn-submit">Register </button>
    </form>
</template>

<script setup lang="ts">
    import { ref, defineEmits } from "vue"

    const email = ref("")
    const password = ref("")
    const passwordConfirm = ref("")

    const emit = defineEmits(["success"])
    function handleSubmit() {
        console.log("Registering with", email.value, password.value);
        emit("success");
    }
</script>

<style></style>