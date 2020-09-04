<template>
  <div class="container">
    <el-row>
      <el-col
        :xs="{span: 24, offset: 0}"
        :sm="{span: 22, offset: 1}"
        :md="{span: 20, offset: 2}"
        :lg="{span: 12, offset: 6}"
        :xl="{span: 12, offset: 6}"
      >
        <div class="login-header">
          <h1 style="margin-bottom: 12px">Sign in</h1>
          <nuxt-link to="/register">Need an account?</nuxt-link>
        </div>

        <ul class="error-messages">
          <li v-for="(message, key) in errors" :key="key">{{key}} {{message}}</li>
        </ul>

        <el-form ref="form" :model="form" :rules="rules" label-width="0px">
          <el-form-item prop="email">
            <el-input v-model="form.email" placeholder="Email"></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input v-model="form.password" placeholder="Password"></el-input>
          </el-form-item>
        </el-form>
        <div class="login-operate">
          <el-button type="primary" @click="submit">Sign in</el-button>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { login } from '@/api/user.js'
export default {
  name: 'LoginPage',
  middleware: 'notAuthenticated',

  data() {
    return {
      form: {
        email: '',
        password: '',
      },
      rules: {
        email: [
          { required: true, message: 'email is required', trigger: 'blur' },
        ],
        password: [
          { required: true, message: 'password is required', trigger: 'blur' },
        ],
      },
      errors: {},
    }
  },

  methods: {
    submit() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          login(this.form)
            .then(({ data }) => {
              const { user } = data
              if (user) {
                this.$store.commit('set_login_user', user)
                this.$router.push({
                  name: 'index',
                  query: {
                    page: 1,
                  },
                })
              }
            })
            .catch((err) => {
              this.errors = err.response.data.errors
            })
        } else {
          return false
        }
      })
    },
  },
}
</script>

<style>
.login-header {
  margin-top: 100px;
  text-align: center;
  margin-bottom: 20px;
}

.login-operate {
  text-align: right;
}

.error-messages {
  color: #b85c5c !important;
  font-weight: bold;
  margin-bottom: 16px;
}
</style>