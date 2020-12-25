<template lang="pug">
  #app
    component(:is="layout")
</template>

<script>
export default {
  name: 'app',
  computed: {
    layout() {
      return `${this.$route.meta.layout || 'default'}-layout`
    }
  }
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
