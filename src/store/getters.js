const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  // user: state => state.user,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  role: state => state.user.role,
  code: state => state.user.code,
  headImg: state => state.user.headImg,
  phoneNumber: state => state.user.phoneNumber,
  birthDate: state => state.user.birthDate,
  gender: state => state.user.gender,
  password: state => state.user.password
}
export default getters
