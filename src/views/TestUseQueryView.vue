<template>
    <div>
        <ViewTitle :title="title"/>
        <form class="controls" @submit.prevent="handleSubmit">
            <FormGroupField
                v-model.trim="page"
                field-type="string"
                label="Page"
                input-id="page-field"
                :constraints="pageConstraints"
                ref="pageGroup"
            />

            <FormGroupField
                v-model.trim="quantity"
                field-type="string"
                label="Result size"
                input-id="result-field"
                :constraints="quantityConstraints"
                ref="quantityGroup"
            />

            <button type="submit" class="button submit">Get Results</button>
        </form>

        <div class="dynamic-content">
            <p v-if="isLoading">...loading data from source</p>
            <div v-else-if="data && data?.length > 0" class="image-grid">
                <div v-for="image in data" :key="image.id">
                    <img class="picture" :src="image.download_url" :alt="`image number ${image.id} by ${image.author}`">
                </div>
            </div>
            <p v-else-if="data">No images to display</p>
            <p v-else class="error">{{ error?.message || "An error occurred" }}</p>
        </div>
    </div>
</template>

<script setup lang="ts">
    import ViewTitle from '@/components/elements/ViewTitle.vue';
    import { imageService } from '@/services/ImageService';
    import { useQuery } from '@tanstack/vue-query';
    import FormGroupField from '@/components/forms/groups/FormGroupField.vue';
import { ref } from 'vue';
import { IntegerConstraint } from '@/validators/constraints/IntegerConstraint';
import { MinValueConstraint } from '@/validators/constraints/MinValueConstraint';
import { validateFormGroups } from '@/utils/validationUtil';
    const title = "This is a view to experiment with Vue Query";

    const page = ref("1");
    const quantity = ref("20");

    const submittedPage = ref<number>(1);
    const submittedQuantity = ref<number>(20);

    const pageConstraints = new Set([
        new IntegerConstraint("If filled, the page must be an integer"),
        new MinValueConstraint(1, "If filled, the page must be at least 1")
    ]);
    const quantityConstraints = new Set([
        new IntegerConstraint("If filled, the result quantity must be an integer"),
        new MinValueConstraint(1, "If filled, the result quantity must be at least 1")
    ]);

    const pageGroup = ref<InstanceType<typeof FormGroupField> | null>(null);
    const quantityGroup = ref<InstanceType<typeof FormGroupField> | null>(null);

    const formGroups = [pageGroup, quantityGroup]
    
    const {data, isLoading, error, refetch} = useQuery(
        {
            queryKey: ["images", submittedPage, submittedQuantity],
            queryFn: () => imageService.getImagePage({
                page: submittedPage.value,
                limit: submittedQuantity.value
            })
        }
    )
    
    function handleSubmit(){
        const isFormValid = validateFormGroups(formGroups);
        if(isFormValid){
            submittedPage.value = Number(page.value);
            submittedQuantity.value = Number(quantity.value);
            refetch
        }
    }
</script>
<style scoped>
    .controls{
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        & .form-group{
            height: fit-content;
            display: flex;
            flex-direction: row; 
            align-items: center;
        }
    }
    .image-grid{
        display: grid;
        grid-template-columns: repeat(4,1fr);
        grid-auto-rows: 1fr;
        column-gap: var(--spacing-m);
        row-gap: var(--spacing-m);
        & > div{
            border-radius: .25rem;
            padding: .25rem;
            background-color: var(--color-image-backdrop);
            display: flex;
            justify-content: center;
            align-items: center;
            & img {
                max-height: 200px;
                border-radius: 2px;
                border: 1px solid var(--color-interactive);
            }
        }
    }
</style>