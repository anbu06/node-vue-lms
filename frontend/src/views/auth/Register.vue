<template lang="pug">
  a-form(:form="form" @submit="register")
    h1 Create an account
    a-form-item
      a-input(placeholder="Your name" v-decorator="validationRules.name")
    a-form-item
      a-input(placeholder="Your email" v-decorator='validationRules.email')
    a-form-item
      a-input(type="password" placeholder="Your password" v-decorator="validationRules.password")
    a-form-item
      a-input(type="password" placeholder="Your password again" v-decorator="validationRules.passwordConfirmation" @blur="handleConfirmBlur")
    a-form-item(v-if="backendError")
      a-alert(class="backend-errors" :message="backendError.message" type="error")
    a-form-item
      .bottom
        a-button(html-type="submit" :loading="loading") Register
        div Already have an account? <router-link class="toLogin" to="/login">Log in</router-link>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: 'Register',
  data() {
    return {
      confirmPasswordDirty: false,
      loading: false,
      validationRules: {
        name: [
          'name',
          {
            rules: [{ required: true, message: 'Your name is required.' }],
          },
        ],
        email: [
          'email',
          {
            rules: [
              { type: 'email', message: 'E-mail is not valid.' },
              { required: true, message: 'E-mail is required.' },
            ],
          },
        ],
        password: [
          'password',
          {
            rules: [
              { required: true, message: 'Password is required.' },
              {
                min: 8,
                message:
                  'Password should have a minimum length of 8 characters.\n',
              },
              {
                pattern: /[a-zA-Z]/,
                message: 'Password should include at least one letter.\n',
              },
              {
                pattern: /\d/,
                message: 'Password should include at least one digit.\n',
              },
              {
                pattern: /[\W_]/,
                message: 'Password should include at least one symbol.\n',
              },
              {
                pattern: /^\S+$/,
                message: 'Password should not include spaces.\n',
              },
              { validator: this.validateToNextPassword },
            ],
          },
        ],
        passwordConfirmation: [
          'passwordConfirmation',
          {
            rules: [
              { required: true, message: 'Password confirmation is required.' },
              { validator: this.compareToFirstPassword },
            ],
          },
        ],
      },
      backendError: null
    }
  },
  methods: {
    ...mapActions('account', ['registerUser']),
    register(e) {
      e.preventDefault()
      this.backendError = null
      this.form.validateFieldsAndScroll(async (err, values) => {
        if (err) return

        try {
          await this.registerUser(values)
          this.$router.push('/login?registerSuccess=1')
        } catch (e) {
          this.backendError = e.response.data
        }
      })
    },
    validateToNextPassword(rule, value, callback) {
      const form = this.form
      if (value && this.confirmPasswordDirty) {
        form.validateFields(['confirmPassword'], { force: true })
      }
      callback()
    },
    compareToFirstPassword(rule, value, callback) {
      const form = this.form
      if (value && value !== form.getFieldValue('password')) {
        callback('The passwords you entered are inconsistent.')
      } else {
        callback()
      }
    },
    handleConfirmBlur(e) {
      const value = e.target.value
      this.confirmPasswordDirty = this.confirmPasswordDirty || !!value
    },
    onValuesChange() {
      this.backendError = null
    }
  },
  beforeCreate() {
    const component = this
    this.form = this.$form.createForm(this, {
      name: 'register',
      onValuesChange() {
        component.backendError = null
      }
    })
  }
}
</script>

<style lang="scss" scoped>
.ant-btn {
  background-color: #4b24cb;
  border: 1px solid #4b24cb;
  color: #fefefe;
  transition: all 180ms ease-in-out;

  &:hover {
    background-color: #fefefe;
    color: #4b24cb;
  }
}

.bottom {
  display: flex;
  justify-content: space-between;
}

.toLogin {
  color: rgb(162, 55, 255);
}
</style>
