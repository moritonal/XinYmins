<template>
  <div class="row py-4 justify-content-center d-flex">
    <div class="col m-1">
      <div class="input-group">
        <input type="number" value="1" class="form-control" v-model="numberOfItems" v-on:change="newNumberOfItems">
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
        <input type="number" value="1" class="form-control" v-model="numberOfMinutes" v-on:change="newNumberOfMinutes" />
        <div class="input-group-append">
          <span class="input-group-text">mins</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>


export default {
  name: 'header-component',  
  data () {
    return {
      numberOfItems: 6,
      numberOfMinutes: 60
    }
  },
  methods: {
    newNumberOfItems: function() {
      this.$emit("numberOfItemsChange", numberOfItems);
    },
    newNumberOfMinutes: function() {
      this.$emit("numberOfMinutesChange", numberOfMinutes);
    }
  }
}

</script>

<style lang="scss">

  @import "./../scss/custom.scss";

  #header {
    color: #56b983;
  }

  .input-group {
    justify-content: center;
  }

  input.form-control {
     border-color: black;
     color: $body-color;
  }

  span.input-group-text {
     border-color: black;
     color: $body-color;
  }

  input.form-control {
    background-color: transparent;
    max-width: 100px;
  }

  span.input-group-text {
    background-color: transparent;
  }

  input[type='number'] {
      -moz-appearance:textfield;
  }

  input[type=number]::-webkit-inner-spin-button,
  input[type=number]::-webkit-outer-spin-button {
      -webkit-appearance: none;
      margin: 0;
  }
  
  input:focus {
    background-color:red;
  }
  
  .input-group > .form-control:focus {
    background-color: transparent;
  }
</style>