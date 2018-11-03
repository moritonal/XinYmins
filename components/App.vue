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

    <input type="button" v-on:click="click" value="Click"></input>

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
      // this.timeNow = moment();
    }, 10);
  },
  methods: {
    click: function() {
      let nextTask = this.tasks.find(i=>i.stopTime == null);
      
      nextTask.stopTime = moment();
    }
  },
  data() {
    return {
      msg: 'Welcome friend, to Your Vue.js App!',
      tasks: [
        {

        },{

        },{

        },{

        },{

        }
      ],
      timeStart: moment(),
      timeNow: moment().add(20, "seconds"),
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