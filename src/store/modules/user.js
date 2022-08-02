// 引入登录API获取token
import { getLoginTokenAPI } from '@/api/public'
import { getUserInfoAPI } from '@/api/user'
// 引入存入本地的cokkies
import Cookies from 'js-cookie'

export default {
  namespaced: true,
  state: {
    token: Cookies.get('userToken'), //用户token
    success: '',
    userInfo: {} //存储用户信息
  },
  mutations: {
    setToken(state, payloade) {
      state.token = payloade.token
      state.success = payloade.success
      // 将token/username/userid存入cookies
      Cookies.set('userToken', payloade.token)
      Cookies.set('userName', payloade.userName)
      Cookies.set('userId', payloade.userId)
    },
    // 设置用户信息
    setUserInfo(state, payload) {
      state.userInfo = payload
    }
  }, //
  actions: {
    // 获取token
    async getToken(context, payloade) {
      const userToken = await getLoginTokenAPI(payloade)
      // console.log(userToken)
      context.commit('setToken', userToken.data)
    },
    async getUserInfo(context) {
      // 获取用户信息
      const userInfo = await getUserInfoAPI(Cookies.get('userId'))
      // console.log(userInfo)
      // 将用户信息存入到vuex
      context.commit('setUserInfo', { ...userInfo.data })
    }
  }
}
