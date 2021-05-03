<template>
    <div :class="computedClass">
        <template v-if="type === 'catalog'">
          <div class="col" data-id="${item.id_product}">
            <div class="card themed-grid-col">
              <img :src="computedImg" :alt="item.product_name">
              <div class="card-body">
                <h5 class="card-title">{{ item.product_name }}</h5>
                <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                <p class="price"> Цена: {{ item.price }} руб.</p>
                <button  class="btn btn-primary" name="buy-btn"
                         @click="$emit('add-item', item)">Купить</button>
              </div>
            </div>
          </div>

        </template>
        <template v-else-if="type === 'cart'" >
          <ul class="list-group w-100 list-group-horizontal cart-item" data-id="${item.id_product}">
            <li class="list-group-item w-25"> <img :src="computedImg" :alt="item.product_name"></li>
            <li class="list-group-item w-25">{{ item.product_name }}</li>
            <li class="list-group-item w-10">{{ item.quantity }}</li>
            <li class="list-group-item w-25">{{ item.price }}</li>
            <li class="list-group-item w-25"> <button name="del-btn" class="del-btn" @click="$emit('delete-item', item.id_product)">&times;</button></li>
          </ul>

        </template>
    </div>
</template>

<script>
    export default {
        props: {
            type: {
                type: String,
                default: 'catalog'
            },
            item: {
                type: Object,
            },
        },
        computed: {
            computedClass() {
                return {
                    'product-item': this.type === 'catalog',
                    'cart-item': this.type === 'cart'
                }
            },
            computedImg() {
                return `https://via.placeholder.com/${this.type === 'catalog' ? '300x200' : '100x80'}`
            }
        },
        methods: {
            // addItem(item) {
            //     eventBus.$emit('add-item', item);
            // },
        }
    };
</script>

<style>

</style>