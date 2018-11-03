<template>
  <div id="app">
    <header-component></header-component>

    <spinner-component 
      v-bind:tasks="tasks" 
      v-bind:time-start="timeStart"
      v-bind:time-now="timeNow"
      v-bind:time-end="timeEnd"
      v-on:click="click">
    </spinner-component>

    <footer-component></footer-component>
  </div>
</template>

<script>

import Spinner from "./Spinner.vue"
import Header from "./Header.vue"
import Footer from "./Footer.vue"
import moment from "moment"

export default
{
  name: 'app',
  components: {
      "spinner-component": Spinner,
      "header-component": Header,
      "footer-component": Footer
  },
  mounted : function() {
    setInterval(() => {
      //this.timeNow = moment();
    }, 100);
  },
  methods: {
    click: function() {
      this.timeNow = moment();
    }
  },
  data() {
    return {
      msg: 'Welcome friend, to Your Vue.js App!',
      tasks: [
        {
          stopTime: moment().add(10, "seconds")
        },{
          stopTime: moment().add(15, "seconds")
        },{},{}
      ],
      timeStart: moment(),
      timeNow: moment().add(12, "seconds"),
      timeEnd: moment().add(1, "minute")
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