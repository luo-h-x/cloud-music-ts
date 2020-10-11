import axios from './axios'

const api = {
  // 轮播图
  getBanner() {
    return axios.get('/banner')
  },
  // 推荐歌单
  getList() {
    return axios.get('/personalized?limit=10')
  },
  // 推荐独家放送
  getSole() {
    return axios.get('/personalized/privatecontent')
  },
  // 推荐mv
  getMV() {
    return axios.get('/personalized/mv')
  },
  // 推荐最新音乐
  getLatest() {
    return axios.get('http://musicapi.leanapp.cn/personalized/newsong')
  },
  // 推荐电台
  getStation() {
    return axios.get('/personalized/djprogram')
  },
}

export default api