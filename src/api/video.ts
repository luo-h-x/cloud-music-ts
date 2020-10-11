import axios from './axios'

const api = {
  // mv url
  getUrlMv(id: string) {
    return axios.get(`/mv/url?id=${id}`)
  },
  // mv信息
  getMvD(id: string) {
    return axios.get(`/mv/detail/info?mvid=${id}`)
  },
  getVideo(id: string) {
    return axios.get(`/video/detail?id=${id}`)
  },
  getUrlVideo(id: string) {
    return axios.get(`/video/url?id=${id}`)
  }
}

export default api