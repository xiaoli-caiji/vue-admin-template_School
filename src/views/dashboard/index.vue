<template>
  <div class="dashboard-container" auto-complete="on">
    <div class="dashboard-text">姓名: {{ name }} </div>
    <div class="body">
      {{ '这里是缅甸北部，我生长的地方;欢迎来到我的世界，娇贵的小公主。' }}
    </div>
    <div>
      <el-carousel id="card" v-model="pl" :interval="4000" type="card" arrow="always" height="200px">
        <el-carousel-item v-for="item in pl" :key="item.id" @click.native.prevent="watchNews(item)">
          <img id="picture" style="width:100%;height:100%;" :src="'https://localhost:13001'+item.newsCoverAddressOrTitle">
        </el-carousel-item>
      </el-carousel>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Dashboard',
  data() {
    return {
      pl: [{}],
      news: ''
    }
  },
  computed: {
    ...mapGetters([
      'name', 'code', 'role'
    ])
  },
  mounted: function() {
    this.getNews()
  },
  methods: {
    getNews() {
      this.$store.dispatch('user/getNews').then(response => {
        this.pl = response.data
        document.getElementById('card').style.objectFit = 'fill'
        document.getElementById('picture').style.objectPosition = 'inherit'
      })
    },
    watchNews(news) {
      console.log(news)
      window.open('https://localhost:13001' + news.newsContentAddress)
      // const currentNewsLink = this.$refs.carousel.
      this.news = ('https://localhost:13001' + news.newsContentAddress)
    }
  }
}
</script>

<style lang="scss" scoped>
$bg:#2adb1a ;
$light_gray:#fff;
$cursor: #fff;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
  }
}
$bg:#0a94f0d2;
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
.dashboard-container {
  min-height: 100%;
  width: 100%;
  background: $bg
}
</style>
