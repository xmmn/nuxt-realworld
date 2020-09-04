<template>
  <div>
    <el-form :model="form" style="width: 100%; margin-top: 20px" v-if="hasLogin">
      <el-form-item prop="commentBody">
        <el-input
          type="textarea"
          :rows="5"
          placeholder="Write a comment..."
          v-model="form.commentBody"
        ></el-input>
      </el-form-item>
      <div class="comments-operate">
        <user-avator
          style="flex: 1"
          :image="loginUser? loginUser.image : ''"
          class="comment-author-img"
        />
        <el-button type="primary" @click="addComment">Publish Article</el-button>
      </div>
    </el-form>

    <el-card shadow="never" style="margin-top: 20px" v-for="comment in comments" :key="comment.id">
      <p class="card-text">{{comment.body}}</p>
      <div class="comment-footer">
        <user-avator
          :username="comment.author.username"
          :image="comment.author.image"
          :date="comment.createdAt"
          style="flex: 1"
        ></user-avator>
        <i class="el-icon-delete" @click="deleteComment(comment.id)" v-if="comment.author.username === article.author.username"></i>
      </div>
    </el-card>
  </div>
</template>

<script>
import UserAvator from '@/components/Avator.vue'
import loginUserMixin from '@/mixins/loginUser.js'
export default {
  name: 'ArticleComments',
  components: { UserAvator },
  mixins: [loginUserMixin],
  data() {
    return {
      form: {
        commentBody: '',
      },
    }
  },
  props: {
    comments: {
      type: Array,
      default: () => [],
    },
    article: {
      type: Object,
      required: true,
    },
  },
  methods: {
    addComment() {
      if (!this.form.commentBody) return
      this.$emit('add-comment', this.form.commentBody)
    },
    deleteComment(id) {
      this.$emit('delete-comment', id)
    },
  },
}
</script>

<style>
.comments-operate {
  display: flex;
}

.comment-footer {
  margin-top: 30px;
  display: flex;
  align-items: center;
}
</style>