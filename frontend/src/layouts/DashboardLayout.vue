<template lang="pug">
  div.columns.pt-2
    div.menu-container.column.is-2
      b-menu.px-5
        b-menu-list(label="Menu")
          b-menu-item.mb-2(icon="dashboard" label="Dashboard" active)

          div(v-if="userProfileType == 'lecturer'")
            b-menu-item.mb-2(icon="book" label="My Courses")
            b-menu-item.mb-2(icon="plus" label="Create New Course")

          div(v-else)
            b-menu-item.mb-2(icon="book" label="Courses")
            b-menu-item.mb-2(icon="school" label="My Content")

        b-menu-list(label="Actions")
          b-menu-item(label="Logout" icon="logout" @click="doLogout")

    div.column.is-10
      navbar
      div.container
        router-view
</template>

<script>
import { mapState, mapActions } from 'vuex'
import Navbar from '../components/Navbar'

export default {
  name: 'dashboard-layout',
  components: {
    Navbar
  },
  computed: {
    ...mapState('account', ['user', 'userProfileType'])
  },
  methods: {
    ...mapActions('account', ['logout']),
    async doLogout() {
      await this.logout()
      this.$router.push('/login?logoutSuccess=1')
    }
  }
}
</script>

<style lang="scss">
.menu-container {
  border-right: 1px solid rgba(0, 0, 0, 0.1);
  min-height: 100vh;
  padding-top: 1em;
}
</style>
