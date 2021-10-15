<template>
  <div class="courseList">
    <el-tabs v-model="courseName" type="card" @click="handleClick(courseName)">
      <el-tab-pane
        v-for="(item, index) in courseName"
        :key="index"
        :label="item"
      >
        <!-- {{ '内容' }} -->
        <el-form ref="writeInForm" :model="writeInForm">
          <el-table
            :data="studentList"
            border
            fit
            highlight-current-row
          >
            <el-table-column align="center" label="学生姓名">
              <template slot-scope="scope">
                  {{ scope.row[index].name }}
              </template>
            </el-table-column>
            <el-table-column align="center" label="学生编号">
              <template slot-scope="scope">
                  {{ scope.row.userCode }}
              </template>
            </el-table-column>
            <el-table-column align="center" label="成绩">
              <el-input type="text" ref="reportCard[index]" />
            </el-table-column>
          </el-table>
        </el-form>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>

export default {
  data() {
    return {
      writeInForm: {
        reportCard: []
      },
      courseName: [],
      studentList: []
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
    this.getStudentAndCourse()
  },
  methods: {
    // handleClick(courseName) {
    //     if()

    // },
    getStudentAndCourse() {
      this.$store.dispatch('user/getStudentAndCourse').then(response => {
        console.log(response.data)
        this.courseName = response.data.courses
        this.courseName.forEach(c => {
          response.data.courseAndStudents.forEach(cas => {
            if (c === cas.courseName) {
              this.studentList = cas.students
              console.log(this.studentList)
            }
          })
        })
      }).catch(() => {
        console.log('请求失败！')
      })
    }
  }

}
</script>
