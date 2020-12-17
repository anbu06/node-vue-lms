<template lang="pug">
  div
    router-link(to="/add-course") Add Course
    a-card(hoverable style="width: 300px" v-for="course in courses" :key="course._id")
      img(
        slot="cover"
        alt="Course Thumbnail"
        :src="course.thumbnail")

      a-badge.category(v-for="(item, index) in course.categories" :key="index")
        small {{ item }}
      a-card-meta(:title="course.title" :description="course.description")
</template>

<script>
import { mapActions } from "vuex";

export default {
  data() {
    return {
      courses: []
    }
  },
  methods: {
    ...mapActions("course", ["getMyCourses"])
  },
  async created() {
    this.courses = await this.getMyCourses()
  }
};
</script>

<style></style>
