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
          <article-tab :tabs="tabs" :current="tab" @tab-change="tabChange" />
          <div class="article-preview" v-if="!articles.length">No articles are here... yet.</div>
          <template v-else>
            <article-item
              v-for="(article, i) in articles"
              :index="i"
              :key="article.slug"
              :article="article"
            />
          </template>
          <div class="pagination">
            <el-pagination
              background
              layout="prev, pager, next"
              :current-page="page"
              :page-size="limit"
              :total="count"
              @current-change="pageChange"
            ></el-pagination>
          </div>
        </el-col>
        <el-col :xs="24" :sm="24" :md="6" :lg="6" :xl="6">
          <el-tag
            class="article-tag"
            :type="t === tag ? 'success' : 'info'"
            v-for="t in top20Tags"
            :key="t"
            @click="clickTag(t)"
          >{{t}}</el-tag>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import ArticleItem from '@/components/Article.vue'
import { getAllArticles, getFeedArticles } from '@/api/article.js'
import { getAllTags } from '@/api/tag.js'
import ArticleTab from '@/components/Tab.vue'
import loginUserMixin from '@/mixins/loginUser.js'

function getQueryParams(query) {
  let { page = '1', limit = 10, tag, tab = 'global_feed' } = query
  if (tag) {
    tab = tag
  }
  return {
    page: Number.parseInt(page),
    limit,
    tag,
    tab,
  }
}

export default {
  name: 'HomePage',
  components: { ArticleItem, ArticleTab },
  watchQuery: ['page', 'tag', 'tab'],
  mixins: [loginUserMixin],

  async asyncData({ query }) {
    const { page, limit, tag, tab } = getQueryParams(query)
    const feedRequest = tab === 'your_feed' ? getFeedArticles : getAllArticles
    const [articleRes, tagRes] = await Promise.all([
      feedRequest({
        offest: (page - 1) * limit,
        limit,
        tag,
      }),
      getAllTags(),
    ])

    const { articles, articlesCount: count } = articleRes.data
    const { tags } = tagRes.data
    return {
      articles,
      count,
      tags,

      page,
      limit,
      tag,
      tab,
    }
  },

  computed: {
    top20Tags() {
      return this.tags.filter((t, index) => index < 20)
    },
    tabs() {
      let tabs = []
      if (this.hasLogin) {
        tabs.push({
          label: 'Your Feed',
          key: 'your_feed',
        })
      }
      tabs.push({
        label: 'Global Feed',
        key: 'global_feed',
      })

      if (this.tag) {
        tabs.push({
          label: `# ${this.tag}`,
          key: this.tag,
        })
      }
      return tabs
    },
  },

  methods: {
    pageChange(currentPage) {
      this.$router.push({
        name: 'index',
        query: {
          page: currentPage,
          tag: this.tag,
          tab: this.tab,
        },
      })
    },
    clickTag(tag) {
      this.$router.push({
        name: 'index',
        query: {
          tag: tag,
        },
      })
    },

    tabChange(tab) {
      this.$router.push({
        name: 'index',
        query: {
          tab: tab,
        },
      })
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

.pagination {
  margin-top: 1rem;
  margin-bottom: 1rem;
  text-align: right;
}
</style>
