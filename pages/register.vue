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
        <div class="register-header">
          <h1 style="margin-bottom: 12px">Sign up</h1>
          <nuxt-link to="/register">Have an account?</nuxt-link>
        </div>

        <ul class="error-messages">
          <li v-for="(message, key) in errors" :key="key">{{key}} {{message}}</li>
        </ul>

        <el-form ref="form" :model="form" :rules="rules" label-width="0px">
          <el-form-item prop="username">
            <el-input v-model="form.username" placeholder="Username"></el-input>
          </el-form-item>
          <el-form-item prop="email">
            <el-input v-model="form.email" placeholder="Email"></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input type="password" v-model="form.password" placeholder="Password"></el-input>
          </el-form-item>
        </el-form>
        <div class="register-operate">
          <el-button type="primary" @click="submit">Sign up</el-button>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { register } from '@/api/user.js'
export default {
  name: 'RegisterPage',
  middleware: 'notAuthenticated',

  data() {
    return {
      form: {
        username: '',
        email: '',
        password: '',
      },
      rules: {
        username: [
          { required: true, message: 'username is required', trigger: 'blur' },
        ],
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
          register(this.form)
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
.register-header {
  margin-top: 100px;
  text-align: center;
  margin-bottom: 20px;
}

.register-operate {
  text-align: right;
}

.error-messages {
  color: #b85c5c !important;
  font-weight: bold;
  margin-bottom: 16px;
}
</style>