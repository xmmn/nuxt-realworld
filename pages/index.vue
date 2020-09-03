<template>
  <div>
    <div class="banner">
      <div class="container">
        <h1 class="logo-font">Nuxt RealWorld</h1>
        <p>A place to share your knowledge.</p>
      </div>
    </div>
    <div class="container">
      <el-row :gutter="20">
        <el-col :xs="24" :sm="24" :md="18" :lg="18" :xl="18">
          <article-item v-for="article in articles" :key="article.slug" :article="article" />
        </el-col>
        <el-col :xs="24" :sm="24" :md="6" :lg="6" :xl="6">
          <el-tag class="article-tag" type="info" v-for="tag in top20Tags" :key="tag">{{tag}}</el-tag>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import ArticleItem from '@/components/Article.vue'
import { getAllArticles } from '@/api/article.js'
import { getAllTags } from '@/api/tag.js'

function getQueryParams(query) {
  let { page = '1', limit = 10, tag } = query
  return {
    page: Number.parseInt(page),
    limit,
    tag,
  }
}

export default {
  name: 'HomePage',
  components: { ArticleItem },

  async asyncData({ query }) {
    const { page, limit, tag } = getQueryParams(query)
    const [articleRes, tagRes] = await Promise.all([
      getAllArticles({
        offest: (page - 1) * limit,
        limit,
      }),
      getAllTags(),
    ])

    const { articles, articlesCount } = articleRes.data
    const { tags } = tagRes.data
    return {
      articles,
      articlesCount,
      tags,
    }
  },

  computed: {
    top20Tags() {
      return this.tags.filter((t, index) => index < 20)
    },
  },
}
</script>

<style>
.banner {
  background: #5cb85c;
  box-shadow: inset 0 8px 8px -8px rgba(0, 0, 0, 0.3),
    inset 0 -8px 8px -8px rgba(0, 0, 0, 0.3);
  padding: 2rem;
  margin-bottom: 2rem;
}

.banner p {
  color: #fff;
  text-align: center;
  font-size: 1.5rem;
  font-weight: 300 !important;
  margin-bottom: 0px;
}

.banner h1 {
  color: #fff;
  text-shadow: 0px 1px 3px rgba(0, 0, 0, 0.3);
  font-weight: 700 !important;
  text-align: center;
  font-size: 3.5rem;
  padding-bottom: 0.5rem;
}

.logo-font {
  font-family: 'Titillium Web', sans-serif;
}

.article-tag {
  margin-right: 12px;
  margin-top: 12px;
  cursor: pointer;
}
</style>
