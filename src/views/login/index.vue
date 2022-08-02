<template>
  <div class="login-container">
    <!-- 登录框 -->
    <div class="login-box">
      <!-- 登录图标 -->
      <div class="login-icon">
        <img src="~@/assets/images/login/loginicon.png" alt="" />
      </div>
      <!-- 主体内容区域 -->
      <div class="login-form">
        <div style="margin: 20px" />
        <el-form
          :label-position="labelPosition"
          :model="loginForm"
          :rules="loginFormRules"
          ref="loginForm"
        >
          <el-form-item prop="loginName">
            <el-input
              prefix-icon="el-icon-mobile-phone"
              placeholder="请输入账号/手机号"
              v-model="loginForm.loginName"
            />
          </el-form-item>
          <el-form-item prop="password">
            <el-input
              ref="password"
              prefix-icon="el-icon-lock"
              placeholder="请输入密码"
              v-model="loginForm.password"
            >
              <div slot="suffix">
                <i
                  v-if="isShow"
                  class="dikede dkd-yanjing"
                  @click="isShowPass"
                />
                <i
                  v-else
                  class="dikede dkd-yanjing1"
                  @click="isShowPass"
                /></div
            ></el-input>
          </el-form-item>
          <el-form-item prop="code">
            <el-input
              class="last-rz-input"
              placeholder="请输入验证码"
              v-model="loginForm.code"
              @change="login"
            >
              <p slot="prefix" class="login-rz-icon">
                <i class="dikede dkd-shimingrenzheng" />
              </p>
            </el-input>
            <div class="login-code" @click="refreshCode">
              <img src="" alt="" ref="codeImg" />
            </div>
          </el-form-item>
          <el-button
            type="primary"
            class="login-btn"
            @click="login"
            :loading="loading"
            >login</el-button
          >
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import { getCodeImgAPI, getNum } from '@/api/public'
// import { createNamespacedHelpers } from 'vuex'
// const { mapState: mapStateUser } = createNamespacedHelpers('user')
export default {
  components: {},
  data() {
    return {
      labelPosition: 'right',
      isShow: false,
      // 收集登录所需的信息
      loginForm: {
        clientToken: '',
        code: '', //验证图片的数字
        loginName: 'admin',
        loginType: 0, //登录类型 0：后台；1：运营运维端；2：合作商后台
        password: 'admin'
      },
      // 表单验证规则
      loginFormRules: {
        // 用户名/账号
        loginName: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          {
            pattern: /^[a-z]+$/,
            message: '请输入admin',
            trigger: 'blur'
          }
        ],
        code: [{ required: true, message: '请输入验证码', trigger: 'blur' }],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          {
            pattern: /^[a-z]+$/,
            message: '请输入admin',
            trigger: 'blur'
          }
        ]
      },
      loading: false //按钮加载状态
    }
  },
  created() {
    // 调用获取图片验证码
    this.getCodeImg()
  },
  mounted() {
    // 初始化验证
  },
  computed: {
    //  获取是否登录成功的状态，登录接口返回的success
    success() {
      return this.$store.state.user.success || false
    }
  },
  methods: {
    onSubmit() {
      console.log('submit!')
    },
    // 获取图片验证码
    async getCodeImg() {
      this.loginForm.clientToken = getNum()
      try {
        const res = await getCodeImgAPI(this.loginForm.clientToken)
        console.log(res)
        // 将获取到的图片地址给图片的src
        // console.log(res)
        // 将blob格式的文件转换为可识别的base格式文件  URL.createObjectURL(blob)
        const imgSrc = URL.createObjectURL(res.data)
        // console.log(imgSrc)
        this.$refs.codeImg.src = imgSrc
      } catch (error) {
        this.$message.error('获取验证码失败，请稍后重试！')
      }
    },
    // 登录
    login() {
      this.loading = true
      // 添加判断，如果校验通过，就发送请求获取验证码
      this.$refs.loginForm.validate(async (result) => {
        //没通过，return
        if (!result) {
          this.$message.error('请输入验证码！')
          return
        }
        // 校验通过发请求
        // 触发存储user/token的action
        // this.$dispatch返回一个promise
        try {
          await this.$store.dispatch('user/getToken', this.loginForm)
          if (this.success) {
            this.$router.push('/dashboard')
            this.$message({
              showClose: true,
              message: '登录成功！',
              type: 'success'
            })
          } else {
            this.$message.error('验证码不正确！，请检查后重新输入')
          }
        } finally {
          this.loading = false
        }
      })
    },
    // 点击重新获取新的验证码图片
    refreshCode() {
      this.getCodeImg()
    },
    // 是否显示密码可见
    isShowPass() {
      this.isShow = !this.isShow
      if (this.isShow) {
        this.$refs.password.type = 'password'
      } else {
        this.$refs.password.type = 'text'
      }
    }
  }
}
</script>

<style lang="less" scoped>
.login-container {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: url('../../assets/images/login/bg.png');
  background-size: cover;
  background-repeat: no-repeat;
  .login-rz-icon {
    line-height: 52px;
  }
  // 登录框
  .login-box {
    position: relative;
    width: 518px;
    height: 388px;
    padding: 76px 35px 0;
    background: #fff;
    -webkit-box-shadow: 0 3px 70px 0 rgb(30 111 72 / 35%);
    box-shadow: 0 3px 70px 0 rgb(30 111 72 / 35%);
    border-radius: 10px;
    .login-icon {
      position: absolute;
      width: 96px;
      height: 96px;
      top: -46px;
      left: 210px;
      img {
        width: 100%;
        height: 100%;
      }
    }
    // 表单
    .login-form {
      .el-input {
        font-size: 16px;
      }
      // 验证码
      .login-code {
        position: absolute;
        right: 0;
        top: 1px;
      }
      // 表单框
      /deep/.el-input__inner {
        height: 52px;
        padding-left: 40px;

        .last-rz-input {
          position: relative;
        }
        .el-input--prefix .el-input__inner {
          position: relative;
        }
      }
      .el-input__suffix {
        div {
          line-height: 52px;
        }
      }
      .login-rz-icon {
        margin: 0;
        padding-left: 3px;
      }
      .login-btn {
        width: 100%;
        height: 52px;
        background: linear-gradient(262deg, #2e50e1, #6878f0);
        opacity: 0.91;
        border-radius: 8px;
        color: #fff;
        text-shadow: 0 7px 22px #cfcfcf;
      }
    }
  }
}
</style>
