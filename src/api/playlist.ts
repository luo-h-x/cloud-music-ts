import axios from './axios'

const api = {
  // 标签歌单
  getTag(limit: number, keyword: string) {
    return axios.get(`/top/playlist?limit=${32 * limit}&cat=${keyword}`)
  },
  // 歌单详情
  getDetail(id: string) {
    return axios.get(`/playlist/detail?id=${id}`)
  },
}

export default api