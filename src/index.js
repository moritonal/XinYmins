import Vue from 'vue';
// import 'babel-polyfill';
import App from './components/App.vue';

import BootstrapVue from "bootstrap-vue";


Vue.use(BootstrapVue);

import 'bootstrap-vue/dist/bootstrap-vue.css'

import "./scss/custom.scss"

new Vue({
    el: '#app',
    render: h => h(App)
});

if ('serviceWorker' in navigator) {

    let val = process.env.NODE_ENV;

    let setServiceWorker = val != "development";

    console.log(`Release mode is '${val}', ${setServiceWorker ? '' : 'not'} setting ServiceWorker`);

    if (setServiceWorker) {
        window.addEventListener('load', () => {
            navigator.serviceWorker.register('/sw.js')
            .then(reg => {
                console.log("ServiceWorker correctly registered");
                reg.update();
                reg.onupdatefound = () => {
                    console.log("Update to ServiceWorker found");
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
}