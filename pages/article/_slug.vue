<template>
  <div>
    <div class="article-banner">
      <div class="container">
        <h1 class="logo-font">Nuxt RealWorld</h1>
        <div class="article-meta">
          <article-meta :article="article" />
        </div>
      </div>
    </div>
    <div class="container">
      <div v-html="articleBody"></div>
      <el-tag class="article-tag" type="info" v-for="t in article.tagList" :key="t">{{t}}</el-tag>
      <hr style="margin-top: 20px; margin-bottom: 20px;" />
    </div>
    <el-row class="container">
      <el-col
        :xs="{span: 24, offset: 0}"
        :sm="{span: 24, offset: 0}"
        :md="{span: 20, offset: 4}"
        :lg="{span: 16, offset: 8}"
        :xl="{span: 12, offset: 8}"
      >
        <article-meta :article="article" />
        <article-comments
          style="width: 100%"
          :article="article"
          :comments="comments"
          @add-comment="addComment"
          @delete-comment="deleteComment"
        />
      </el-col>
    </el-row>
  </div>
</template>

<script>
import {
  getArticle,
  getArticleComments,
  addArticleComment,
  deleteArticleComment,
} from '@/api/article.js'
import MarkdownIt from 'markdown-it'
import ArticleMeta from '@/components/ArticleMeta.vue'
import ArticleComments from '@/components/ArticleComments.vue'
export default {
  name: 'ArticlePage',
  components: { ArticleComments, ArticleMeta },
  async asyncData({ params }) {
    const { slug } = params
    const [articleRes, commentsRes] = await Promise.all([
      getArticle(slug),
      getArticleComments(slug),
    ])
    return {
      article: articleRes.data.article,
      comments: commentsRes.data.comments
    }
  },

  computed: {
    articleBody() {
      if (this.article.body) {
        let md = new MarkdownIt()
        return md.render(this.article.body)
      } else {
        return 'there is no Body here...'
      }
    },
  },
  methods: {
    async addComment(body) {
      const { slug } = this.$route.params
      await addArticleComment(slug, this.commentBody)

      const { data } = await getArticleComments(slug)
      this.comments = data
    },
    async deleteComment(id) {
      const { slug } = this.$route.params
      await deleteArticleComment(slug, id)

      this.comments = this.comments.filter((m) => m.id !== id)
    },
  },
}
</script>

<style>
.article-banner {
  color: #fff;
  background: #333;
  margin-bottom: 2rem;
  padding: 2rem 0 2rem 0;
}

.article-meta {
  margin: 2rem 0 0 0;
}
</style>