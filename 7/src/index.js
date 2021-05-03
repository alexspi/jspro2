import './assets/css/style.css';
import './assets/css/normalize.css'
import './assets/css/bootstrap.min.css'

import Vue from 'vue';
import app from './views/app.vue';

new Vue({
    render: h=> h(app)
}).$mount('#app')