<script setup>
    import { ref, defineEmits } from 'vue';

    const text = ref('');
    const emits = defineEmits(['onNewItem']);

    function handleSubmit() {
        if (text !== ''){
            emits('onNewItem', text);
            text.value = '';
        }
    }
</script>

<template>
    <form @submit.prevent="handleSubmit">
        <input type="text" v-model="text">
    </form>
</template>

<style scoped>

</style>