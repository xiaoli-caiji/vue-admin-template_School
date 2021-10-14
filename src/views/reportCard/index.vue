<template>
  <div class="reportCard-container">    
    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      border
      lazy
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
          {{ scope.row.courseCredit }}
        </template>
      </el-table-column>
      <el-table-column label="成绩" align="center">
        <template slot-scope="scope">
          {{ scope.row.Grades }}
        </template>
      </el-table-column>   
    </el-table>
    <div>
        <el-card aria-label="已获得学分">
            <template slot-scope="scope">
                {{ scope.GetGrades }}
            </template>
        </el-card>
    </div>
  </div>
</template>

<script>
// import user from '@/store/modules/user'

export default {
  // el: '#App',
  name: 'Course',
  data() {
    return {
      quereForm: {
        AcademicName: '信通',
        CourseName: '',
        TeachingTeacher: '',
        buttonLoading: false
      },
      list: [],
      listLoading: false,
      courseCode: ''
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
  methods: {
    quere() {
      this.loading = true
      this.$store.dispatch('user/browseCourse', this.quereForm).then(response => {
        this.list = response.data
        this.loading = false
      }).catch(() => {
        console.log('err')
        this.loading = false
      })
    }
  }
}
</script>

