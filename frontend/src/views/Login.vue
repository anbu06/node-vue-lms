<template lang="pug">
  div
    h1.title.is-3 Login to an account
    hr
    form(@submit.prevent="submitForm" @keydown.enter="submitForm")
      b-notification(v-if="$route.query.registerSuccess" type="is-success is-light" aria-close-label="Close notification") You are now registered! Use your credentials to log in below.
      b-notification(v-if="$route.query.logoutSuccess" type="is-success is-light" aria-close-label="Close notification") You have successfully logged out. Use your credentials to log in below.

      b-field(label="Email")
        b-input(type="email" v-model="form.email" placeholder="Your email address" icon="email")

      b-field(label="Password")
        b-input(type="password" v-model="form.password" placeholder="Your password" icon="lock")

      .buttons.mt-5
        b-button(type="is-primary" @click="submitForm") Submit
        span Don't have an account?  <router-link to="/login">Register now</router-link>

</template>

<script>
import { mapActions } from 'vuex'

export default {
  data() {
    return {
      form: {
        email: '',
        password: ''
      },
      backendError: null
    }
  },
  methods: {
    ...mapActions('account', ['login']),
    async submitForm() {
      try {
        await this.login(this.form)
        this.$router.push('/dashboard')
      } catch (e) {
        this.backendError = e.response.data
      }
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.$refs.formName.focus()
    })
  }
}
</script>

<style></style>
