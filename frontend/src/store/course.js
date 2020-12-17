import axios from "axios";

const actions = {
  GET_ALL_COURSES: "getAllCourses",
  GET_MY_COURSES: "getMyCourses",
  CREATE_COURSE: "createCourse",
  UPDATE_COURSE: "updateCourse",
  DELETE_COURSE: "deleteCourse"
};

const course = {
  namespaced: true,
  actions: {
    async [actions.GET_ALL_COURSES]() {
      let res = await axios.get("/course/all");
      return res.data;
    },
    async [actions.GET_MY_COURSES]() {
      let res = await axios.get("/course");;
      return res.data;
    },
    async [actions.CREATE_COURSE](store, course) {
      return axios.post("/course", course);
    },
    async [actions.DELETE_COURSE](store, courseId) {
      await axios.delete(`/course/${courseId}`);
    }
  }
};

export default course;
