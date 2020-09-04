<template>
  <div>
    <div class="profile-banner">
      <div class="container">
        <user-avator :image="profile.image" :center="true" :size="100" style="margin-bottom: 1rem" />
        <h4>{{username}}</h4>

        <div class="profile-operate">
          <el-button
            v-if="isLoginUser"
            plain
            size="medium"
            icon="el-icon-setting"
            @click="$router.push('/settings')"
          >Edit Profile Settings</el-button>
          <el-button
            v-else
            plain
            size="medium"
            icon="el-icon-plus"
            @click="triggerFollow"
          >{{profile.following ? 'Unfollow' : 'Follow'}} {{username}}</el-button>
        </div>
      </div>
    </div>
    <div class="container">
      <el-row :gutter="20">
        <el-col>
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
      </el-row>
    </div>
  </div>
</template>


<script>
import { getProfile, followUser, unfollowUser } from '@/api/profile.js'
import { getAllArticles } from '@/api/article.js'
import UserAvator from '@/components/Avator.vue'
import loginUserMixin from '@/mixins/loginUser.js'
import ArticleItem from '@/components/Article.vue'
import ArticleTab from '@/components/Tab.vue'
function getQueryParams(query) {
  let { page = '1', limit = 10, tab = 'my_articles' } = query
  return {
    page: Number.parseInt(page),
    limit,
    tab,
  }
}
export default {
  name: 'ProfilePage',
  components: { UserAvator, ArticleItem, ArticleTab },
  mixins: [loginUserMixin],
  watchQuery: ['page', 'tab'],

  async asyncData({ params, query }) {
    const { username } = params
    const { page, limit, tab } = getQueryParams(query)
    const queryData = {
      limit,
      offset: (page - 1) * limit,
    }

    if (tab === 'my_articles') {
      queryData['author'] = username
    } else if (tab === 'favorited_articles') {
      queryData['favorited'] = username
    }

    const [profileRes, articlesRes] = await Promise.all([
      getProfile(username),
      getAllArticles(queryData),
    ])

    let profile = {
      username: '',
      image: '',
      bio: '',
    }
    let articles = []
    let count = 0
    try {
      profile = profileRes.data.profile
      articles = articlesRes.data.articles
      count = articlesRes.data.articlesCount
    } catch {}

    return {
      profile,
      articles,
      count,

      tab,
      page,
      limit,
      username,
    }
  },

  data() {
    return {
      tabs: [
        {
          label: 'My Articles',
          key: 'my_articles',
        },
        {
          label: 'Favorited Articles',
          key: 'favorited_articles',
        },
      ],
      isFollowing: false,
    }
  },

  computed: {
    isLoginUser() {
      if (!this.hasLogin) {
        return false
      }
      return this.loginUser.username === this.username
    },
  },

  methods: {
    tabChange(tab) {
      this.$router.push({
        name: 'profile-username',
        query: {
          tab: tab,
        },
        params: {
          username: this.username,
        },
      })
    },
    pageChange(currentPage) {
      this.$router.push({
        name: 'profile-username',
        query: {
          page: currentPage,
          tag: this.tag,
          tab: this.tab,
        },
        params: {
          username: this.username,
        },
      })
    },
    async triggerFollow() {
      if (!this.hasLogin) {
        this.$router.push({
          name: 'login',
        })
        return
      }
      this.isFollowing = true
      const { username, following } = this.profile
      const request = following ? followUser : unfollowUser
      const { data } = await request(username)
      if (data && data.profile) {
        this.profile.following = data.profile.following
      }
      this.isFollowing = false
    },
  },
}
</script>

<style>
.profile-banner {
  text-align: center;
  background: #f3f3f3;
  padding: 2rem 0 1rem 0;
  margin-bottom: 2rem;
}

.profile-operate {
  text-align: right;
}
</style>