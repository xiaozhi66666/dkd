// 导出一个axios的实例  而且这个实例要有请求拦截器 响应拦截器
import axios from 'axios'
import store from '@/store'
import { Message } from 'element-ui'
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, //基地址
  timeout: 5000
}) // 创建一个axios的实例
service.interceptors.request.use((config) => {
  const token = store.state.user.token
  if (token) {
    config.headers.Authorization = token
  }
  return config
}) // 请求拦截器
// 响应拦截器
// service.interceptors.response.use(
//   (res) => {
//     console.log(res)
//     const {
//       config,
//       data,
//       data: { msg, success }
//     } = res
//     if (config.responseType === 'blob') {
//       return data
//     } else {
//       // 提示错误信息
//       console.log(msg)
//       Message.error(msg)
//       // 抛出错误信息
//       return Promise.reject(new Error(msg))
//     }
//   },
//   function (error) {
//     // 相应错误做点什么
//     Message.error('系统异常')
//     // 抛出错误信息
//     return Promise.reject(new Error(error))
//   }
// )
export default service // 导出axios实例
