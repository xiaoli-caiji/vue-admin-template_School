import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/api/Account/Login',
    method: 'post',
    data
  })
}

export function getInfo(token) {
  return request({
    url: '/api/Account/Login',
    method: 'post',
    params: { token }
  })
}

export function logout() {
  return request({
    url: '/api/Account/Logout',
    method: 'post'
  })
}

export function browseCourse(data) {
  return request({
    url: '/api/StudentIndex/BrowseCourse',
    method: 'post',
    data
  })
}

export function chooseCourse(data) {
  return request({
    url: '/api/StudentIndex/ChoosenCourse',
    method: 'post',
    data
  })
}

export function getStudentAndCourse(urll) {
  return request({
    url: urll,
    method: 'get'
  })
}

export function writeInReportCard(data) {
  return request({
    url: '/api/TeacherIndex/InputReportCard',
    method: 'post',
    data
  })
}

export function getReportCard(urll) {
  return request({
    url: urll,
    method: 'get'
  })
}
