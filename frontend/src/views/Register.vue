<template lang="pug">
  div
    h1.title.is-3 Create an account
    hr
    form(@submit.prevent="submitForm" @keydown.enter="submitForm")
      b-field(label="Name")
        b-input(v-model="form.name" placeholder="Your name" icon="account-box" ref="formName")

      b-field(label="Email")
        b-input(type="email" v-model="form.email" placeholder="Your email address" icon="email")

      b-field(label="Password")
        b-input(type="password" v-model="form.password" placeholder="Your password" icon="lock")

      .buttons.mt-5
        b-button(type="is-primary" @click="submitForm") Submit
        span Already have an account? Login from <router-link to="/login">here</router-link>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  data() {
    return {
      form: {
        name: '',
        email: '',
        password: ''
      },
      backendError: null
    }
  },
  methods: {
    ...mapActions('account', ['registerUser']),
    async submitForm() {
      this.backendError = null
      try {
        await this.registerUser(this.form)
        this.$router.push('/login?registerSuccess=1')
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

<style lang="scss">
.buttons {
  justify-content: space-between !important;
}
</style>
