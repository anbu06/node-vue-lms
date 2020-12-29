<template lang="pug">
  div
    router-link(to="/add-course") Add Course
    a-card(hoverable style="width: 300px" v-for="course in user.createdCourses" :key="course._id")
      img(
        slot="cover"
        alt="Course Thumbnail"
        :src="course.thumbnail")

      template.ant-card-actions(slot="actions")
        a-tooltip(placement="bottom")
          template(slot="title")
            span Course Details
          router-link(:to="`/course-info/${course._id}`")
            a-icon(type="question-circle")

        a-tooltip(placement="bottom")
          template(slot="title")
            span Delete Course
          a-icon(type="delete")

      a-card-meta(:title="course.title" :description="course.description")
</template>

<script>
import { mapState } from "vuex";

export default {
  computed: {
    ...mapState("account", ["user"])
  }
};
</script>

<style></style>
