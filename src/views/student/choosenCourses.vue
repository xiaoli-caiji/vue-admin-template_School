<template>
  <div>
    <div><h3>已选课程</h3></div>
    <div>
      <el-tabs type="card">
        <el-tab-pane label="选课列表查看">
          <el-table
            :data="list"
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
            <el-table-column label="开课学院" align="center">
              <template slot-scope="scope">
                {{ scope.row.academics.join('、') }}
              </template>
            </el-table-column>
            <el-table-column label="学分" align="center" width="75px">
              <template slot-scope="scope">
                {{ scope.row.courseCredit }}
              </template>
            </el-table-column>
            <el-table-column label="学时" align="center" width="75px">
              <template slot-scope="scope">
                {{ scope.row.courseHour }}
              </template>
            </el-table-column>
            <el-table-column label="授课教师" align="center" width="75px">
              <template slot-scope="scope">
                {{ scope.row.teachingTeacher }}
              </template>
            </el-table-column>
            <el-table-column label="课程容量" align="center" width="75px">
              <template slot-scope="scope">
                {{ scope.row.courseCapacity }}
              </template>
            </el-table-column>
            <el-table-column label="选课状态" align="center" width="75px">
              <template slot-scope="scope">
                <span v-if="scope.row.courseState.indexOf('未') !== -1">
                  {{ '未中签' }}
                </span>
                <span v-else-if="scope.row.courseState === '等待结果'">
                  {{ '等待第一轮结果' }}
                </span>
                <span v-else-if="scope.row.courseState === '等待结果2'">
                  {{ '等待第二轮结果' }}
                </span>
                <span v-else>
                  {{ '中签' }}
                </span>
              </template>
            </el-table-column>
            <el-table-column label="上课时间" align="center">
              <template slot-scope="scope">
                {{ scope.row.courseTime }}
              </template>
            </el-table-column>
            <el-table-column label="选课百分比" align="center">
              <template slot-scope="scope">
                <div v-if="!editPercentageOrNot[scope.row.courseCode]" @click="editPercentage(scope)">
                  {{ scope.row.percentage }}
                </div>
                <el-input
                  v-if="editPercentageOrNot[scope.row.courseCode]"
                  :key="scope.row.courseCode"
                  :ref="'ipt'+scope.row.courseCode"
                  v-model="scope.row.percentage"
                  type="number"
                  :placeholder="'最大值为'+percentageLeft"
                  @change="countPercentage(scope)"
                  @blur="hiddenEdit(scope)"
                />
              </template>
            </el-table-column>
            <el-table-column label="选项" align="center">
              <template slot-scope="scope">
                <el-button v-if="scope.row.courseState.indexOf('未') === -1" @click.native.prevent="deleteCourse(scope.row.courseCode)">删除选课</el-button>
              </template>
            </el-table-column>
          </el-table>
          <el-button v-if="percentageShow" @click.native.prevent="modifyPercentage()">修改选课</el-button>
        </el-tab-pane>
        <el-tab-pane label="选课课表查看">
          <table border="1" cellspacing="0" width="800px" height="600px">
            <tbody>
              <tr>
                <td colspan="8" position="fixed">
                  <div>
                    <svg-icon icon-class="左箭头" @click="diminishing" />
                    {{ topTitle }}
                    <svg-icon icon-class="右箭头" @click="increasing" />
                  </div>
                  <div style="font-size:15px;color:red;line-height:5">
                    {{ '注：黑色表示已中签，橙色表示等待结果或者第一轮未中签，红色表示未中签' }}
                  </div>
                </td>
              </tr>
              <tr v-for="(count, rows) in weekCourses" :key="rows">
                <td v-for="(weekday, cols) in weekCourses" :key="cols" width="100px" height="80px">
                  <div v-html="weekCourses[rows][cols]" />
                </td>
              </tr>
            </tbody>
          </table>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
