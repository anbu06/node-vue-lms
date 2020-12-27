import axios from "axios";

const actions = {
  GET_ALL_COURSES: "getAllCourses",
  CREATE_COURSE: "createCourse",
  ADD_CHAPTER: "addChapter"
};

const course = {
  namespaced: true,
  actions: {
    async [actions.GET_ALL_COURSES]() {
      let res = await axios.get("/course/all");
      return res.data;
    },
    async [actions.CREATE_COURSE](store, course) {
      return axios.post("/course", course);
    },
    async [actions.ADD_CHAPTER](store, data) {
      console.log(data)
      axios.post(`course/${data.courseId}/chapter`, data.chapter)
    }
  }
};

export default course;
