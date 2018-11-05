import { configure } from '@storybook/vue';

import Vue from 'vue/dist/vue.js';
import Vuex from 'vuex'; // Vue plugins

// Import your custom components.
import SpinnerComponent from '../components/Spinner.vue';

// Install Vue plugins.
Vue.use(Vuex);

// Register custom components.
Vue.component('spinner-component', SpinnerComponent);

function loadStories() {
  // You can require as many stories as you need.
  require('../components/stories');
}

configure(loadStories, module);