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

// export function hasChoosen(data) {
//   return request({
//     url: '/api/StudentIndex/HasChoosen',
//     method: 'get',
//     data
//   })
// }

export function getReportCard(data) {
  return request({
    url: '/api/StudentIndex/GetReportCard',
    method: 'get',
    data
  })
}
