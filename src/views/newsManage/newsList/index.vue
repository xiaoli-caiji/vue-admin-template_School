<template>
  <div>
    <el-tabs>
      <el-tab-pane label="HTML稿件">
        <el-table
          :data="htmlNews"
          border
          lazy
          fit
          highlight-current-row
        >
          <el-table-column label="标题" align="center">
            <template slot-scope="scope">
              {{ scope.row.newsName }}
            </template>
          </el-table-column>
          <el-table-column label="类型" align="center">
            <template slot-scope="scope">
              {{ scope.row.newsType.newsTypeName }}
            </template>
          </el-table-column>
          <el-table-column label="封面类型" align="center">
            <template slot-scope="scope">
              {{ scope.row.newsCoverType }}
            </template>
          </el-table-column>
          <el-table-column label="点击网址查看" align="center">
            <template slot-scope="scope">
              <a class="test" @click="gotoNews(scope.row.newsContentAddress)">{{ 'https://localhost:13001/'+scope.row.newsContentAddress }}</a>
            </template>
          </el-table-column>
          <el-table-column label="详情" align="center">
            <template slot-scope="scope">
              <a @click="gotoEdit(scope.row)">编辑</a>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="用户上传">
        <el-table
          :data="fileNews"
          border
          lazy
          fit
          highlight-current-row
        >
          <el-table-column label="标题" align="center">
            <template slot-scope="scope">
              {{ scope.row.newsName }}
            </template>
          </el-table-column>
          <el-table-column label="类型" align="center">
            <template slot-scope="scope">
              {{ scope.row.newsType.newsTypeName }}
            </template>
          </el-table-column>
          <el-table-column label="封面类型" align="center">
            <template slot-scope="scope">
              {{ scope.row.newsCoverType }}
            </template>
          </el-table-column>
          <el-table-column label="点击网址下载" align="center">
            <template slot-scope="scope">
              <a @click="gotoFile(scope.row.newsFileAddress)">{{ 'https://localhost:13001/'+scope.row.newsFileAddress }}</a>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>

export default {
  data() {
    return {
      htmlNews: [],
      fileNews: []
    }
  },
  mounted: function() {
    this.getNews()
  },
  methods: {
    getNews() {
      this.$store.dispatch('user/getNews').then(response => {
        this.htmlNews = response.data.htmlNews
        this.fileNews = response.data.fileNews
        console.log(response.data)
      })
    },
    gotoNews(s) {
      window.open('https://localhost:13001/' + s)
    },
    gotoFile(url) {
      window.open('https://localhost:13001/' + url)
    },
    gotoEdit(news) {
      this.$router.push({
        path: 'newsUpload',
        name: '新闻撰写',
        params: {
          key: 'currentNews',
          value: news
        }
      })
    }
  }
}
</script>
