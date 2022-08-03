<template>
  <div class="navbar">
    <div class="right-menu">
      <el-dropdown class="avatar-container" trigger="click">
        <div class="avatar-wrapper">
          <img
            :src="
              $store.state.user.userInfo.image
                ? $store.state.user.userInfo.image
                : '12'
            "
            class="img"
            v-imgError="imgError"
          />
          <span class="wellcom"
            >欢迎您,{{ $store.state.user.userInfo.roleName }}
          </span>
          <el-popover
            placement="top-start"
            width="6"
            trigger="hover"
            content="退出登录"
          >
            <span slot="reference" class="loginout" @click="loginOut"
              >退出</span
            >
          </el-popover>
          <i class="el-icon-caret-bottom" />
        </div>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Breadcrumb from '@/components/Breadcrumb'
import Hamburger from '@/components/Hamburger'
import imgError from '@/assets/images/layout/avatarError.png'
export default {
  components: {
    Breadcrumb,
    Hamburger
  },
  data() {
    return {
      imgError
    }
  },
  computed: {
    ...mapGetters(['sidebar', 'avatar'])
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch('app/toggleSideBar')
    },
    // 退出
    async loginOut() {
      await this.$store.dispatch('user/logout')
      this.$router.push(`/login?redirect=${this.$route.fullPath}`)
    }
  }
}
</script>

<style lang="scss" scoped>
.navbar {
  height: 60px;
  overflow: hidden;
  position: relative;
  // background: red;
  width: 100%;
  background-image: url('~@/assets/images/layout/navBar.png');
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);

  .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background 0.3s;
    -webkit-tap-highlight-color: transparent;

    &:hover {
      background: rgba(0, 0, 0, 0.025);
    }
  }

  .breadcrumb-container {
    float: left;
  }

  .right-menu {
    float: right;
    height: 100%;
    line-height: 50px;

    &:focus {
      outline: none;
    }

    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      color: #5a5e66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background 0.3s;

        &:hover {
          background: rgba(0, 0, 0, 0.025);
        }
      }
    }

    .avatar-container {
      margin-right: 30px;

      .avatar-wrapper {
        margin-top: 5px;
        color: #fff;
        display: flex;
        align-items: center;
        position: relative;
        .wellcom {
          margin-left: 6px;
          margin-right: 20px;
        }
        .loginout {
          // font-style: normal;
          cursor: pointer;
        }
        .user-avatar {
          cursor: pointer;
          width: 40px;
          height: 40px;
          border-radius: 10px;
        }

        .el-icon-caret-bottom {
          cursor: pointer;
          position: absolute;
          right: -20px;
          // top: 25px;
          font-size: 12px;
        }
      }
    }
  }
}
</style>
