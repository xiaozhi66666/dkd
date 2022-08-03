// 导出一个axios的实例  而且这个实例要有请求拦截器 响应拦截器
import axios from 'axios'
import store from '@/store'
import { Message } from 'element-ui'
import Cookies from 'js-cookie'
import router from '@/router'
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, //基地址
  timeout: 5000
}) // 创建一个axios的实例
// 规定token
const effectiveTokenTime = 3 * 60 * 60 * 1000
// 定义一个函数判断token是否过了规定有效期
const failToken = () => {
  const tokenTime = Cookies.get('tokenTime')
  const currentTokenTime = Date.now()
  return currentTokenTime - tokenTime > effectiveTokenTime
}

service.interceptors.request.use(async (config) => {
  const token = store.state.user.token
  // 处理token过期问题
  // 1：前端自行处理  // 判断发送请求的时间戳-登录时候存入的时间戳  ？> 规定的token有效期
  // 2：前端根据后端返回的相响应结果进行处理  //error.response.status === 401 ?
  if (token) {
    // 如果有token,但是token过期
    if (failToken()) {
      // 强制退出登录，清除用户信息，push('/')
      await store.dispatch('user/logout')
      router.push('/login')
      // 抛出错误
      return Promise.reject(new Error('登录过期'))
    }
    // 没有过期，添加请求头
    config.headers.Authorization = token
  }
  return config
}) // 请求拦截器
// 响应拦截器
service.interceptors.response.use(
  (res) => {
    // const { data } = res
    return res
  },
  async (error) => {
    // 相应错误做点什么
    if (error?.response?.status === 401) {
      Message.error('登录过期')
      // 强制退出登录，清除用户信息，push('/')
      await store.dispatch('user/logout')
      router.push('/login')
      // 抛出错误
      return Promise.reject(new Error('登录过期'))
    } else {
      Message.error(error.msg)
    }
    return Promise.reject(error)
  }
)
export default service // 导出axios实例
