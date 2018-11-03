<template>
  <div id="spinner"><div id="drawing"></div></div>
</template>

<script>

import * as svg from "svg.js"

function polarToCartesian(centerX, centerY, radius, angleInDegrees) {
  var angleInRadians = (angleInDegrees-90) * Math.PI / 180.0;

  return {
    x: centerX + (radius * Math.cos(angleInRadians)),
    y: centerY + (radius * Math.sin(angleInRadians))
  };
}

function describeArc(x, y, radius, startAngle, endAngle){

    var start = polarToCartesian(x, y, radius, endAngle);
    var end = polarToCartesian(x, y, radius, startAngle);

    var largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";

    var d = [
        "M", x, y,
        "L", start.x, start.y,
        "A", radius, radius, 0, largeArcFlag, 0, end.x, end.y
    ].join(" ");

    return d;       
}

import moment from "moment"

export default {
  name: 'spinner-component',
  props: [
    "tasks",
    "stopPoints",
    "timeStart",
    "timeNow",
    "timeEnd"
  ],
  data () {
    return {
      svgChunks: null,
      svgProgress: null,
      total: 360,
      padding: 1,
      size: 500,
      radius: null,
      width: null,
      x: null,
      y: null,
      svg: null
    }
  },
  mounted: function() {

    this.radius =  this.size/2,
    this.width = this.size/6,
    this.x = this.size/2,
    this.y = this.size/2,

    this.svg = SVG("drawing").size(500,500);

    var rect = this.svg.rect(-5,-5,10,10);

    this.svgChunks = [];

    let current = 0;

    let lastStopTime = this.timeStart;
    let spaceUsed = null;

    for (let i=0;i<this.tasks.length;i++) {
      
      let task = this.tasks[i];
      let chunkSize = this.total / this.tasks.length;

      if (task.stopTime) {
        chunkSize = task.stopTime - lastStopTime;
        
        let timePassed = task.stopTime - lastStopTime
        let timeTotal = this.timeEnd - this.timeStart;
        let ratio = timePassed / timeTotal;

        chunkSize = ratio * this.total

        lastStopTime = task.stopTime;
        
        spaceUsed = current + chunkSize;

      } else {

        let timeLeft = this.timeEnd - lastStopTime;
        console.log(this.timeEnd.toString(), ",", lastStopTime.toString(), timeLeft);

        let notCompletedTasks = this.tasks.length - this.tasks.filter(i=>i.stopTime != null).length;
        let spaceLeft = this.total - spaceUsed;

        console.log(`Split ${notCompletedTasks} across ${this.total - spaceUsed} degrees`);

        let spacePerChunk = spaceLeft / notCompletedTasks;

        chunkSize = spacePerChunk;

      }

      this.svgChunks.push(this.drawChunk(
        this.x, 
        this.y,
        this.radius,
        this.width,
        current + (this.padding/2),
        current + chunkSize - (this.padding/2)));

      current += chunkSize;
    }

    // Draw time
    this.UpdateSvg();
  },
  watch: {
      timeNow: function(val) {
        this.UpdateSvg();
      }
  },
  methods: {
    drawChunk: function(x, y, radius, width, start, end, svg) {
      
      if (svg == null) {

        svg = {
          outer: null,
          inner: null,
          fill: function(a) {
            this.outer.fill(a);
            return this;
          }
        };
      }

      if (svg && svg.outer) {
        svg.outer.plot(describeArc(x, y, radius, start, end)).fill({color:"white"});
      } else {
        svg.outer = this.svg.path(describeArc(x, y, radius, start, end)).fill({color: "black"});
      }

      if (svg && svg.inner) {
        svg.inner.plot(describeArc(x, y, radius - width, start - 1, end + 1)).fill({color:"white"});
      } else {
        svg.inner = this.svg.path(describeArc(x, y, radius-width,start-1, end+1)).fill({color:"white"});
      }

      return svg;
    },
    UpdateSvg: function() {

      let timePassed = this.timeNow - this.timeStart;
      let timeTotal = this.timeEnd - this.timeStart;

      let ratio = timePassed/timeTotal;

      this.svgProgress = this.drawChunk(this.x, this.y, this.radius, this.width, 0, ratio * this.total, this.svgProgress).fill({color: "blue", opacity: 0.6});
    }
  }
}
</script>

<style lang="css">
  #spinner {
    color: #56b983;
    width: 500px;
    height: 500px;
  }
</style>