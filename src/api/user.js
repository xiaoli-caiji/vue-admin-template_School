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

export function browseCourses() {
  return request({
    url: '/api/StudentIndex/BrowseCourse',
    method: 'get'
  })
}

export function chooseCourses() {
  return request({
    url: '/api/StudentIndex/ChooseCourse',
    method: 'post'
  })
}

export function getReportCard() {
  return request({
    url: '/api/StudentIndex/GetReportCard',
    method: 'get'
  })
}
