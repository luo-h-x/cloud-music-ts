import axios from './axios'

const api = {
  // 歌曲详情
  getSong(id: string) {
    return axios.get(`/song/detail?ids=${id}`)
  },
  // 歌曲url
  getSongU(ids: number) {
    return axios.get(`/song/url?id=${ids}`)
  },
  // 歌曲歌词
  getLyric(id: string) {
    return axios.get(`/lyric?id=${id}`)
  },
}

export default api