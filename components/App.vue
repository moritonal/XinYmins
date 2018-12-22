<template>
  <div id="app" class="container-fluid">
    <header-component class="row mx-4" ></header-component>

    <spinner-component 
      id="spinner"
      class="d-flex justify-content-center mb-4"
      v-bind:tasks="tasks"
      v-bind:time-start="timeStart"
      v-bind:time-now="timeNow"
      v-bind:time-end="timeEnd"
      v-bind:inner-radius-percentage=0.4
      v-bind:chunk-padding=10
      v-bind:chunk-stroke=10
      progress-colour="red"
      chunk-colour="green"
      chunk-luminosity="bright"
      v-on:click="click">
    </spinner-component>

    <footer-component class="navbar fixed-bottom"></footer-component>
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

    this.tasks = [];

    for (let i=0;i<7;i++) {
      this.tasks.push({});
    }

    /*setInterval(() => {
      this.timeNow = moment();
    }, 10);*/

    this.timeNow = moment();
  },
  methods: {
    add: function() {
      this.tasks.push({});
    },
    click: function() {
      let nextTask = this.tasks.find(i=>i.stopTime == null);
      
      nextTask.stopTime = moment();
    }
  },
  data() {
    return {
      msg: 'Welcome friend, to Your Vue.js App!',
      tasks: null,
      timeStart: moment(),
      timeNow: moment(),
      timeEnd: moment().add(1, "minute")
    }
  }
}
</script>

<style lang="css">
  .border {
    border: 1px solid black;
  }
  #app 
  {
    color: rgb(136, 0, 163);
    min-width: 240px;
  }
  html {
    font-size: 42px;
  }
  #spinner {
    width: 90vmin;
    height: 90vmin;
    margin-left: auto;
    margin-right: auto;
  }
</style>