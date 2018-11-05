module.exports = {
  module: {
    rules: [
      {
        test: /\.vue$/,
        loaders: ["vue-loader"],
      }
    ]
  },
  resolve: {
    alias: {
      vue: 'vue/dist/vue.js'
    }
  }
};