<template>
    <div>
        <error v-if="isErrorOnPage"
               :errorText="errorText"
               @close-popup="isErrorOnPage = !isErrorOnPage"/>
      <header class="p-3 bg-dark text-white">
        <div class="container">
          <div class="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
            <a href="/" class="d-flex align-items-center mb-2 mb-lg-0 text-white text-decoration-none">
              <svg class="bi me-2" width="40" height="32">
                <use xlink:href="#bootstrap"/>
              </svg>
            </a>

            <ul class="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
              <li><a href="#" class="nav-link px-2 text-secondary">Home</a></li>
              <li><a href="#" class="nav-link px-2 text-white">Features</a></li>
              <li><a href="#" class="nav-link px-2 text-white">Pricing</a></li>
              <li><a href="#" class="nav-link px-2 text-white">FAQs</a></li>
              <li><a href="#" class="nav-link px-2 text-white">About</a></li>
            </ul>

            <search @search-elem-in-catalog="updateSearchLine" />

            <div class="text-end">
              <button type="button" class="btn btn-outline-light me-2">Login</button>
              <button type="button" class="btn btn-warning">Sign-up</button>
              <button type="button" class="btn btn-outline-danger" @click="isCartVisible = !isCartVisible">Cart</button>

            </div>
            <cart v-show="isCartVisible"
                  :cartData="cartData"
                  :addItem="addItem"
                  :addAnswer="addAnswer"
                  :deleteAnswer="deleteAnswer"
                  @delete-item="deleteFromCart"
                  @get-cart-data="getCartData" />
          </div>

        </div>

      </header>
<!--        <header>-->
<!--            <div class="logo">E-shop</div>-->
<!--            <div class="cart">-->
<!--                <search @search-elem-in-catalog="updateSearchLine" />-->
<!--                <button class="btn-cart" @click="isCartVisible = !isCartVisible">Cart</button>-->
<!--                <cart v-show="isCartVisible"-->
<!--                      :cartData="cartData"-->
<!--                      :addItem="addItem"-->
<!--                      :addAnswer="addAnswer"-->
<!--                      :deleteAnswer="deleteAnswer"-->
<!--                      @delete-item="deleteFromCart"-->
<!--                      @get-cart-data="getCartData" />-->
<!--            </div>-->
<!--        </header>-->
        <main>
            <catalog :searchLine="searchLine"
                     :catalogData="catalogData"
                     @add-item="addToCart"
                     @get-catalog-data="getCatalogData" />
        </main>
    </div>
</template>

<script>
    import catalog from '../containers/Catalog.vue';
    import cart from '../containers/Cart.vue';
    import search from '../components/Search.vue';
    import error from '../components/Error.vue'
    export default {
        components: {catalog, cart, search, error},
        data() {
            return {
                searchLine: '',
                catalogData: null,
                cartData: null,
                addItem: null,
                addAnswer: null,
                deleteAnswer: null,
                API: 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses/',
                isCartVisible: true,
                isErrorOnPage: false,
                errorText: null
            }
        },
        methods: {
            getData(url) {
                return fetch(this.API + url)
                    .then(respond => respond.json())
                    .catch(err => {
                        this.errorText = err.message;
                        this.isErrorOnPage = true;
                    })
            },
            getCatalogData(url) {
                this.catalogData = this.getData(url);
            },
            getCartData(url) {
                this.cartData = this.getData(url);
            },
            updateSearchLine(str) {
                this.searchLine = str;
            },
            addToCart(url, item) {
                this.addAnswer = this.getData(url);
                this.addItem = item;
            },
            deleteFromCart(url) {
                this.deleteAnswer = this.getData(url);
            }
        },
    }
</script>

<style>

</style>