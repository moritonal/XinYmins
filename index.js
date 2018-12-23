import Vue from 'vue';
import App from './components/App.vue';

import BootstrapVue from "bootstrap-vue";


Vue.use(BootstrapVue);

// import 'bootstrap/dist/css/bootstrap.css'

import 'bootstrap-vue/dist/bootstrap-vue.css'

import "./scss/custom.scss"

new Vue({
    el: '#app',
    render: h => h(App)
});