<template>
  <div :class="{'article-preview': true, 'article-border': index !== 0}">
    <div class="article-meta">
      <div class="article-info">
        <div class="article-header">
          <avator
            :username="article.author.username"
            :date="article.createdAt"
            :image="article.author.image"
          />
        </div>
        <div class="article-body" @click="showDetails">
          <template v-if="article.title || article.description">
            <div class="article-title">{{article.title}}</div>
            <div class="article-description">{{article.description}}</div>
          </template>
          <div class="article-description" v-else>there is nothing</div>
          <div class="article-more">Read more...</div>
        </div>
      </div>
      <div class="article-operate">
        <el-button
          :plain="!article.favorited"
          size="medium"
          :disabled="isFavoriting"
          icon="el-icon-star-on"
          type="success"
          @click="triggerFavorited"
        >{{article.favoritesCount}}</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import Avator from './Avator.vue'
import { favoriteArticle, unfavoriteArticle } from '@/api/article.js'
import loginUserMixin from '@/mixins/loginUser.js'
export default {
  name: 'ArticleItem',
  components: { Avator },
  mixins: [loginUserMixin],

  props: {
    article: {
      type: Object,
      required: true,
    },
    index: {
      type: Number,
      default: -1,
    },
  },

  data() {
    return {
      isFavoriting: false,
    }
  },

  methods: {
    async triggerFavorited() {
      if (!this.hasLogin) {
        return this.$router.push({
          name: 'login',
        })
      }

      this.isFavoriting = true
      const request = this.article.favorited
        ? unfavoriteArticle
        : favoriteArticle

      const { data } = await request(this.article.slug)
      if (data) {
        const { article } = data
        this.article.favorited = article.favorited
        this.article.favoritesCount = article.favoritesCount
      }
      this.isFavoriting = false
    },

    showDetails() {
      this.$router.push(`/article/${this.article.slug}`)
    },
  },
}
</script>

<style>
.article-preview {
  padding: 1.5rem 0;
}

.article-border {
  border-top: 1px solid rgba(0, 0, 0, 0.1);
}

.article-meta {
  display: flex;
  margin-right: 16px;
}

.article-info {
  flex: 1;
}

.article-header {
  margin: 0 0 1rem 0;
}

.article-body {
  cursor: pointer;
}

.article-title {
  font-weight: 600 !important;
  font-size: 1.5rem !important;
  margin-bottom: 3px;
}

.article-description {
  font-weight: 300;
  font-size: 16px;
  color: #999;
  margin-bottom: 15px;
  font-size: 1rem;
  line-height: 1.3rem;
}

.article-more {
  max-width: 30%;
  font-size: 0.8rem;
  font-weight: 300;
  color: #bbb;
  vertical-align: middle;
}
</style>