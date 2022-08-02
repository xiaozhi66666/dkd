// 引入登录API获取token
import { getLoginTokenAPI } from '@/api/public'
// 引入存入本地的cokkies
import Cookies from 'js-cookie'

export default {
  namespaced: true,
  state: {
    token: Cookies.get('userToken'), //用户token
    success: ''
  },
  mutations: {
    setToken(state, payloade) {
      state.token = payloade.token
      state.success = payloade.success
      // 将token/username/userid存入cookies
      Cookies.set('userToken', payloade.token)
      Cookies.set('userName', payloade.userName)
      Cookies.set('userId', payloade.userId)
    }
  }, //
  actions: {
    // 获取token
    async getToken(context, payloade) {
      try {
        const res = await getLoginTokenAPI(payloade)
        context.commit('setToken', res.data)
      } catch (error) {
        this.$message.error('获取验证码失败，请稍后重试！')
      }
    }
    // 获取用户信息
  }
}
