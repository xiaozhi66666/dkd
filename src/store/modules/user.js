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
      // 在获取用户token的时候获取即时的时间戳，并存入cookies
      Cookies.set('tokenTime', Date.now())
      const userToken = await getLoginTokenAPI(payloade)
      console.log(userToken)
      context.commit('setToken', userToken.data)
    },
    // 获取用户信息
    async getUserInfo(context) {
      console.log('getUserInfo')
      console.log(Cookies.get('userId'))
      const userInfo = await getUserInfoAPI(Cookies.get('userId'))
      // console.log(userInfo)
      // console.log(userInfo)
      // 将用户信息存入到vuex
      // console.log(userInfo)
      context.commit('setUserInfo', userInfo.data)
    },
    // 退出登录
    logout(context) {
      // 清空token
      context.commit('setToken', {})
      Cookies.remove('userToken')
      // 清空用户信息
      context.commit('setUserInfo', {})
      Cookies.remove('userName')
      Cookies.remove('userId')
    }
  }
}
