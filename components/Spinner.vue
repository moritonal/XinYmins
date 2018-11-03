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

    var outerStart = polarToCartesian(x, y, radius, endAngle);
    var outerEnd = polarToCartesian(x, y, radius, startAngle);

    var largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";
    var largeNotArcFlag = endAngle - startAngle <= 180 ? "1" : "0";

    let inner = radius/2;

    var innerStart = polarToCartesian(x, y, inner, endAngle);
    var innerEnd = polarToCartesian(x, y, inner, startAngle);

    var mid = { x: (outerEnd.x + innerEnd.x) / 2, y: (outerEnd.y + innerEnd.y) / 2 };

    var d = [
        //"M", x, y,
        "M", mid.x, mid.y,
        "L", innerEnd.x, innerEnd.y,
        "A", inner, inner, 0, 0, 1, innerStart.x, innerStart.y,
        "L", outerStart.x, outerStart.y,
        "A", radius, radius, 0, largeArcFlag, 0, outerEnd.x, outerEnd.y,
        "L", innerEnd.x, innerEnd.y,
        // "A", inner, inner, 0, 1, 0, innerStart.x, innerStart.y,
    ].join(" ");

    return d;       
}

import moment from "moment"
import randomcolor from "randomcolor"

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
      padding: 5,
      size: 490,
      radius: null,
      innerRadius: null,
      width: null,
      x: null,
      y: null,
      svg: null
    }
  },
  mounted: function() {

    this.radius =  this.size/2,
    this.innerRadius = this.size/1.5;
    this.width = this.size/6,
    this.x = 5 + this.size/2,
    this.y = 5 + this.size/2,

    this.svg = SVG("drawing").size(500,500);

    this.svgChunks = [];

    this.UpdateChunks();

    // Draw time
    this.UpdateSvg();

    /*this.svg
      .circle(this.innerRadius)
      .fill("white")
      .move(this.x - (this.innerRadius/2), this.y - (this.innerRadius/2))
      //.stroke({ width: 2 });*/

  },
  watch: {
      timeNow: function(val) {
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

      if (this.timeNow > this.timeEnd)
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
              hue: "green",
              luminosity: "dark"
            });
        }

        let chunk = null;

        if (this.svgChunks.length <= i) {

          chunk = this.drawChunk(
            this.x, 
            this.y,
            this.radius,
            this.width,
            current + (this.padding/2),
            current + chunkSize - (this.padding/2));

          this.svgChunks.push(chunk);

        } else {

          chunk = this.drawChunk(
            this.x, 
            this.y,
            this.radius,
            this.width,
            current + (this.padding/2),
            current + chunkSize - (this.padding/2),
            this.svgChunks[i]);

          this.svgChunks[i] = chunk;
        }
        
        chunk.fill(this.tasks[i].colour);
        chunk.stroke({width:10});

        current += chunkSize;
      }
    },
    drawChunk: function(x, y, radius, width, start, end, svg) {
      
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
          }
        };
      }

      if (svg && svg.outer) {
        svg.outer.plot(describeArc(x, y, radius, start, end));
      } else {
        svg.outer = this.svg.path(describeArc(x, y, radius, start, end));
      }

      return svg;
    },
    UpdateSvg: function() {
      this.svgProgress = this.drawChunk(this.x, this.y, this.radius, this.width, 0, this.TotalProgress, this.svgProgress).fill({color: "blue", opacity: 0.6});
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