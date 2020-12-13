<template lang="pug">
  a-form(:form="form" @submit="submitLogin")
    h1 Log in to your account
    a-form-item(v-if="$route.query.registerSuccess")
      a-alert(message="You are now registered!" description="Use your credentials to log in below.")
    a-form-item(v-if="$route.query.logoutSuccess")
      a-alert(message="You have successfully logged out." description="Use your credentials to log in below.")
    a-form-item
      a-input(placeholder="Your email" v-decorator='validationRules.email')
    a-form-item
      a-input(type="password" placeholder="Your password" v-decorator="validationRules.password")
    a-form-item(v-if="backendError")
      a-alert(:message="backendError.message" type="error")
    a-form-item
      .bottom
        a-button(type="primary" html-type="submit" :loading="loading" icon="message") Log in
        div Don't have an account yet? <router-link class="toRegister" to="/register">Register</router-link>
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
      },
      backendError: null
    }
  },
  methods: {
    ...mapActions('account', ['login']),
    submitLogin(e) {
      e.preventDefault()
      this.backendError = null
      this.form.validateFieldsAndScroll(async (err, values) => {
        if (err) return
        try {
          await this.login(values)
          this.$router.push('/dashboard')
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
      name: 'login',
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

.ant-alert {
  background-color: rgba(52, 225, 216, 0.2);
  border-color: rgba(52, 225, 216, 0.5);
}

.bottom {
  display: flex;
  justify-content: space-between;
}

.toRegister {
  color: rgb(162, 55, 255);
}
</style>
