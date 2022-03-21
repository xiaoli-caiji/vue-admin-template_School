<template>
  <div class="officeTeacher-container">
    <div class="officeTeacher-text">name: {{ name }} </div>
    <div>
      <el-tabs @tab-click="getRounds">
        <el-tab-pane
          v-for="(item, index) in courseListRounds"
          ref="rounds"
          :key="index"
          :label="item"
        >
          <el-table
            :data="courseList"
            border
            lazy
            fit
            highlight-current-row
            @selection-change="handleSelectionChange"
          >
            <el-table-column v-if="chooseRounds !== null" type="selection" />
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
            <el-table-column :label="chooseRounds === '1'?'选课人数':'剩余名额'" align="center" width="75px">
              <template slot-scope="scope">
                <span v-if="chooseRounds === '1'">
                  {{ scope.row.courseChoosenNumber }}
                </span>
                <span v-else>
                  {{ scope.row.courseCapacity - scope.row.courseSelectionNumber }}
                </span>
              </template>
            </el-table-column>
            <el-table-column label="中签人数" align="center" width="75px">
              <template slot-scope="scope">
                {{ scope.row.courseSelectionNumber }}
              </template>
            </el-table-column>
            <el-table-column label="课程状态" align="center">
              <template slot-scope="scope">
                <span v-if="scope.row.courseState === null && chooseRounds != null">
                  {{ '等待开启选课' }}
                </span>
                <span v-else-if="chooseRounds === null">
                  {{ '第二轮选课进行中' }}
                </span>
                <span v-else>
                  {{ scope.row.courseState }}
                </span>
              </template>
            </el-table-column>
          </el-table>
          <el-button v-if="chooseRounds !== null" :disabled="courseSelectionOpenList.length!==0?false:true" @click="courseSelectionOpen()">开启选课</el-button>
          <el-button v-if="chooseRounds === null" @click="courseSelectionClose()">关闭所有选课</el-button>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'CourseChooseController',
  inject: ['reload'],
  data() {
    return {
      courseList: [],
      courseListRoundOne: [],
      courseListRoundTwo: [],
      courseListRoundEnd: [],
      courseListRounds: [
        '第一轮选课',
        '第二轮选课',
        '第二轮选课进行中'
      ],
      chooseRounds: '第一轮选课',
      courseSelectionOpenList: []
    }
  },
  computed: {
    ...mapGetters([
      'name', 'code', 'role'
    ])
  },
  mounted: function() {
    this.getCourses()
  },
  methods: {
    getCourses() {
      this.$store.dispatch('user/getCoursesByTeacher').then(response => {
        this.courseListRoundOne = response.data.One
        this.courseListRoundTwo = response.data.Two
        this.courseListRoundEnd = response.data.End
        this.getCourseList(this.chooseRounds)
      })
    },
    getCourseList(chooseRounds) {
      var that = this
      switch (chooseRounds) {
        case '第一轮选课':
          that.courseList = that.courseListRoundOne
          that.chooseRounds = '1'
          break
        case '第二轮选课':
          that.courseList = that.courseListRoundTwo
          that.chooseRounds = '2'
          break
        case '第二轮选课进行中':
          that.courseList = that.courseListRoundEnd
          that.chooseRounds = null
          break
      }
    },
    getRounds(tab) {
      this.getCourseList(tab.label)
    },
    handleSelectionChange(val) {
      this.courseSelectionOpenList = []
      console.log(val)
      val.forEach(v => {
        this.courseSelectionOpenList.push(v.courseCode)
      })
    },
    courseSelectionOpen() {
      const data = { ChooseRounds: this.chooseRounds, CourseCode: this.courseSelectionOpenList }
      this.$store.dispatch('user/winCourse', data).then(response => {
        for (var i = 0; i < this.courseList.length; i++) {
          if (response.data[i] === '课程筛选完成！' || response.data[i] === '课程筛选失败！请重试！') {
            this.courseList[i].courseState = response.data[i]
          }
        }
        this.reload()
      })
    },
    courseSelectionClose() {
      this.$store.dispatch('user/courseSelectionClose').then(response => {
        this.reload()
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
