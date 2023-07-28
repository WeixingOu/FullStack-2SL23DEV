<script>
export default {
    emits: ["onTagsChange"],
    data() {
        return {
            currentValue: '',
            tags: [],
        }
    },
    methods: {
        toHandlerKeyDown(e) {
            if (e.key === 'Backspace' && this.currentValue === '') {
                this.tags.pop(this.currentValue);
                // this.onTagsChange(this.tags);
                this.$emit('onTagsChange', this.tags);
            }
        },
        handleSubmit() {
            if (this.currentValue !== '') {
                if (!this.tags.some(item => item === this.currentValue)) {
                    this.tags.push(this.currentValue);
                    this.currentValue = '';
                    // this.onTagsChange(this.tags);
                    this.$emit('onTagsChange', this.tags);
                }
            }
        },
        deleteTag(tag) {    
            this.tags = this.tags.filter(item => item !== tag);
            // this.onTagsChange(this.tags);
            this.$emit('onTagsChange', this.tags);
        }
    },
}
</script>

<template>
    <div class="inputTag">
        <div class="tags">
            <div class="tag" v-for="(tag, index) in tags" :key="index">
                {{ tag }} <button @click="deleteTag(tag)">X</button>
            </div>
        </div>
        <form @submit.prevent="handleSubmit">
            <input type="text" v-model="currentValue" @keydown="toHandlerKeyDown" />
        </form>
    </div>
</template>

<style scoped>
.inputTag {
    display: inline-flex;
    border: solid 1px #1d1d1f;
    border-radius: 3px;
    max-width: 100vw;
    flex-direction: column;
}

.tags {
    display: flex;
    gap: 3px;
    padding: 5px;
    flex-wrap: wrap;
}

.tags .tag {
    display: flex;
    padding: 5px;
    border: solid 1px #ccc;
    gap: 5px;
    align-items: center;
    border-radius: 3px;
}

.inputTag input {
    border: none;
    outline: none;
    padding: 10px;
    font-size: 15px;
    line-height: 15px;
}

.inputTag form {
    display: inline-flex;
    height: 46px;
}

.inputTag button {
    background-color: transparent;
    border: none;
    border-radius: 3px;
}

.inputTag button:hover {
    background-color: #eee
}</style>