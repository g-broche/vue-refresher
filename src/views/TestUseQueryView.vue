<template>
    <div>
        <ViewTitle :title="title"/>
    </div>
</template>

<script setup lang="ts">
    import ViewTitle from '@/components/elements/ViewTitle.vue';
    const title = "This is a view to experiment with Vue Query";
</script>