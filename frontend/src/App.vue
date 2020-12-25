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

<style lang="scss"></style>
