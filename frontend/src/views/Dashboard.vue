<template>
  <div>
    <h1>👋 Hey, {{ user.name }}</h1>
  </div>
</template>

<script>
import { mapState } from "vuex"

export default {
  name: "Dashboard",
  computed: {
    ...mapState('account', ['user'])
  }
}
</script>

<style>

</style>