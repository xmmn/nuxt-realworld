<template>
  <div class="avator">
    <div
      class="col-center avator-image"
      :class="{'avator-center': center}"
      @click="$router.push(`/profile/${username}`)"
    >
      <el-avatar :size="size" :src="image" @error="errorHandler">
        <img src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png" />
      </el-avatar>
    </div>

    <div class="avator-user-name">
      <nuxt-link :to="`/profile/${username}`">{{username}}</nuxt-link>
      <br />
      <span class="avator-date" v-if="date">{{date | format('MMMM DD, YYYY')}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Avator',
  props: {
    username: {
      type: String,
      default: '',
    },
    image: {
      type: String,
      default:
        'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png',
    },
    date: {
      type: String,
      default: '',
    },
    size: {
      type: [Number, String],
      default: 'large',
    },
    center: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    errorHandler() {
      return true
    },
  },
}
</script>

<style scoped>
.avator {
  display: flex;
}

.avator-image {
  cursor: pointer;
}

.avator-center {
  margin: 0 auto;
}

.col-center {
  display: flex;
  align-items: center;
}

.avator-user-name {
  color: #5cb85c;
  margin-left: 10px;
  cursor: pointer;
}

.avator-date {
  color: #bbb;
  font-size: 0.8rem;
}
</style>