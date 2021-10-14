import { login, logout, getInfo, browseCourse, chooseCourse } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { resetRouter } from '@/router'
import ElementUI from 'element-ui'
// import { resolve } from 'core-js/fn/promise'

const getDefaultState = () => {
  return {
    token: getToken(),
    name: '',
    code: '',
    role: ''
  }
}

const state = getDefaultState()

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_CODE: (state, code) => {
    state.code = code
  },
  SET_ROLE: (state, role) => {
    state.role = role
  }
}

const actions = {
  // user login
  login({ commit }, UserInputDto) {
    const { UserCode, Password } = UserInputDto
    return new Promise((resolve, reject) => {
      login({ UserCode: UserCode.trim(), Password: Password }).then(response => {
        commit('SET_TOKEN', response.data.code)
        setToken(state.token)
        commit('SET_NAME', response.data.name)
        commit('SET_CODE', response.data.code)
        commit('SET_ROLE', response.data.role)
        ElementUI.Message.info(response.content)
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // get user info
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      getInfo(state.token).then(response => {
        const { data } = response
        if (!data) {
          return reject('Verification failed, please Login again.')
        }
        const { name, avatar } = data
        commit('SET_NAME', name)
        commit('SET_AVATAR', avatar)
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // user logout
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      logout(state.token).then(() => {
        removeToken() // must remove  token  first
        resetRouter()
        commit('RESET_STATE')
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  browseCourse({ commit }, CourseInputDto) {
    const { AcademicName, CourseName, TeachingTeacher } = CourseInputDto
    return new Promise((resolve, reject) => {
      browseCourse({ AcademicName: AcademicName.trim(), CourseName: CourseName.trim(), TeachingTeacher: TeachingTeacher.trim(), UserCode: state.code }).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },

  chooseCourse({ commit }, courseCode) {
    return new Promise((resolve, reject) => {
      chooseCourse({ CourseCode: courseCode, UserCode: state.code }).then(response => {
        // console.log(response)
        ElementUI.Message.info(response.content)
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      removeToken() // must remove  token  first
      commit('RESET_STATE')
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

