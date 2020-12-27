import axios from 'axios'

const actions = {
  CREATE_COURSE: 'createCourse'
}

const course = {
  namespaced: true,
  actions: {
    async [actions.CREATE_COURSE](store, course) {
      return axios.post('/course', course)
    }
  }
}

export default course
