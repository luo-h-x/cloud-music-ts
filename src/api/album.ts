import axios from './axios'

const api = {
  // 专辑
  getAlbum(id: string) {
    return axios.get(`/album?id=${id}`)
  },
}

export default api