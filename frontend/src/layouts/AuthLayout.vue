<template lang="pug">
  div.container
    .columns
      .column.is-4.is-offset-4
        router-view
</template>

<script>
export default {
  name: 'auth-layout'
}
</script>

<style lang="scss" scoped>
.columns {
  margin-top: 20vh;
}
</style>
