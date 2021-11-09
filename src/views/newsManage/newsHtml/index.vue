<template>
  <div>
    <h3>{{ newsTitle }}</h3>
    <p>
      编辑时间：<a>{{ newsEditTime }}</a>
      <a>{{ '&nbsp;' }}</a>
      作者：<a>{{ newsEditer }}</a>
    </p>
    <div v-html="newsContent" />
  </div>
</template>

<script>
// import axios from 'axios'

export default {
  data() {
    return {
      newsTitle: '',
      newsEditTime: '',
      newsEditer: '',
      newsContent: ''
    }
  },
  mounted: function() {
    this.showNews()
  },
  methods: {
    showNews() {
      var currentNews = JSON.parse(window.opener.sessionStorage.getItem('currentNews'))
      this.newsTitle = currentNews.newsName
      this.newsEditTime = currentNews.newsWriteTime
      this.newsEditer = currentNews.newsWriter
      this.newsContent = currentNews.newsContent
    }
  }
}
</script>
