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
              <a class="test" @click="gotoNews(scope.row)">{{ '点击预览' }}</a>
            </template>
          </el-table-column>
          <el-table-column label="编辑修改" align="center">
            <template slot-scope="scope">
              <el-button type="text" @click="Edit(scope.row)">编辑</el-button>
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
          <el-table-column label="更改上传" align="center">
            <template slot-scope="scope">
              <el-button type="text" @click="gotoFileEdit(scope.row)">编辑</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
    </el-tabs>
    <div v-if="dialogFormVisible">
      <el-dialog ref="newsEditDialog" :visible.sync="dialogFormVisible" title="编辑" width="auto" @close="dialogFormVisible = false">
        <div style="height:600px; overflow-y:auto;">
          <NewsEditForm v-if="dialogFormVisible" ref="editForm" :current-news="detailOnLine" />
        </div>
      </el-dialog>
    </div>
    <div v-if="dialogFileVisible">
      <el-dialog ref="newsFileDialog" :visible.sync="dialogFileVisible" title="编辑" width="auto" @close="dialogFileVisible = false">
        <div style="height:600px; overflow-y:auto;">
          <NewsFileEdit v-if="dialogFileVisible" ref="fileEditForm" :current-news="detailFile" />
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import NewsEditForm from '@/views/newsManage/newsEdit/index.vue'
import NewsFileEdit from '@/views/newsManage/newsEdit/newsFileEdit.vue'

export default {
  inject: ['reload'],
  components: { NewsEditForm, NewsFileEdit },
  data() {
    return {
      htmlNews: [],
      fileNews: [],
      dialogFormVisible: false,
      dialogFileVisible: false,
      detailOnLine: {},
      detailFile: {}
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
      })
    },
    gotoNews(news) {
      sessionStorage.setItem('currentNews', JSON.stringify(news))
      const url = this.$router.resolve({
        name: '新闻浏览',
        path: 'newsShow'
      })
      window.open(url.href, '_blank')
    },
    gotoFile(url) {
      window.open('https://localhost:13001/' + url)
    },
    Edit(row) {
      this.dialogFormVisible = true
      this.detailOnLine = row
    },
    gotoFileEdit(row) {
      this.dialogFileVisible = true
      this.detailFile = row
    }
  }
}
</script>
