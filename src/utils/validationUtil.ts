import type FormGroupField from "@/components/groups/FormGroupField.vue";
import type { Ref } from "vue";

export function validateFormGroups(
    formGroups: Ref<InstanceType<typeof FormGroupField> | null>[]
): boolean {
    const validationResult: boolean[] = [];
    for (const formGroup of formGroups) {
        validationResult.push(formGroup.value?.validate() || false)
    }
    return validationResult.every(result => result === true);
}