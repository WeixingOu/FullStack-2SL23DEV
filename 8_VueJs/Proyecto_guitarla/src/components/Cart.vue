<template>
  <div class="cart">
    <h2>Carrito</h2>
    <ul>
      <li v-for="(item, index) in items" :key="index">
        {{ item.name }} - {{ item.quantity }}
        <button @click="removeFromCart(item)">Eliminar</button>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    items: Array,
  },
  methods: {
    removeFromCart(item) {
      this.$emit('remove-from-cart', item);
    },
  },
};
</script>