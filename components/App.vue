<template>
  <div id="app">
    <header-component></header-component>

    <spinner-component></spinner-component>

    <footer-component></footer-component>
  </div>
</template>

<script>

import Spinner from "./Spinner.vue"
import Header from "./Header.vue"
import Footer from "./Footer.vue"

export default
{
  name: 'app',
  components: {
      "spinner-component": Spinner,
      "header-component": Header,
      "footer-component": Footer
  },
  data() {
    return {
      msg: 'Welcome friend, to Your Vue.js App!'
    }
  }
}
</script>

<style lang="css">
  #app 
  {
    color: rgb(136, 0, 163);
  }
</style>