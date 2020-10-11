import axios from './axios'

const api = {
  // 用户信息
  getUser(uid: string) {
    return axios.get(`/user/detail?uid=${uid}`)
  },
  // 用户创建歌单
  getUserList(uid: string) {
    return axios.get(`/user/playlist?uid=${uid}`)
  },
}

export default api