<template lang="pug">
  div
    h1.title.is-3 Login to an account
    hr
    form(@submit.prevent="submitForm" @keydown.enter="submitForm")
      b-notification(v-if="$route.query.registerSuccess" type="is-success is-light" aria-close-label="Close notification") You are now registered! Use your credentials to log in below.
      b-notification(v-if="$route.query.logoutSuccess" type="is-success is-light" aria-close-label="Close notification") You have successfully logged out. Use your credentials to log in below.

      b-field(label="Email" :type="{ 'is-danger': $v.form.email.$error }" :message="{ 'This email is invalid': $v.form.email.$error }")
        b-input(type="email" v-model.trim="form.email" placeholder="Your email address" @input="$v.form.email.$touch()" icon="email" ref="formEmail")

      b-field(label="Password" :type="{ 'is-danger': $v.form.password.$error }" :message="{ 'Password must be at least 8 characters': $v.form.password.$error}")
        b-input(type="password" v-model.trim="form.password" placeholder="Your password" @input="$v.form.password.$touch()" icon="lock")

      .buttons.mt-5
        b-button(type="is-primary" @click="submitForm" :disabled="$v.$invalid") Submit
        span Don't have an account?  <router-link to="/login">Register now</router-link>

</template>

<script>
import { mapActions } from 'vuex'
import { required, email, minLength } from 'vuelidate/lib/validators'

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
  validations: {
    form: {
      email: {
        required,
        email
      },
      password: {
        required,
        minLength: minLength(8)
      }
    }
  },
  methods: {
    ...mapActions('account', ['login']),
    async submitForm() {
      if(!this.$v.$invalid) {
        try {
          await this.login(this.form)
          this.$router.push('/dashboard')
        } catch (e) {
          this.backendError = e.response.data
        }
      }
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.$refs.formEmail.focus()
    })
  }
}
</script>

<style></style>
