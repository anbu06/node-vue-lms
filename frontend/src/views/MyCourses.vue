<template lang="pug">
  div.columns.is-multiline
    div.column.is-3(v-for="course in user.courses" :key="course._id")
      div.card
        div.card-image
          figure.image.is-4by3
            img(:src="course.thumbnailUrl" :alt="course.title")

        div.card-content
          div.content
            p {{ course.title }}
            br
            div.btns
              b-button.mr-1(tag="router-link" :to="{ path: `/edit-course/${course._id}` }" size="is-small" type="is-primary" icon-left="pen" outlined) Edit Course
              b-button(@click="deleteCourse(course._id)" size="is-small" type="is-danger" icon-left="delete" outlined) Delete
</template>

<script>
import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState('account', ['user'])
  },
  methods: {
    deleteCourse(id) {
      console.log('Course with id: ', id)
    }
  }
}
</script>

<style lang="scss">
.btns {
  display: flex;
  justify-content: flex-end;
}
</style>
