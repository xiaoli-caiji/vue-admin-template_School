<template>
  <div class="reportCard-container">
    <div class="reportCard">
      <el-table
        v-loading="listLoading"
        :data="list2"
        element-loading-text="Loading"
        border
        fit
        highlight-current-row
      >
        <el-table-column label="课程名" align="center">
          <template slot-scope="scope">
            {{ scope.row.courseName }}
          </template>
        </el-table-column>
        <el-table-column label="课程编号" align="center">
          <template slot-scope="scope">
            {{ scope.row.courseCode }}
          </template>
        </el-table-column>
        <el-table-column label="学分" align="center">
          <template slot-scope="scope">
            {{ scope.row.courseCredits }}
          </template>
        </el-table-column>
        <el-table-column label="成绩" align="center">
          <template slot-scope="scope">
            {{ scope.row.grades }}
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="fengexian">
      {{ '**********************这是分割线*********************' }}
    </div>
    <div class="requiredCard">
      <el-table
        v-loading="listLoading"
        :data="list"
        element-loading-text="Loading"
        border
        fit
        highlight-current-row
      >
        <el-table-column align="center" label="绩点" prop="gpa" />
        <el-table-column align="center" label="已获得学分" prop="gotGrades" />
        <el-table-column align="center" label="毕业要求学分" prop="requiredGrades" />
      </el-table>
    </div>
  </div>
</template>

<script>

export default {
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
  mounted: function() {
    this.checkReportCard()
  },
  methods: {
    checkReportCard() {
      this.loading = true
      this.$store.dispatch('user/getReportCard').then(response => {
        this.list.push({
          gpa: response.data.gpa,
          gotGrades: response.data.gotGrades,
          requiredGrades: 40
        })
        this.list2 = response.data.course
        console.log(this.list)
        this.loading = false
      }).catch(() => {
        console.log('查询失败！')
        this.loading = false
      })
    }
  }
}
</script>

