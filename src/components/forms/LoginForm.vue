<template>
    <form @submit.prevent="handleSubmit">
        <FormGroupField
            v-model="email"
            field-type="email"
            label="Email"
            inputId="email-field"
            :constraints="emailConstraints"
            ref="emailGroup"
        />

        <FormGroupField
            v-model="password"
            field-type="password"
            label="Password"
            inputId="password-field"
            :constraints="passwordConstraints"
            ref="passwordGroup"

        />

        <button type="submit" class="button submit">Login</button>
    </form>
</template>

<script setup lang="ts">
    import { ref, defineEmits } from "vue";
    import FormGroupField from "./groups/FormGroupField.vue";
    import type { LoginRequest } from "@/types/Requests";
    import { useAuthStore } from "@/stores/auth";
    import { RequiredConstraint, EmailConstraint, PasswordConstraint } from "@/validators/constraints/Constraint";
    import { validateFormGroups } from "@/utils/validationUtil";

    const email = ref("");
    const password = ref("");

    // setting up constraints for the validation
    const emailConstraints = new Set([
        new RequiredConstraint("Email is required"),
        new EmailConstraint()
    ]);
    const passwordConstraints = new Set([
        new RequiredConstraint("Password is required"),
        new PasswordConstraint()
    ]);

    // getting ref to the form groups for use in the script
    const emailGroup = ref<InstanceType<typeof FormGroupField> | null>(null);
    const passwordGroup = ref<InstanceType<typeof FormGroupField> | null>(null);

    const formGroups = [emailGroup, passwordGroup]

    const authStore = useAuthStore();

    const emit = defineEmits(["close"]);

    async function handleSubmit() {
        console.log("firing submit")
        try {
            const isFormValid = validateFormGroups(formGroups); // running validation of all form groups
            if(!isFormValid){
                return;
            }
            // if valid, attempt to log through API and store user
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