const classCount = ['1-2', '3-4', '5-6', '7-8', '9-11']
export default {
  inject: ['reload'],
  data() {
    return {
      percentageShow: {},
      nowPercent: 0,
      percentageLeft: 100,
      percentageList: {},
      editPercentageOrNot: {},
      modifyPercentageList: [],
      list: [],
      Timetable: {
        weekdays: [
          '周一',
          '周二',
          '周三',
          '周四',
          '周五',
          '周六',
          '周日'
        ],
        classCount: classCount
      },
      listLoading: false,
      // 定每年上半学期为9.1-1.16；
      // 每年下半学期为2.21-7.10;
      minSchoolYear: '',
      maxSchoolYear: '',
      semester: '',
      weekNumber: 0,
      now: new Date(),
      topTitle: '',
      weekCourses: [
        ['节数', '周一', '周二', '周三', '周四', '周五', '周六', '周日'],
        ['1-2'],
        ['3-4'],
        ['5-6'],
        ['7-8'],
        ['9-11']
      ]
    }
  },
  computed: {
    ...mapGetters([
      'code'
    ])
  },
  mounted: function() {
    this.getSchoolDay(this.now)
    this.getCourses()
    this.courseFilter()
  },
  methods: {
    getSchoolDay(now) {
      var year = now.getFullYear()
      var month = now.getMonth() + 1
      var day = now.getDate()
      if (month >= 9 || (month === 1 && day <= 16)) {
        var startWeek1 = 0
        var passDays1 = 0
        if (month >= 9) {
          this.minSchoolYear = year.toString()
          this.maxSchoolYear = (year + 1).toString()
          startWeek1 = new Date(year.toString() + '/09/01').getDay()
          passDays1 = Math.ceil((now - new Date(year.toString() + '/09/01')) / (24 * 60 * 60 * 1000)) - (7 - startWeek1 + 1)
        } else {
          this.minSchoolYear = (year - 1).toString()
          this.maxSchoolYear = year.toString()
          startWeek1 = new Date(year.toString() + '/09/01').getDay()
          passDays1 = Math.ceil((now - new Date(year.toString() + '/09/01')) / (24 * 60 * 60 * 1000)) - (7 - startWeek1 + 1 - 365.25)
        }
        this.semester = '上'
        this.weekNumber = Math.ceil(passDays1 / 7) + 1
        this.topTitle = '第' + this.weekNumber + '周    ' + this.minSchoolYear + '-' + this.maxSchoolYear + '学年' + this.semester + '半学期'
      } else if ((month < 7 && month > 2) || (month === 7 && day <= 10) || (month === 2 && day >= 21)) {
        this.minSchoolYear = (year - 1).toString()
        this.maxSchoolYear = year
        this.semester = '下'
        var startWeek2 = new Date(year.toString() + '/02/21').getDay()
        var passDays2 = Math.ceil((now - new Date(year.toString() + '/02/21')) / (24 * 60 * 60 * 1000)) - (7 - startWeek2 + 1)
        this.weekNumber = Math.ceil(passDays2 / 7) + 1
        this.topTitle = '第' + this.weekNumber + '周    ' + this.minSchoolYear + '-' + this.maxSchoolYear + '学年' + this.semester + '半学期'
      } else {
        this.topTitle = '假期ing'
        this.weekNumber = 0
      }
    },
    getCourses() {
      var that = this
      this.$store.dispatch('user/getCourses', this.code).then(response => {
        this.list = response.data
        console.log(this.list)
        // var hasState = Boolean(true)
        // 只要有一个课程的状态不是等待结果，就表示第一轮选课开始
        // 这时任何课程的百分比都不能被修改
        // this.list.every(c => {
        //   hasState = c.courseState === '等待结果'
        //   return hasState !== true
        // })
        // if (hasState === true) {
        //   this.list.forEach(c => {
        //     that.editPercentageOrNot[c.courseCode] = false
        //   })
        // }
        response.data.forEach(c => {
          that.percentageLeft -= c.percentage
        })
        console.log(this.list)
      })
    },
    courseFilter() {
      var that = this
      this.weekCourses = [
        ['节数', '周一', '周二', '周三', '周四', '周五', '周六', '周日'],
        ['1-2'],
        ['3-4'],
        ['5-6'],
        ['7-8'],
        ['9-11']
      ]
      this.list.forEach(course => {
        var courseTime = course.courseTime.split('，')
        var weeks = courseTime[0].substring(0, courseTime[0].indexOf('周')).split('-')
        var weekdays = courseTime[1]
        var courseCount = courseTime[2].substring(0, courseTime[2].indexOf('节'))
        var hasWeek = false

        if (weeks[0] <= that.weekNumber && weeks[1] >= that.weekNumber) {
          hasWeek = true
        }
        for (var i = 1; i <= 5; i++) {
          for (var j = 1; j <= 7; j++) {
            if (hasWeek && weekdays.indexOf(that.weekCourses[0][j]) !== -1 && courseCount === that.weekCourses[i][0]) {
              // that.weekCourses[i][j] = course.courseName
              var htmltxt = ''
              if (course.courseState === '等待结果' || course.courseState === '未中签1') {
                htmltxt = '<span style="color:orange;">' + course.courseName + '</span>'
              } else if (course.courseState === '未中签2') {
                htmltxt = '<span style="color:red;">' + course.courseName + '</span>'
              } else {
                htmltxt = '<span style="color:black;">' + course.courseName + '</span>'
              }
              that.weekCourses[i][j] = htmltxt
            }
          }
        }
      })
    },
    editPercentage(scope) {
      this.nowPercent = scope.row.percentage
      this.percentageLeft += scope.row.percentage
      this.editPercentageOrNot = {}
      if (scope.row.courseState === '等待结果') {
        this.editPercentageOrNot[scope.row.courseCode] = true
      }
    },
    countPercentage(scope) {
      this.percentageLeft -= scope.row.percentage
    },
    hiddenEdit(scope) {
      this.editPercentageOrNot[scope.row.courseCode] = false
      if (this.percentageList[scope.row.courseCode] !== undefined) {
        this.percentageLeft -= this.percentageList[scope.row.courseCode]
        scope.row.percentage = this.percentageList[scope.row.courseCode]
      }
    },
    modifyPercentage() {
      var that = this
      if (this.percentageLeft >= 0) {
        this.list.forEach(c => {
          this.modifyPercentageList.push({
            CourseCode: c.courseCode,
            UserCode: that.code,
            Percentage: c.percentage
          })
        })
        this.$store.dispatch('user/modifyPercentage', this.modifyPercentageList).then(response => {
          that.reload()
        })
      }
    },
    deleteCourse(courseCode) {
      var that = this
      const data = { courseCode: courseCode, userCode: this.code }
      this.$store.dispatch('user/deleteCourse', data).then(response => {
        that.reload()
      })
    },
    diminishing() {
      var moment = require('moment')
      this.now = new Date(moment(this.now.toString()).subtract(7, 'days'))
      this.getSchoolDay(this.now)
      this.courseFilter()
    },
    increasing() {
      var moment = require('moment')
      this.now = new Date(moment(this.now.toString()).add(7, 'days'))
      this.getSchoolDay(this.now)
      this.courseFilter()
    }
  }
}
</script>
