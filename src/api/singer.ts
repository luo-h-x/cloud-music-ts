import axios from './axios'

const api = {
  // 歌手信息
  getSinger(id: string) {
    return axios.get(`/artists?id=${id}`)
  },
  // 歌手mv
  getSingerMV(id: string) {
    return axios.get(`/artist/mv?id=${id}`)
  },
  // 歌手专辑
  getSingerAlbum(id: string) {
    return axios.get(`/artist/album?id=${id}`)
  },
  // 歌手详情
  getSingerDetails(id: string) {
    return axios.get(`/artist/desc?id=${id}`)
  },
  // 相似歌手
  getSingerResemble(id: string) {
    return axios.get(`/simi/artist?id=${id}`)
  }
}

export default api
