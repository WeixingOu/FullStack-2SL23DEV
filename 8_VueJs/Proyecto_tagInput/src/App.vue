<script>
import inputTag from "./components/inputTag.vue";
export default {
  components: {
    inputTag,
  },
  methods: {
    handleOnTagsChange(tags) {
      console.log(tags);
    }
  }
}
</script>

<template>
  <inputTag @onTagsChange="handleOnTagsChange" />
</template>

<style scoped>

</style>