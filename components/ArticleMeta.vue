<template>
  <div style="display: flex">
    <user-avator
      :username="article.author.username"
      :image="article.author.image"
      :date="article.createdAt"
    />

    <el-button
      plain
      size="medium"
      icon="el-icon-plus"
      style="margin-left: 20px"
      @click="triggerFollow"
    >{{article.author.following ? 'Unfollow' : 'Follow'}} {{article.author.username}}</el-button>
    <el-button
      plain
      size="medium"
      icon="el-icon-star-off"
      @click="triggerFavorited"
    >{{article.favorited ? 'Unfavorite' : 'Favorite'}} Article</el-button>
  </div>
</template>

<script>
import UserAvator from './Avator.vue'
import { favoriteArticle, unfavoriteArticle } from '@/api/article.js'
import { followUser, unfollowUser } from '@/api/profile.js'
import loginUserMixin from '@/mixins/loginUser.js'
export default {
  name: 'ArticleMeta',
  components: { UserAvator },
  mixins: [loginUserMixin],
  props: {
    article: {
      type: Object,
      required: true,
    },
  },

  data() {
    return {
      isUpdateFollowing: false,
      isUpdateFavorited: false,
    }
  },

  methods: {
    async triggerFollow() {
      if (!this.hasLogin) {
        this.$router.push({
          name: 'login',
        })
        return
      }
      this.isUpdateFollowing = true
      const { username, following } = this.article.author
      const request = following ? followUser : unfollowUser
      const { data } = await request(username)
      if (data && data.profile) {
        this.article.author.following = data.profile.following
      }
      this.isUpdateFollowing = false
    },
    async triggerFavorited() {
      if (!this.hasLogin) {
        this.$router.push({
          name: 'login',
        })
        return
      }
      this.isUpdateFavorited = true
      const { slug, favorited } = this.article
      const request = favorited ? unfavoriteArticle : favoriteArticle
      const { data } = await request(slug)
      if (data && data.article) {
        this.article.favorited = data.article.favorited
        this.article.favoritesCount = data.article.favoritesCount
      }
      this.isUpdateFavorited = false
    },
  },
}
</script>