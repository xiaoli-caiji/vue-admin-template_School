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
      var t = currentNews.newsWriteTime
      var str = t.indexOf('T')
      t = t.replace(t.substring(str, str + 1), '\u00a0')
      console.log(t)
      this.newsEditTime = t
      this.newsEditer = currentNews.newsWriter
      this.newsContent = currentNews.newsContent
    }
  }
}
</script>
