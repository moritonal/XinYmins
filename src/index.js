import Vue from 'vue';
import 'babel-polyfill';
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

if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        console.log("Registering service worker");
        navigator.serviceWorker.register('/sw.js')
        .then(reg => {
            console.log("Registered");
            reg.update();
            reg.onupdatefound = () => {
                console.log("Update found");
                const installingWorker = reg.installing;

                installingWorker.onstatechange = () => {
                    switch (installingWorker.state) {
                        case "installed":
                            if (navigator.serviceWorker.controller) {
                                console.log("Update found, refreshing");
                                location.reload(true);
                            }
                    }
                }
            }
        })
        .catch(registrationError => {
            console.log('SW registration failed: ', registrationError);
        });
    });
}