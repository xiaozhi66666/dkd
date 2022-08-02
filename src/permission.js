import router from '@/router'
import store from '@/store'
// 配置全局前置路由守卫
router.beforeEach((to, form, next) => {
  const token = store.state.user.token
  const whiteList = ['/login', '/404']
  // 分两种情况
  // 1：已登录
  if (token) {
    // 不可以再次访问login
    to.path === '/login' ? next('/') : next()
  } else {
    // 2：未登录
    // 判断是否处于白名单的数组中
    whiteList.includes(to.path) ? next() : next('/login')
  }
})
