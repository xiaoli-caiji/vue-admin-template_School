<template>
  <div class="courseList">
    <el-tabs type="card">
      <el-tab-pane
        v-for="(item, index) in studentList"
        :key="index"
        :label="item.courseName"
      >
        <!-- {{ '内容' }} -->
        <el-form ref="writeInForm" :model="writeInForm" @submit.native.prevent>
          <el-table
            :data="item.students"
            border
            fit
            highlight-current-row
          >
            <el-table-column align="center" label="学生姓名">
              <template slot-scope="scope">
                {{ scope.row.name }}
              </template>
            </el-table-column>
            <el-table-column align="center" label="学生编号">
              <template slot-scope="scope">
                {{ scope.row.userCode }}
              </template>
            </el-table-column>
            <el-table-column align="center" label="成绩">
              <template slot-scope="scope">
                <el-input
                  ref="grades"
                  v-model="gradesObj[item.courseName+scope.row.userCode]"
                  type="number"
                />
              </template>
            </el-table-column>
          </el-table>
          <el-button @click.native.prevent="inputReportCard(index)">录入</el-button>
        </el-form>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>

export default {
  data() {
    return {
      writeInForm: {},
      studentList: [],
      gradesObj: {},
      grades: []
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
    getStudentAndCourse() {
      this.$store.dispatch('user/getStudentAndCourse').then(response => {
        this.studentList = response.data.courseAndStudents
        // console.log(this.studentList)
      }).catch(() => {
        console.log('请求失败！')
      })
    },
    inputReportCard(index) {
      // this.writeInForm
      var item = this.studentList[index]
      this.grades = []
      item.students.forEach(element => {
        this.grades.push(
          {
            CourseName: item.courseName,
            StudentCode: element.userCode,
            StudentName: element.name,
            Grades: this.gradesObj[item.courseName + element.userCode]
          }
        )
      })
      this.$store.dispatch('user/WriteInReportCard', this.grades).then(response => {
        console.log(response)
      }).catch(() => {
        console.log('录入失败！')
      })
    }
  }

}
</script>
