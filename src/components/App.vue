<template>
  <div id="app" class="container-fluid h-100">
    
    <div class="row mx-2 row py-4 justify-content-center d-flex">
      <div class="row mx-2 row py-4 justify-content-center d-flex hacks">
        <div>I want to go through</div>
      </div>
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

    <transition name="expand">
      <spinner-component
        id="spinner"
        ref="spinner"
        class="justify-content-center max-height"
        v-bind:tasks="tasks"
        v-bind:time-start="timeStart"
        v-bind:time-now="timeNow"
        v-bind:time-end="timeEnd"
        v-bind:inner-radius-percentage=0.4
        v-bind:chunk-padding=8
        v-bind:chunk-stroke=4
        v-bind:disabled="spinnerDisabled"
        v-bind:total="spinnerTotal"
        progress-colour="red"
        chunk-colour="monochrome"
        chunk-luminosity="light"
        v-show='stage == "timer"'>
      </spinner-component>
    </transition>

    <footer-component
      v-on:next="next"
      v-on:previous="previous"
      v-on:go="Go"
      v-bind:stage="stage">
    </footer-component>
  </div>
</template>

<script>

import moment from "moment"
import { Tween, Ease ,Ticker } from "@createjs/tweenjs";

import footer from "./Footer.vue";

export default
{
  name: 'app',
  components: {
      "spinner-component": () => import("./Spinner.vue"),
      "footer-component": footer
  },
  mounted : function() {
    //setTimeout(this.Go, 2000);
  },
  computed: {
    /*stage: function() {
      if (this.numberOfItems == null || this.numberOfMinutes == null) {
        return "intro";
      } else {
        return "timer";
      }
    },*/
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
    Stop: function() {
      this.stage = "intro";
      this.stopTimer();
      this.numberOfItems = 0;
      this.numberOfMinutes = 0;
      this.$refs.spinner.clear();
    },
    Go: function() {

      this.startTimer();

      this.stage = "timer";

      this.timeStart = moment();
      
      if (this.numberOfItems == null) 
        this.numberOfItems = 5;

      if (this.numberOfMinutes == null)
        this.numberOfMinutes = 0.25;

      setTimeout(() => {
        this.$refs.spinner.handleResize();
      }, 50);

      setTimeout(() => {
        this.spinnerDisabled = false;

        Ticker.timingMode = Ticker.RAF;
        Ticker.framerate = 60;

        Tween.get(this)
          .to({spinnerTotal:360}, 1000, Ease.getPowOut(2))
          .call(() => {
            Ticker.paused = true;
          });

      }, 500);
    },
    stopTimer: function() {
      clearInterval(this.timer);
      this.timer = null;
    },
    startTimer: function() {
      
      //this.tasks.find(i=>i.stopTime == null).stopTime = this.timeStart.clone().add(1, "minute");
      //this.tasks.find(i=>i.stopTime == null).stopTime = this.timeStart.clone().add(3, "minute");

      this.timer = setInterval(() => {
        this.timeNow = moment();
        //this.timeNow = this.timeStart.clone().add(3, "minute");
      }, 33);

      this.timeNow = moment();
    },
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
      numberOfItems: 5,
      numberOfMinutes: 5,
      stage: "intro",
      spinnerDisabled: true,
      spinnerTotal: 0
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
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    -o-user-select: none;
    user-select: none;
  }
  #spinner {
    flex-grow: 1;
    display: flex;
    margin-left: auto;
    margin-right: auto;
    width: inherit;
  }

  :root {
    transition: font-size 0.2s;
  }

  @media screen and (min-width: 624px) {
    :root {
      font-size: 16px;
    }
  }

  /* If the screen size is 600px wide or less, set the font-size of <div> to 30px */
  @media screen and (max-width: 600px) {
    :root {
      font-size: 3.7vmin;
    }
  }

  #app {
    max-height: 95%;
    min-height: 95%;
    justify-content: center;
  }

  .input-group {
    flex-wrap: nowrap !important;
  }

  .expand-enter-active, .expand-leave-active {
    /*transition: max-height 5s;*/
    transition: flex-grow 1.3s cubic-bezier(0.075, 0.82, 0.165, 1.2);
  }

  .expand-enter, .expand-leave-to {
    /*max-height: 0px !important;*/
    flex-grow: 0 !important;
  }

  .fade-enter-active, .fade-leave-active {
    transition: opacity 5s;
  }

  .hacks {
    position: absolute;
    transform: translateY(-90px);
    transition: all 1s;
  }

  .fade-enter, .fade-leave-to {
    opacity: 0;
  }

  .max-height {
    max-height: 10000px;
  }

</style>