const utils = {
  // 123456 => 12万
  countToString(val: string | number): string {
    val = val + ''
    return val.length > 3 ? val.replace(/(\d+)(\d){4}/g, '$1万') : val
  },

  // 时间戳 => 年-月-日
  formatDate(data: string | number, type: number): string {
    return type
      ? new Date(data).toLocaleString()
      : new Date(data).toLocaleDateString().replace(/\//g, '-')
  },

  // 时间戳 => 分:秒
  formatDay(data: number | string): string {
    let min: number | string = (data as number) / 60000 >> 0 
    let s: number | string = (data as number) / 1000 % 60 >> 0 
    if (min < 10) {
      min = '0' + min.toString()
    } else {
      min = min.toString()
    }
    if (s < 10) {
      s = '0' + s.toString()
    } else {
      s = s.toString()
    }
    return `${min}:${s}`
  },

  // 防抖
  debounce(fn: Function, delay: number) {
    let timer: number
    return function (...args: []) {
      if (timer) clearTimeout(timer)
      timer = setTimeout(() => {
        fn(...args)
      }, delay)
    }
  }
}

export default utils
