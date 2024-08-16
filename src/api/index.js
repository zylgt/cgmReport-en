import axios from 'axios'
import {Message, MessageBox} from 'element-ui'
import router from '@/router'


axios.defaults.headers['Content-Type'] = 'application/json;charset=utf-8'
// 创建axios实例
const request = axios.create({
  // axios中请求配置有baseURL选项，表示请求URL公共部分
  baseURL: process.env['VUE_APP_API_ROOT'],
  // 超时
  timeout: 60000
})
// request拦截器
request.interceptors.request.use(config => {

  // get请求映射params参数
  if (config.method === 'get' && config.params) {
    let url = config.url + '?'
    for (const propName of Object.keys(config.params)) {
      const value = config.params[propName]
      var part = encodeURIComponent(propName) + '='
      if (value !== null && typeof (value) !== 'undefined') {
        if (typeof value === 'object') {
          for (const key of Object.keys(value)) {
            let params = propName + '[' + key + ']'
            var subPart = encodeURIComponent(params) + '='
            url += subPart + encodeURIComponent(value[key]) + '&'
          }
        } else {
          url += part + encodeURIComponent(value) + '&'
        }
      }
    }
    url = url.slice(0, -1)
    config.params = {}
    config.url = url
  }
  config.headers = {...config.headers,...config.data}
  return config
}, error => {
  console.log(error)
  Promise.reject(error)
})

// 响应拦截器
request.interceptors.response.use(async res => {
    // 未设置状态码则默认成功状态
    const code = res.data.code || 1000
    const msg = res.data.msg
    if (code === 2002) {
      MessageBox.confirm('请重新登录', '系统提示', {
          confirmButtonText: '重新登录',
          cancelButtonText: '取消',
          type: 'warning'
        }
      ).then(() => {
        router.replace('/login')
      }).catch(() => {
      })
      return Promise.reject(msg)
    } else if (code === 2005) {
      MessageBox.confirm('请注意，您的账号已在另一台设备上登录。如继续使用，请重新验证登录。若非本人操作，请及时修改密码。', '账号登出提醒', {
        confirmButtonText: '确认',
        showCancelButton:false,
      }
    ).then(() => {
      router.replace('/login')
    }).catch(() => {
    })
    return Promise.reject(msg)
    } else if (code === 500) {
      Message({
        message: msg,
        type: 'error'
      })
      return Promise.reject(new Error(msg))
    } else {
      return res.data
    }
  },
  error => {
    console.log('err' + error)
    let {message} = error
    if (message == 'Network Error') {
      message = '后端接口连接异常'
    } else if (message.includes('timeout')) {
      message = '系统接口请求超时'
    } else if (message.includes('Request failed with status code')) {
      message = '系统接口' + message.substr(message.length - 3) + '异常'
    }
    Message({
      message: message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default request
