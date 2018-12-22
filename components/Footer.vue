<template>
  <div class="w-100">
    <div id="cont" class="row btn-group m-2">
      <input type="button" id="previous-btn" class="btn btn-secondary" v-on:click="$emit('previous')" value="<"/>
      <input type="button" id="next-btn" class="btn btn-primary" v-on:click="$emit('next')" value=">"/>
    </div>
  </div>
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
  #cont {
    display: flex;
    flex-direction: row;
  }
  #previous-btn {
    flex-grow: 1;
  }
  #next-btn {
    flex-grow: 10;
  }
</style>