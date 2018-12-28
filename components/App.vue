<template>
  <div id="app" class="container-fluid h-100">

    <div class="row mx-2 row py-4 justify-content-center d-flex">
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
      v-bind:chunk-padding=8
      v-bind:chunk-stroke=2
      v-bind:disabled=false
      progress-colour="red"
      chunk-colour="monochrome"
      chunk-luminosity="light">
    </spinner-component>

    <footer-component class=""
      v-on:next="next"
      v-on:previous="previous">
    </footer-component>
  </div>
</template>

<script>

import moment from "moment"

export default
{
  name: 'app',
  components: {
      "spinner-component": () => import("./Spinner.vue"),
      "header-component": () => import("./Header.vue"),
      "footer-component": () => import("./Footer.vue")
  },
  mounted : function() {

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

<style lang="scss">

  @import "./../scss/custom.scss";

  .border {
    border: 1px solid black;
  }
  #app
  {
    color: $body-color;
    min-width: 240px;
    display: flex;
    flex-direction: column;
    background-color: $body-bg;
    max-width: $max-width;
  }
  html {
    font-size: 4vmin;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    -o-user-select: none;
    user-select: none;
  }
  #spinner {
    width: 90vmin;
    flex-grow: 1;
    margin-left: auto;
    margin-right: auto;
  }

</style>