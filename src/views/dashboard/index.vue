<template>
  <div class="dashboard-container">
    <div class="dashboard-text">name: {{ name }}</div>
  </div>
</template>

<script>
// 引入存入本地的cokkies
import Cookies from 'js-cookie'
// 引入｛获取用户信息｝请求API
import { getUserInfoAPI } from '@/api/user'
// import { mapGetters } from 'vuex'

export default {
  name: 'Dashboard',
  data() {
    return {
      name: ''
    }
  },
  created() {
    // this.getUserInfo()
  },
  computed: {
    // 获取登录后的用户id
    // userId() {
    //   return Cookies.get('userId')
    // }
  },
  methods: {
    // async getUserInfo() {
    //   try {
    //     const res = await getUserInfoAPI(this.userId)
    //     console.log(res)
    //   } catch (error) {}
    // }
  }
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
