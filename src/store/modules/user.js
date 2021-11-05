import { login, logout, getInfo, selfSetting, getNewsTypes, newsSave, getNews, showNews, newsEdit } from '@/api/user'
import { studentRegistration, teachingTeacherRegistration, otherStuffRegistration, officeTeacherRegistration } from '@/api/user'
import { browseCourse, chooseCourse, getReportCard, writeInReportCard, getStudentAndCourse } from '@/api/user'
import { getToken, removeToken, setToken } from '@/utils/auth'
import { resetRouter } from '@/router'
import ElementUI from 'element-ui'
// import { reject } from 'core-js/fn/promise'
// import { resolve } from 'core-js/fn/promise'

const getDefaultState = () => {
  return {
    token: getToken(),
    name: '',
    code: '',
    role: '',
    gender: '',
    birthDate: new Date(),
    phoneNumber: '',
    headImg: new ArrayBuffer(),
    password: ''
  }
}

const state = getDefaultState()

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
  SET_TOKEN: (state, token) => {
    state.token = token
    localStorage.token = token
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_CODE: (state, code) => {
    state.code = code
  },
  SET_ROLE: (state, role) => {
    state.role = role
  },
  SET_GENDER: (state, gender) => {
    state.gender = gender
  },
  SET_BIRTHDATE: (state, birthDate) => {
    state.birthDate = birthDate
  },
  SET_PHONENUM: (state, phoneNumber) => {
    state.phoneNumber = phoneNumber
  },
  SET_HEADIMG: (state, headImg) => {
    state.headImg = headImg
  },
  SET_PASSWORD: (state, password) => {
    state.password = password
  }
}

const actions = {
  // user login
  login({ commit }, UserInputDto) {
    // const { UserCode, Password } = UserInputDto
    return new Promise((resolve, reject) => {
      login(UserInputDto).then(res => {
        commit('SET_TOKEN', res.access_token)
        setToken(state.token)
        resolve(res)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // get user info
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      getInfo(state.token).then(res => {
        if (!res) {
          return reject('Verification failed, please Login again.')
        }
        commit('SET_NAME', res.name)
        commit('SET_CODE', res.sub)
        var roles = JSON.parse(res.role)
        commit('SET_ROLE', roles)
        commit('SET_GENDER', res.gender)
        commit('SET_PHONENUM', res.phone_number)
        commit('SET_BIRTHDATE', res.birthdate)
        commit('SET_HEADIMG', 'https://localhost:13001' + res.picture)
        resolve(res)
      }).catch(error => {
        reject(error)
      })
    })
  },

  async savePassword({ commit }, password) {
    console.log(22222222)
    try {
      return new Promise((resolve) => {
        getInfo({ commit, state })
        commit('SET_PASSWORD', password)
        console.log(3333333333)
        resolve(password)
      })
    } catch (error) {
      console.log(error)
    }
  },

  saveChange({ commit }, Dto) {
    console.log(Dto)
    return new Promise((resolve, reject) => {
      selfSetting(Dto).then(response => {
        resolve(response)
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

  getReportCard({ commit }) {
    var url = '/api/StudentIndex/GetReportCard?' + 'urlCode=' + state.code
    return new Promise((resolve, reject) => {
      getReportCard(url).then(response => {
        ElementUI.Message.info(response.content)
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },

  getStudentAndCourse({ commit }) {
    var url = '/api/TeacherIndex/CourseAndStudent?' + 'teacherCode=' + state.code
    return new Promise((resolve, reject) => {
      getStudentAndCourse(url).then(response => {
        ElementUI.Message.info(response.content)
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },

  userRegister({ commit }, data) {
    return new Promise((resolve, reject) => {
      console.log(data.userRole)
      console.log(data)
      switch (data.userRole) {
        case '学生':
          console.log(111111111)
          studentRegistration(data).then(response => {
            ElementUI.Message.info(response.content)
            resolve(response)
          }).catch(error => {
            reject(error)
          })
          break
        case '教师':
          teachingTeacherRegistration(data).then(response => {
            ElementUI.Message.info(response.content)
            resolve(response)
          }).catch(error => {
            reject(error)
          })
          break
        case '办公老师':
          officeTeacherRegistration(data).then(response => {
            ElementUI.Message.info(response.content)
            resolve(response)
          }).catch(error => {
            reject(error)
          })
          break
        case '其他职工':
          otherStuffRegistration(data).then(response => {
            ElementUI.Message.info(response.content)
            resolve(response)
          }).catch(error => {
            reject(error)
          })
          break
      }
    })
  },

  WriteInReportCard({ commit }, data) {
    return new Promise((resolve, reject) => {
      writeInReportCard(data).then(response => {
        // data是list，返回的结果也是，把结果直接返回到表格的备注一栏里
        // ElementUI.Message.info(response.content)
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },

  getNewsTypes({ commit }) {
    return new Promise((resolve, reject) => {
      getNewsTypes().then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  getHistoryOrDetails({ commit }) {

  },

  newsSave({ commit }, dto) {
    return new Promise((resolve, reject) => {
      newsSave(dto).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },

  newsEdit({ commit }, dto) {
    return new Promise((resolve, reject) => {
      console.log(dto.get('DeletePicture'))
      newsEdit(dto).then(response => {
        console.log(response)
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },

  getNews({ commit }) {
    return new Promise((resolve, reject) => {
      getNews().then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },

  showNews({ commit }) {
    return new Promise((resolve, reject) => {
      showNews().then(response => {
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

