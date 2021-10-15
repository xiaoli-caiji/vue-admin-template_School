<template>
  <div class="reportCard-container">
    <el-table
      v-loading="listLoading"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
    >
      <my-slot>
        <el-table-column label="课程名" align="center">
          <template slot-scope="scope">
            {{ scope.courseName.row }}
          </template>
        </el-table-column>
      </my-slot>
      <!-- <el-table-column label="课程编号" align="center">
        <template slot-scope="scope">
          {{ scope.row.courseCode }}
        </template>
      </el-table-column>
      <el-table-column label="学分" align="center">
        <template slot-scope="scope">
          {{ scope.row.courseCredit }}
        </template>
      </el-table-column>
      <el-table-column label="成绩" align="center">
        <template slot-scope="scope">
          {{ scope.row.Grades }}
        </template>
      </el-table-column> -->
    </el-table>
    <!-- <div>
      <el-card aria-label="已获得学分">
        <template slot-scope="scope">
          {{ scope.row.GetGrades }}
        </template>
      </el-card>
    </div> -->
  </div>
</template>

<script>

import mySlot from './mySlot'
import MySlot from './mySlot.vue'

export default {
  // el: '#App',
  name: 'Course',
  data() {
    return {
      list: [],
      list2: [],
      listLoading: false
    }
  },
  watch: {
    $route: {
      handler: function(route) {
        this.redirect = route.query && route.query.redirect
      },
      immediate: true
    }
  },
  components: {
    mySlot
  }
  // mounted: function() {
  //   this.checkReportCard()
  // },
  // methods: {
  //   checkReportCard() {
  //     this.loading = true
  //     this.$store.dispatch('user/getReportCard').then(response => {
  //       this.list = response.data
  //       this.list2 = response.data.courseName
  //       console.log(this.list2)
  //       this.loading = false
  //     }).catch(() => {
  //       console.log('查询失败！')
  //       this.loading = false
  //     })
  //   }
  // }
}
</script>

