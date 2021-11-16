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
            :data="item.courseAndStudents"
            border
            fit
            highlight-current-row
          >
            <el-table-column align="center" label="学生姓名">
              <template slot-scope="scope">
                {{ scope.row.studentName }}
              </template>
            </el-table-column>
            <el-table-column align="center" label="学生编号">
              <template slot-scope="scope">
                {{ scope.row.studentCode }}
              </template>
            </el-table-column>
            <el-table-column align="center" label="成绩">
              <template slot-scope="scope">
                <div v-if="!editOrNot[item.courseName+scope.row.studentCode]" @click="switchEdit(item, scope)">
                  {{ scope.row.report }}
                </div>
                <el-input
                  v-if="editOrNot[item.courseName+scope.row.studentCode]"
                  id="inputReport"
                  ref="grades"
                  v-model="gradesObj[item.courseName+scope.row.studentCode]"
                  type="number"
                  @blur="hiddenEdit(item, scope)"
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
  inject: ['reload'],
  data() {
    return {
      writeInForm: {},
      studentList: [],
      gradesObj: {},
      grades: [],
      editOrNot: {}
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
        this.studentList = response.data
      }).catch(() => {
        console.log('请求失败！')
      })
    },
    inputReportCard(index) {
      var item = this.studentList[index]
      this.grades = []
      item.courseAndStudents.forEach(element => {
        if (this.gradesObj[item.courseName + element.studentCode]) {
          this.grades.push({
            CourseName: item.courseName,
            StudentCode: element.studentCode,
            StudentName: element.studentName,
            Grades: this.gradesObj[item.courseName + element.studentCode]
          })
        }
      })
      this.$store.dispatch('user/WriteInReportCard', this.grades).then(response => {
        this.reload()
        console.log(response)
      }).catch(() => {
        console.log('录入失败！')
      })
    },
    switchEdit(item, scope) {
      this.editOrNot[item.courseName + scope.row.studentCode] = true
    },
    hiddenEdit(item, scope) {
      scope.row.report = this.gradesObj[item.courseName + scope.row.studentCode]
      this.editOrNot = {}
    }
  }

}
</script>
