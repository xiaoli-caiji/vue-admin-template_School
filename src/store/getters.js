const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  // user: state => state.user,
  token: state => state.token,
  avatar: state => state.avatar,
  name: state => state.name,
  role: state => state.role,
  code: state => state.code,
  headImg: state => state.headImg,
  phoneNumber: state => state.phoneNumber,
  birthDate: state => state.birthDate,
  gender: state => state.gender,
  password: state => state.password
}
export default getters
