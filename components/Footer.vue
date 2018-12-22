<template>
  <span>
    <div class="row btn-group w-100 m-2">
      <input type="button" class="btn btn-secondary col-2 fluid-height" v-on:click="$emit('previous')" value="<"/>
      <input type="button" class="btn btn-primary col-10 fluid-height" v-on:click="$emit('next')" value=">"/>
    </div>
    <!--<div class="row">
      <input type="button" v-on:click="add" value="Add"/>
    </div>-->
  </span>
</template>

<script>
export default {
  name: 'footer-component',
  data () {
    return {

    }
  },
  methods: {
    previous: function() {

    },
    next: function() {

    }
  }
}
</script>

<style lang="css">
  #footer {
    color: #56b983;
  }
  
  .fluid-height {
    
  }
</style>