import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/connect/token',
    headers: {
      // 'Content-Type': 'application/x-www-form-urlencoded'
      // 'Access-Control-Allow-Origin': 'https://localhost:13001'
    },
    method: 'post',
    data
  })
}

export function getInfo(token) {
  return request({
    url: '/connect/userinfo',
    method: 'get',
    // params: { token },
    headers: {
      'Authorization': 'Bearer ' + token,
      'Access-Control-Allow-Origin': 'https://localhost:13001'
    }
  })
}

export function logout() {
  return request({
    url: '/api/Account/Logout',
    method: 'post'
  })
}

export function selfSetting(data) {
  return request({
    url: '/api/UserSelfSetting/Settings',
    // headers: {
    //   'Content-Type': 'multipart/form-data'
    // },
    method: 'post',
    data
  })
}

export function getUnits() {
  return request({
    url: '/api/UserRegistration/GetUnits',
    method: 'get'
  })
}

export function studentRegistration(data) {
  return request({
    url: '/api/UserRegistration/StudentRegistration',
    method: 'post',
    data
  })
}

export function teachingTeacherRegistration(data) {
  return request({
    url: '/api/UserRegistration/TeachingTeacherRegistration',
    method: 'post',
    data
  })
}

export function officeTeacherRegistration(data) {
  return request({
    url: '/api/UserRegistration/officeTeacherRegistration',
    method: 'post',
    data
  })
}

export function otherStuffRegistration(data) {
  return request({
    url: '/api/UserRegistration/OtherStuffRegistration',
    method: 'post',
    data
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

export function getCourses(url1) {
  return request({
    url: url1,
    method: 'get'
  })
}

export function modifyPercentage(data) {
  return request({
    url: '/api/StudentIndex/ModifyPercentage',
    method: 'post',
    data
  })
}

export function deleteCourse(data) {
  return request({
    url: '/api/StudentIndex/DeleteCourse',
    method: 'post',
    data
  })
}

export function getCoursesByTeacher() {
  return request({
    url: '/api/TeacherIndex/GetCoursesByTeacher',
    method: 'get'
  })
}

export function winCourse(data) {
  return request({
    url: '/api/TeacherIndex/WinCourse',
    method: 'post',
    data
  })
}

export function courseSelectionClose() {
  return request({
    url: '/api/TeacherIndex/CourseSelectionClose',
    method: 'post'
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

export function getNewsTypes() {
  return request({
    url: '/api/NewsManage/GetNewsTypes',
    method: 'get'
  })
}

export function newsSave(data) {
  return request({
    url: '/api/NewsManage/NewsSave',
    headers: {
      'Content-Type': 'multipart/form-data'
    },
    method: 'post',
    data
  })
}

export function getNews() {
  return request({
    url: '/api/NewsManage/GetNews',
    method: 'get'
  })
}

export function showNews() {
  return request({
    url: '/api/NewsManage/ShowNews',
    method: 'get'
  })
}

export function newsEdit(data) {
  return request({
    url: '/api/NewsManage/NewsEdit',
    headers: {
      'Content-Type': 'multipart/form-data'
    },
    method: 'post',
    data
  })
}

export function htmlImgUpload(data) {
  return request({
    url: '/api/NewsManage/UpLoadHtmlPictures',
    headers: {
      'Content-Type': 'multipart/form-data'
    },
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
