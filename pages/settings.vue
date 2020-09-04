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
        <div class="setting-header">
          <h1 style="margin-bottom: 12px">Your Settings</h1>
        </div>

        <ul class="error-messages">
          <li v-for="(message, key) in errors" :key="key">{{key}} {{message}}</li>
        </ul>

        <el-form ref="form" :model="form" :rules="rules" label-width="0px">
          <el-form-item prop="image">
            <el-input
              v-model="form.image"
              :disabled="isUpdating"
              placeholder="URL of profile picture"
            ></el-input>
          </el-form-item>
          <el-form-item prop="username">
            <el-input v-model="form.username" :disabled="isUpdating" placeholder="Username"></el-input>
          </el-form-item>
          <el-form-item prop="bio">
            <el-input
              type="textarea"
              :rows="5"
              placeholder="Short bio about you"
              v-model="form.bio"
              :disabled="isUpdating"
            ></el-input>
          </el-form-item>
          <el-form-item prop="email">
            <el-input v-model="form.email" :disabled="isUpdating" placeholder="Email"></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input
              type="password"
              v-model="form.password"
              :disabled="isUpdating"
              placeholder="Password"
            ></el-input>
          </el-form-item>
        </el-form>
        <div class="setting-operate">
          <el-button type="primary" @click="submit">Update Settings</el-button>
        </div>

        <hr style="margin-top: 16px; margin-bottom: 16px;" />

        <el-button type="danger" plain size="mini">Or click here to logout.</el-button>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { updateUser } from '@/api/user.js'
export default {
  name: 'SettingsPage',
  middleware: 'notAuthenticated',
  asyncData({ store }) {
    const user = store.state.loginUser
    return {
      form: {
        ...{
          image: '',
          username: '',
          email: '',
          password: '',
          bio: '',
        },
        ...user,
      },
    }
  },

  data() {
    return {
      rules: {
        email: [
          { required: true, message: 'email is required', trigger: 'blur' },
        ],
        username: [
          { required: true, message: 'username is required', trigger: 'blur' },
        ],
      },
      errors: {},
      isUpdating: false,
    }
  },

  methods: {
    async submit() {
      this.isUpdating = true
      const { data } = await updateUser(this.form)
      const { user } = data
      if (user) {
        this.$store.commit('set_login_user', user)
      }
      this.isUpdating = false
    },
    logout() {
      this.$store.commit('set_login_user', null)
      this.$router.push({
        name: 'login',
      })
    },
  },
}
</script>

<style>
.setting-header {
  margin-top: 100px;
  text-align: center;
  margin-bottom: 20px;
}

.setting-operate {
  text-align: right;
}

.error-messages {
  color: #b85c5c !important;
  font-weight: bold;
  margin-bottom: 16px;
}
</style>