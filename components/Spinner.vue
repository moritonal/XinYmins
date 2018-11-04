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

function describeArc(x, y, radius, innerRadius, startAngle, endAngle){

    var outerStart = polarToCartesian(x, y, radius, endAngle);
    var outerEnd = polarToCartesian(x, y, radius, startAngle);

    var largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";

    var innerStart = polarToCartesian(x, y, innerRadius, endAngle);
    var innerEnd = polarToCartesian(x, y, innerRadius, startAngle);

    var mid = { x: (outerEnd.x + innerEnd.x) / 2, y: (outerEnd.y + innerEnd.y) / 2 };

    var d = [
        //"M", x, y,
        "M", mid.x, mid.y,
        "L", innerEnd.x, innerEnd.y,
        "A", innerRadius, innerRadius, 0, largeArcFlag, 1, innerStart.x, innerStart.y,
        "L", outerStart.x, outerStart.y,
        "A", radius, radius, 0, largeArcFlag, 0, outerEnd.x, outerEnd.y,
        "L", innerEnd.x, innerEnd.y,
    ].join(" ");

    return d;       
}

import moment from "moment"
import randomcolor from "randomcolor"

export default {
  name: 'spinner-component',
  props: {
    "tasks": Array,
    "stopPoints": Array,
    "timeStart": Object,
    "timeNow": Object,
    "timeEnd": Object,
    "innerRadiusPercentage": {
      type: Number,
      default: 0.3
    },
    "chunkPadding": {
      type: Number,
      default: 5
    },
    "chunkStroke": {
      type: Number,
      default: 10
    },
    "progressColour": {
      type: String,
      default: "blue"
    },
    "chunkColour": {
      type: String,
      default: "pink"
    },
    "chunkLuminosity": {
      type: String,
      default: "bright"
    },
  },
  data () {
    return {
      svgChunks: null,
      svgProgress: null,
      total: 360,
      canvasSize: 500,
      size: null,
      radius: null,
      innerRadius: null,
      x: null,
      y: null,
      svg: null,
    }
  },
  mounted: function() {

    this.canvasPadding = 20;

    this.size = this.canvasSize-this.canvasPadding;

    this.radius = (this.size/2);
    this.innerRadius = this.radius - (this.radius * this.innerRadiusPercentage);

    this.x = (this.canvasPadding/2) + this.size/2;
    this.y = (this.canvasPadding/2) + this.size/2;

    this.svg = SVG("drawing").size(this.canvasSize,this.canvasSize);

    this.svgChunks = [];

    this.UpdateChunks();

    // Draw time
    this.UpdateSvg();
  },
  watch: {
    timeNow: function(val) {

      if (this.timeNow > this.timeEnd) {
        return;
      }

      this.UpdateChunks();
      this.UpdateSvg();
    }
  },
  computed: {
    TotalProgress: function() {

      let timePassed = this.timeNow - this.timeStart;
      let timeTotal = this.timeEnd - this.timeStart;

      let ratio = timePassed/timeTotal;
      let angle = ratio * this.total;

      return angle;
    }
  },
  methods: {
    UpdateChunks: function() {

      if (this.tasks == null)
        return;

      let current = 0;

      let lastStopTime = this.timeStart;
      let spaceUsed = null;
      let firstFlexibleChunk = true;

      for (let i=0;i<this.tasks.length;i++) {
        
        let task = this.tasks[i];
        let chunkSize = this.total / this.tasks.length;

        if (task.stopTime) {
          
          let timePassed = task.stopTime - lastStopTime
          let timeTotal = this.timeEnd - this.timeStart;
          let ratio = timePassed / timeTotal;

          chunkSize = ratio * this.total

          lastStopTime = task.stopTime;
          
          spaceUsed = current + chunkSize;

        } else {

          let notCompletedTasks = this.tasks.length - this.tasks.filter(i=>i.stopTime != null).length;
          let spaceLeft = this.total - spaceUsed;
          let spacePerChunk = spaceLeft / notCompletedTasks;

          if (current + spacePerChunk < this.TotalProgress && firstFlexibleChunk) {
            firstFlexibleChunk = false;

            chunkSize = this.TotalProgress - spaceUsed;

            spaceUsed = current + chunkSize;

          } else {
            
            if (!firstFlexibleChunk) {
              notCompletedTasks--;  
            }

            spacePerChunk = spaceLeft / notCompletedTasks;

            chunkSize = spacePerChunk;
          }
        }

        if (this.tasks[i].colour == null) {
          this.tasks[i].colour = randomcolor({
              hue: this.chunkColour,
              luminosity: this.chunkLuminosity
            });
        }

        let chunk = null;

        if (this.svgChunks.length <= i) {

          chunk = this.drawChunk(
            this.x, 
            this.y,
            this.radius,
            this.innerRadius,
            current,
            current + chunkSize - (this.chunkPadding));

          this.svgChunks.push(chunk);

        } else {

          chunk = this.drawChunk(
            this.x, 
            this.y,
            this.radius,
            this.innerRadius,
            current,
            current + chunkSize - (this.chunkPadding),
            this.svgChunks[i]);

          this.svgChunks[i] = chunk;
        }
        
        chunk.fill(this.tasks[i].colour);
        chunk.stroke({width:this.chunkStroke});

        current += chunkSize;
      }
    },
    drawChunk: function(x, y, radius, innerRadius, start, end, svg) {
      
      if (svg == null) {

        svg = {
          outer: null,
          inner: null,
          fill: function(a) {
            this.outer.fill(a);
            return this;
          },
          stroke: function(a) {
            this.outer.stroke(a);
            return this;
          },
          front: function(a) {
            this.outer.front(a);
            return this;
          }
        };
      }

      if (svg && svg.outer) {
        svg.outer.plot(describeArc(x, y, radius, innerRadius, start, end));
      } else {
        svg.outer = this.svg.path(describeArc(x, y, radius, innerRadius, start, end));
      }

      return svg;
    },
    UpdateSvg: function() {
      this.svgProgress = this.drawChunk(this.x, this.y, this.radius, this.innerRadius, 0, Math.max(0, this.TotalProgress - this.chunkPadding), this.svgProgress)
        .fill({color: this.progressColour, opacity: 0.6})
        .stroke({width: this.chunkStroke})
        .front();
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