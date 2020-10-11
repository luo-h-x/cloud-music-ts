import axios from './axios'

const api = {
  // 最新歌单
  getNewList() {
    return axios.get('/top/playlist?limit=32')
  },
  // 标签歌单
  getTag(limit: number, keyword: string) {
    return axios.get(`/top/playlist?limit=${32 * limit}&cat=${keyword}`)
  },
  // 新歌速递
  getSongN(type = '0') {
    return axios.get(`/top/song?type=${type}`)
  },
  // 所有榜单
  getRankingA() {
    return axios.get('/toplist')
  },
  // 歌手列表
  getSingerL(type = -1, area = -1, initial = -1) {
    return axios.get(
      `/artist/list?type=${type}&area=${area}&initial=${initial}`
    )
  },

}

export default api
