<template lang="pug">
  b-navbar
    template(slot="start")
      b-navbar-item(tag="router-link" :to="{ path: '/' }") Home

    template(slot="end")
      b-navbar-item(tag="div")
        button.button.is-primary(@click="changeUserProfileType") {{ changeTo }} Profile
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  computed: {
    ...mapState('account', ['userProfileType']),
    changeTo() {
      return this.userProfileType == 'student' ? 'Lecturer' : 'Student'
    }
  },
  methods: {
    ...mapActions('account', ['changeUserProfileType'])
  }
}
</script>

<style lang="scss"></style>
