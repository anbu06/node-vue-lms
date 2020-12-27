<template lang="pug">
  div.columns
    div.column.is-8.is-offset-2
      form(@submit.prevent="submitForm" @keydown.enter="submitForm")
        b-field(label="Name")
          b-input(v-model="form.title")

        b-field(label="Description")
          b-input(v-model="form.description" type="textarea")

        b-field.file
          b-upload(v-model="form.thumbnail" expanded)
            a.button.is-primary.is-fullwidth
              b-icon(icon="upload")
              span {{ form.thumbnail || "Click to upload" }}

        .buttons.mt-5
          b-button(type="is-primary" @click="submitForm") Submit
</template>

<script>
import { mapActions } from 'vuex'

export default {
  data() {
    return {
      form: {
        title: '',
        description: '',
        thumbnail: null
      },
      backendError: null
    }
  },
  methods: {
    ...mapActions('course', ['createCourse']),
    async submitForm() {
      const formData = new FormData()

      for (let k in this.form) {
        formData.append(k, this.form[k])
      }

      try {
        await this.createCourse(formData)

        this.clearForm()
      } catch (e) {
        this.backendError = e.response.data
      }
    },
    clearForm() {
      this.form.title = ''
      this.form.description = ''
      this.form.thumbnail = null
    }
  }
}
</script>

<style></style>
