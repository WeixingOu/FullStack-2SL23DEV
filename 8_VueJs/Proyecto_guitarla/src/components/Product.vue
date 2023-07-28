<template>
  <div class="product">
    <img :src="product.image" :alt="product.name" />
    <h2>{{ product.name }}</h2>
    <p>{{ product.description }}</p>
    <button @click="addToCart">Agregar al carrito</button>
  </div>
</template>

<script>
export default {
  props: {
    product: Object,
  },
  methods: {
    addToCart() {
      this.$emit('add-to-cart', this.product);
    },
  },
};
</script>
