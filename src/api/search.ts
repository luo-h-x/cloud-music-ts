import axios from './axios'

const api = {
  // 热搜榜
  getSearchHot() {
    return axios.get('/search/hot/detail')
  },
  // 搜索建议
  getSearchS(keyword: string) {
    return axios.get(`/search/suggest?keywords=${keyword}`)
  },
  // 搜索
  getSearch(keywords: string, type: number) {
    return axios.get(`/search?keywords=${keywords}&type=${type}`)
  },
}

export default api