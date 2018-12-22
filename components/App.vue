<template>
  <div id="app" class="container-fluid h-100">

    <div class="row mx-4 row py-4 justify-content-center d-flex">
      <div class="col m-1">
        <div class="input-group">
          <input type="number" value="1" class="form-control" v-model="numberOfItems" />
          <div class="input-group-append">
            <span class="input-group-text">items</span>
          </div>
        </div>
      </div>
      <div class="col-1 justify-content-center align-items-center d-flex">
        <span>in</span>
      </div>
      <div class="col m-1">
        <div class="input-group">
          <input type="number" value="1" class="form-control" v-model="numberOfMinutes" />
          <div class="input-group-append">
            <span class="input-group-text">mins</span>
          </div>
        </div>
      </div>
    </div>

    <spinner-component 
      id="spinner"
      class="d-flex justify-content-center"
      v-bind:tasks="tasks"
      v-bind:time-start="timeStart"
      v-bind:time-now="timeNow"
      v-bind:time-end="timeEnd"
      v-bind:inner-radius-percentage=0.4
      v-bind:chunk-padding=10
      v-bind:chunk-stroke=10
      v-bind:disabled=false
      progress-colour="red"
      chunk-colour="green"
      chunk-luminosity="bright">
    </spinner-component>

    <footer-component class=""
      v-on:next="next"
      v-on:previous="previous">
    </footer-component>
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

    /*this.tasks = [];

    for (let i=0;i<7;i++) {
      this.tasks.push({});
    }*/

    setInterval(() => {
      this.timeNow = moment();
    }, 33);

    this.timeNow = moment();
  },
  computed: {
    tasks: function() {

      let num = parseInt(this.numberOfItems);
      let t = [];

      for (let i=0;i<num;i++) {
        t.push({});
      }

      return t;
    },
    timeEnd: function() {
      return moment().add(this.numberOfMinutes, "minute");
    }
  },
  methods: {
    next: function()  {
      let nextTask = this.tasks.find(i=>i.stopTime == null);
      
      if (nextTask) {
        nextTask.stopTime = moment();
      }
    },
    previous: function() {
      let lastTask = this.tasks.reduce((prev, curr) => curr.stopTime != null ? curr : prev, null);

      if (lastTask) {
        lastTask.stopTime = null;
      }
    }
  },
  data() {
    return {
      timeStart: moment(),
      timeNow: moment(),
      numberOfItems: 6,
      numberOfMinutes: 5
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
    display: flex;
    flex-direction: column;
    background-color: antiquewhite
  }
  html {
    font-size: 4vmin;
  }
  #spinner {
    width: 90vmin;
    /*height: 90vmin;*/
    flex-grow: 1;
    margin-left: auto;
    margin-right: auto;
  }
</style>