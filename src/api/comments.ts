import axios from './axios'

const api = {
  // 获取评论
  getCommentsT(type: string, id: string, offset: number) {
    return axios.get(`/comment/${type}?id=${id}&offset=${offset}`)
  }
}

export default api