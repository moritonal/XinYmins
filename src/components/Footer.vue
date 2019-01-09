<template>
  <div class="w-100 cube">

    <div id="cont" class="row btn-group m-3 justify-content-center spinnable cube_top" v-bind:class="{ borderDark : stage == 'timer' }">
      <input type="button" key="<" id="previous-btn" class="btn btn-danger" v-on:click="$emit('previous')" value="<" v-if="step2" />
      <input type="button" key=">" id="next-btn" class="btn btn-success" v-on:click="$emit('next')" value=">" v-if="step2" />
      <input type="button" ref="goButton" key="go" class="btn btn-primary px-4" v-bind:class="{'flex-grow-1': fullWidth, 'hide' : hideGo }" value="Go" v-on:click="go" v-if="!spin" />
    </div>
  </div>
</template>

<script>

export default {
  name: 'footer-component',
  props: {
    "stage": String
  },
  data () {
    return {
      spin : false,
      fullWidth: false,
      step2: false,
      hideGo: false
    }
  },
  methods: {
    previous: function() {

    },
    next: function() {

    },
    go: function() {
      this.fullWidth = true;

      this.$emit("go");

      setTimeout(() => {
        this.step2 = true;

        this.hideGo = true;

        this.$refs.goButton.blur();

      }, 500);
    }
  }
}

</script>

<style lang="scss">

  @import "./../scss/custom.scss";

  #footer {
    color: $body-color;
  }

  .dark-border {
    border: 1px solid black;
  }

  .spinnable > .btn.hide {
    position: absolute !important;
    width: 100%;
    transition: all .5s ease-in-out;
    transform: translateY(100%);
  }

  .spinnable > .btn {
    transition: flex-grow 0.5s;
  }

  #cont {
    overflow: hidden;
    display: flex;
    flex-direction: row;
    border-radius: 5px;

    width: auto;
  }
  .btn {
    padding: 10px;
  }
  #previous-btn {
    flex-grow: 1;
  }
  #next-btn {
    flex-grow: 10;
  }
</style>