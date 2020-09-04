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
        <div class="create-header"></div>

        <ul class="error-messages">
          <li v-for="(message, key) in errors" :key="key">{{key}} {{message}}</li>
        </ul>

        <el-form ref="form" :model="form" :rules="rules" label-width="0px">
          <el-form-item prop="title">
            <el-input v-model="form.title" :disabled="insertArticle" placeholder="Article Title"></el-input>
          </el-form-item>
          <el-form-item prop="description">
            <el-input v-model="form.description" :disabled="insertArticle" placeholder="What's this article about?"></el-input>
          </el-form-item>
          <el-form-item prop="body">
            <el-input
              type="textarea"
              :rows="5"
              placeholder="Write your article (in markdown)"
              :disabled="insertArticle"
              v-model="form.body"
            ></el-input>
          </el-form-item>
          <el-form-item prop="tag">
            <el-input v-model="tag" :disabled="insertArticle" placeholder="Enter tags" @change="addTag"></el-input>
            <el-tag
              class="article-tag"
              type="info"
              v-for="t in form.tagList"
              :key="t"
              closable
              @close="removeTag(t)"
            >{{t}}</el-tag>
          </el-form-item>
        </el-form>
        <div class="create-operate">
          <el-button type="primary" @click="submit">Publish Article</el-button>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { addArticle } from '@/api/article.js'
export default {
  name: 'CreatePage',

  data() {
    return {
      form: {
        title: '',
        description: '',
        body: '',
        tagList: [],
      },
      tag: '',
      tagList: [],
      rules: {
        title: [
          { required: true, message: 'title is required', trigger: 'blur' },
        ],
        description: [
          {
            required: true,
            message: 'description is required',
            trigger: 'blur',
          },
        ],
        body: [
          { required: true, message: 'body is required', trigger: 'blur' },
        ],
      },
      errors: {},
      insertArticle: false,
    }
  },

  methods: {
    submit() {
      this.$refs.form.validate(async (valid) => {
        if (valid) {
          this.insertArticle = true
          const { data } = await addArticle({
            article: this.form,
          })
          this.isAddArticle = false
          if (data.article) {
            // 跳转到文章页面
            this.$router.push({
              name: 'article-slug',
              params: {
                slug: data.article.slug,
              },
            })
          }
        } else {
          return false
        }
      })
    },
    addTag() {
      if (this.tag.trim().length === 0) return
      if (this.form.tagList.includes(this.tag.trim())) return
      this.form.tagList.push(this.tag.trim())
      this.tag = ''
    },
    removeTag(tag) {
      this.form.tagList = this.form.tagList.filter((m) => m !== tag)
    },
  },
}
</script>

<style>
.create-header {
  margin-top: 100px;
  text-align: center;
  margin-bottom: 20px;
}

.create-operate {
  text-align: right;
}

.error-messages {
  color: #b85c5c !important;
  font-weight: bold;
  margin-bottom: 16px;
}
</style>