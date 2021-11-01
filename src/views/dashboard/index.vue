<template>
  <div class="dashboard-container" auto-complete="on">
    <div class="dashboard-text">姓名: {{ name }} </div>
    <div class="body">
      {{ '这里是缅甸北部，我生长的地方;欢迎来到我的世界，娇贵的小公主。' }}
    </div>
    <div class="carousel-container">
      <el-carousel id="card" v-model="NewsCoverIsImg" :interval="4000" type="card" arrow="always" height="200px">
        <el-carousel-item
          v-for="item in NewsCoverIsImg"
          :key="item.id"
          :label="item.newsName"
          @click.native.prevent="watchNews(item)"
        >
          <img id="picture" style="width:100%;height:100%;" :src="'https://localhost:13001'+item.newsCoverAddressOrTitle">
        </el-carousel-item>
      </el-carousel>
    </div>
    <div
      v-for="(item,index) in NewsCoverIsTitle"
      :key="index"
      class="htmlLink-container"
    >
      <el-link
        @click="watchHtmlNews(item)"
      >
        <a>{{ item.newsCoverAddressOrTitle }}</a>
      </el-link>
      <!-- <li
        v-for="(item,index) in NewsCoverIsTitle"
        :key="index"
      >
        <a :href="'https://localhost:13001'+item.newsContentAddress">{{ item.newsCoverAddressOrTitle }}</a>
      </li> -->
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Dashboard',
  data() {
    return {
      NewsCoverIsImg: [{}],
      NewsCoverIsTitle: [{}],
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
      this.$store.dispatch('user/showNews').then(response => {
        this.NewsCoverIsImg = response.data.CoverIsImg
        this.NewsCoverIsTitle = response.data.CoverIsTitle
        document.getElementById('card').style.objectFit = 'fill'
        document.getElementById('picture').style.objectPosition = 'inherit'
      })
    },
    watchNews(news) {
      console.log(news)
      window.open('https://localhost:13001' + news.newsContentAddress)
    },
    watchHtmlNews(url) {
      window.open('https://localhost:13001' + url.newsContentAddress)
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
$bg:#06f0f0d2;
.carousel {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 60px;
    line-height: 46px;
  }
}
.carousel-container {
  min-height: 100%;
  width: 100%;
  background: $bg
}
$bg:hsl(340, 100%, 50%);
.htmlLink {
  &-text {
    font-size: 60px;
    line-height: 46px;
  }
}
.htmlLink-container {
  min-height: 100%;
  width: 100%;
  background: $bg
}
</style>
