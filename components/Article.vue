<template>
  <div class="article-preview">
    <div class="article-meta">
      <div class="article-info">
        <div class="article-header">
          <avator
            :username="article.author.username"
            :date="article.createdAt"
            :image="article.author.image"
          />
        </div>
        <div class="article-body">
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
          icon="el-icon-star-on"
          type="success"
        >{{article.favoritesCount}}</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import Avator from './Avator.vue'
export default {
  name: 'ArticleItem',
  components: { Avator },

  props: {
    article: {
      type: Object,
      required: true,
    },
  },
}
</script>

<style>
.article-preview {
  border-top: 1px solid rgba(0, 0, 0, 0.1);
  padding: 1.5rem 0;
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