<template>
  <div id="spinner">
    <div id="drawing" ref="drawing" v-show="!disabled"></div>
  </div>
</template>

<script>

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

export default {
  name: 'spinner-component',
  props: {
    "tasks": Array,
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
    "disabled": false,
    "total": {
      type: Number,
      default: 360
    } 
  },
  data () {
    return {
      svgChunks: null,
      svgProgress: null,
      size: null,
      radius: null,
      innerRadius: null,
      canvasSize: 0,
      x: null,
      y: null,
      svg: null
    }
  },
  mounted: async function() {
    this.init();
  },
  beforeDestroy: function () {
    window.removeEventListener('resize', this.handleResize);
  },
  watch: {
    tasks: function(val) {
      
      this.svgChunks = [];
      this.svgProgress = null;
      this.svg.clear();
    
      this.UpdateChunks();
      this.UpdateSvg();
    },
    canvasSize: function(val) {
      this.handleResize();
    },
    timeNow: function(val) {
      
      if (this.svg == null)
        return;

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
    async init() {
      this.handleResize();

      let SVG = await import("svg.js");

      this.svg = SVG("drawing");//.size(this.canvasSize, this.canvasSize);

      this.svgChunks = [];

      this.UpdateChunks();

      // Draw time
      this.UpdateSvg();

      // window.addEventListener('resize', this.handleResize);

      this.handleResize();    
    },
    calculateSize() {
      this.canvasSize = this.$refs["drawing"] ? 
        Math.min(624, Math.min(this.$refs["drawing"].clientWidth, this.$refs["drawing"].clientHeight)) :
        null;
    },
    handleResize() {

      this.calculateSize();

      this.canvasPadding = 20;

      this.size = this.canvasSize - this.canvasPadding;

      this.radius = (this.size/2);
      this.innerRadius = this.radius - (this.radius * this.innerRadiusPercentage);

      let x = Math.min(624, this.$refs["drawing"].clientWidth);
      this.x = (this.canvasPadding / 2) + this.size/2;
      this.y = (this.canvasPadding / 2) + this.size/2;

      console.log(`X: ${this.x}, Y: ${this.y}`);

      if (this.svg) {
        this.svg.size(this.canvasSize, this.canvasSize);
        console.log(`Resized svg to ${this.canvasSize}`)
      }
    },
    UpdateChunks: async function() {

      this.calculateSize();

      if (this.tasks == null)
        return;

      let current = 0;

      let lastStopTime = this.timeStart;
      let spaceUsed = null;
      let firstFlexibleChunk = true;

      let totalProgress = this.TotalProgress;
      let total = this.total;

      for (let i = 0; i < this.tasks.length; i++) {
        
        let task = this.tasks[i];
        let chunkSize = total / this.tasks.length;

        if (task.stopTime) {
          
          let timePassed = task.stopTime - lastStopTime
          let timeTotal = this.timeEnd - this.timeStart;
          let ratio = timePassed / timeTotal;

          chunkSize = ratio * total;

          lastStopTime = task.stopTime;
          
          spaceUsed = current + chunkSize;

        } else {

          let notCompletedTasks = this.tasks.length - this.tasks.filter(i=>i.stopTime != null).length;
          let spaceLeft = total - spaceUsed;
          let spacePerChunk = spaceLeft / notCompletedTasks;

          if (current + spacePerChunk < totalProgress && firstFlexibleChunk) {
            firstFlexibleChunk = false;

            chunkSize = totalProgress - spaceUsed;

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

          let randomcolor = await import("randomcolor");

          this.tasks[i].colour = randomcolor({
              hue: this.chunkColour,
              luminosity: this.chunkLuminosity
            });
        }

        let chunk = null;
        
        let halfChunkPadding = this.chunkPadding / 2;

        if (this.svgChunks) { 
          if (this.svgChunks.length <= i) {

            chunk = this.drawChunk(
              this.x, 
              this.y,
              this.radius,
              this.innerRadius,
              current + halfChunkPadding,
              (current + chunkSize) - halfChunkPadding);

            this.svgChunks.push(chunk);

          } else {

            chunk = this.drawChunk(
              this.x, 
              this.y,
              this.radius,
              this.innerRadius,
              current + halfChunkPadding,
              (current + chunkSize) - (halfChunkPadding),
              this.svgChunks[i]);

            this.svgChunks[i] = chunk;
          }

          chunk.fill(this.tasks[i].colour);
          chunk.stroke({width:this.chunkStroke});
        }

        current += chunkSize;
      }
    },
    clear: function() {
        this.svgChunks = null;
        this.svgProgress = null;
        /*this.total = 360;
        this.size = null;
        this.radius = null;
        this.innerRadius = null;
        this.canvasSize = 0;
        this.x = null;
        this.y = null;*/
        //this.svg = null
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
        if (this.svg) {
          svg.outer = this.svg.path(describeArc(x, y, radius, innerRadius, start, end));
        }
      }

      return svg;
    },
    UpdateSvg: function() {
      
      this.svgProgress = this.drawChunk(
        this.x, this.y,
        this.radius, this.innerRadius,
        Math.max(0, this.chunkPadding/2),
        Math.max(this.chunkPadding/2, this.TotalProgress - (this.chunkPadding/2)),
        this.svgProgress)
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
  }
  #drawing {
    width: 90vmin;
    max-width: 624px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

</style>