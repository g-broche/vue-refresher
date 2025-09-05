import type FormGroupField from "@/components/groups/FormGroupField.vue";
import type { Ref } from "vue";

/**
 * Given an array of refs pointing to FormGroupFields, will run validation for each group and return the validation result
 * @param formGroups array of FormGroupField refs used to validate each form group
 * @returns true if all group fields are valid, false otherwise
 */
export function validateFormGroups(
    formGroups: Ref<InstanceType<typeof FormGroupField> | null>[]
): boolean {
    const validationResult: boolean[] = [];
    for (const formGroup of formGroups) {
        validationResult.push(formGroup.value?.validate() || false)
    }
    return validationResult.every(result => result === true);
}