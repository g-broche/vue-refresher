<template>
    <form class="default" @submit.prevent="handleSubmit">
        <FormGroupField
            v-model="firstName"
            field-type="text"
            label="First name"
            inputId="first-name-field"
            :constraints="firstNameConstraints"
            ref="firstNameGroup"
        />
        <FormGroupField
            v-model="lastName"
            field-type="text"
            label="Last name"
            inputId="last-name-field"
            :constraints="lastNameConstraints"
            ref="lastNameGroup"
        />
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
        <FormGroupField
            v-model="passwordConfirm"
            field-type="password"
            label="Confirmation Password"
            inputId="password-confirm-field"
            :constraints="passwordConfirmConstraints"
            ref="passwordConfirmGroup"
        />
        
        <button type="submit" class="button submit">Register </button>
    </form>
</template>

<script setup lang="ts">
    import { ref, defineEmits } from "vue";
    import { useAuthStore } from "@/stores/auth";
    import FormGroupField from "./groups/FormGroupField.vue";
    import { RequiredConstraint } from "@/validators/constraints/RequiredConstraint";
    import { PasswordConstraint } from "@/validators/constraints/PasswordConstraint";
    import { MinLengthConstraint } from "@/validators/constraints/MinLengthConstraint";
    import { MaxLengthConstraint } from "@/validators/constraints/MaxLengthConstraint";
    import { MatchConstraint } from "@/validators/constraints/MatchConstraint";
    import { EmailConstraint } from "@/validators/constraints/EmailConstraint";
    import { validateFormGroups } from "@/utils/validationUtil";

    const authStore = useAuthStore();

    const firstName = ref("");
    const lastName = ref("");
    const email = ref("");
    const password = ref("");
    const passwordConfirm = ref("");

    // getter use to get real time value of password input for comparison with the confirmation feild
    function getPasswordValue(){
        return password.value;
    }

    //setting up constraints
    const firstNameConstraints = new Set([
        new RequiredConstraint("First name is required"),
        new MinLengthConstraint(1),
        new MaxLengthConstraint(50)
    ]);
    const lastNameConstraints = new Set([
        new RequiredConstraint("Last name is required"),
        new MinLengthConstraint(1),
        new MaxLengthConstraint(50)
    ]);
    const emailConstraints = new Set([
        new RequiredConstraint("Email is required"),
        new EmailConstraint()
    ]);
    const passwordConstraints = new Set([
        new RequiredConstraint("Password is required"),
        new PasswordConstraint()
    ]);
    const passwordConfirmConstraints = new Set([
        new RequiredConstraint("Password confirmation is required"),
        new MatchConstraint(() => getPasswordValue(), "Confirmation is different from the given password")
    ]);

    // getting refs to the various form groups
    const firstNameGroup = ref<InstanceType<typeof FormGroupField> | null>(null);
    const lastNameGroup = ref<InstanceType<typeof FormGroupField> | null>(null);
    const emailGroup = ref<InstanceType<typeof FormGroupField> | null>(null);
    const passwordGroup = ref<InstanceType<typeof FormGroupField> | null>(null);
    const passwordConfirmGroup = ref<InstanceType<typeof FormGroupField> | null>(null);

    const formGroups = [firstNameGroup, lastNameGroup, emailGroup, passwordGroup, passwordConfirmGroup]

    const emit = defineEmits(["close"])
    async function handleSubmit() {
        try {
            // running validation for all form groups
            const isFormValid = validateFormGroups(formGroups);
            if(!isFormValid){
                return;
            }
            // if valid attempt to register user through API and store the authenticated user if success
            const registerData = {
                firstName: firstName.value,
                lastName: lastName.value,
                email: email.value,
                password: password.value,
            };
            await authStore.register(registerData);
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