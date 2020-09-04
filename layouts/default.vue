<template>
  <el-container>
    <el-header>
      <div class="container row">
        <div class="row-main">
          <nuxt-link to="/">Nuxt RealWorld</nuxt-link>
        </div>
        <div>
          <el-menu
            :default-active="activeMenuIndex"
            @select="handleChangeMenu"
            mode="horizontal"
            style="border-bottom: 0px"
          >
            <el-menu-item index="/" style="border-bottom: 0px">Home</el-menu-item>
            <template v-if="hasLogin">
              <el-menu-item index="/article/create" style="border-bottom: 0px">
                <i class="el-icon-edit"></i>
                <span slot="title">New Post</span>
              </el-menu-item>
              <el-menu-item index="/settings" style="border-bottom: 0px">
                <i class="el-icon-setting"></i>
                <span slot="title">Settings</span>
              </el-menu-item>
            </template>
            <template v-else>
              <el-menu-item index="/login" style="border-bottom: 0px">Sign in</el-menu-item>
              <el-menu-item index="/register" style="border-bottom: 0px">Sign up</el-menu-item>
            </template>
          </el-menu>
        </div>
        <div v-if="hasLogin">
          <avator style="height: 100%" :username="loginUser.username" :image="loginUser.image" />
        </div>
      </div>
    </el-header>
    <el-main>
      <Nuxt />
    </el-main>
    <el-footer>
      <div class="container" style="text-align: center;">
        <nuxt-link to="/">Nuxt RealWorld</nuxt-link>
        <span class="attribution">
          An interactive learning project from
          <a href="https://thinkster.io">Thinkster</a>. Code &amp; design licensed under MIT.
        </span>
      </div>
    </el-footer>
  </el-container>
</template>

<script>
import loginUserMixin from '@/mixins/loginUser.js'
import Avator from '@/components/Avator.vue'
export default {
  name: 'LayoutPage',
  components: { Avator },
  data() {
    return {
      activeMenuIndex: '/',
    }
  },
  mixins: [loginUserMixin],
  methods: {
    handleChangeMenu(key) {
      this.$router.push(key)
    },
  },
}
</script>

<style>
html {
  font-family: 'Source Sans Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI',
    Roboto, 'Helvetica Neue', Arial, sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}

*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
}

.button--green {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #3b8070;
  color: #3b8070;
  text-decoration: none;
  padding: 10px 30px;
}

.button--green:hover {
  color: #fff;
  background-color: #3b8070;
}

.button--grey {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #35495e;
  color: #35495e;
  text-decoration: none;
  padding: 10px 30px;
  margin-left: 15px;
}

.button--grey:hover {
  color: #fff;
  background-color: #35495e;
}

a {
  text-decoration: none;
}

.el-main {
  position: absolute;
  top: 60px;
  bottom: 60px;
  overflow: auto;
  width: 100%;
  padding: 0px;
}

.el-header {
  line-height: 60px;
  position: fixed;
  top: 0px;
  width: 100%;
}

.el-footer {
  line-height: 60px;
  position: fixed;
  bottom: 0px;
  width: 100%;
}

.container {
  margin-left: auto;
  margin-right: auto;
}

.row {
  display: flex;
}

.row-main {
  flex: 1;
}

@media (min-width: 544px) {
  .container {
    max-width: 576px;
  }
}

@media (min-width: 768px) {
  .container {
    max-width: 720px;
  }
}

@media (min-width: 1200px) {
  .container {
    max-width: 1140px;
  }
}

.header-menu {
  border-bottom: 0px;
}

.attribution {
  vertical-align: middle;
  margin-left: 10px;
  font-size: 0.8rem;
  color: #bbb;
  font-weight: 300;
}
</style>
