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
              {{ scope.raw.newsName }}
            </template>
          </el-table-column>
          <el-table-column label="封面类型" align="center">
            <template slot-scope="scope">
              {{ scope.raw.newsCoverType }}
            </template>
          </el-table-column>
          <el-table-column label="网址" align="center">
            <template slot-scope="scope">
              {{ scope.raw.NewsContentAddress }}
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
              {{ scope.raw.newsName }}
            </template>
          </el-table-column>
          <el-table-column label="封面类型" align="center">
            <template slot-scope="scope">
              {{ scope.raw.newsCoverType }}
            </template>
          </el-table-column>
          <el-table-column label="网址" align="center">
            <template slot-scope="scope">
              {{ scope.raw.NewsContentAddress }}
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
  }
}
</script>
