const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  user: state => state.user,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  role: state => state.user.role,
  code: state => state.user.code
}
export default getters
