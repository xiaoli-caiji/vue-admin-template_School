<template>
  <div class="course-container">
    <el-form ref="quereForm" :model="quereForm">
      <el-form-item prop="AcademicName">
        <el-select v-model="quereForm.AcademicName" placeholder="请选择学院">
          <el-option
            v-for="(item,index) in academics"
            :key="index"
            :label="item"
            :value="item"
          />
        </el-select>
      </el-form-item>
      <el-form-item prop="CourseName">
        <el-input
          ref="CourseName"
          v-model="quereForm.CourseName"
          placeholder="课程名"
          type="text"
          tabindex="2"
          auto-complete="on"
        />
      </el-form-item>
      <el-form-item prop="TeachingTeacher">
        <span class="svg-container">
          <svg-icon icon-class="course" />
        </span>
        <el-input
          ref="TeachingTeacher"
          v-model="quereForm.TeachingTeacher"
          placeholder="授课老师"
          name="TeachingTeacher"
          type="text"
          tabindex="3"
          auto-complete="on"
        />
      </el-form-item>
    </el-form>
    <el-button @click.native.prevent="quere">查询课表</el-button>
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
      <el-table-column label="选课人数" align="center" width="75px">
        <template slot-scope="scope">
          {{ scope.row.courseChoosenNumber }}
        </template>
      </el-table-column>
      <el-table-column label="上课时间" align="center">
        <template slot-scope="scope">
          {{ scope.row.courseTime }}
        </template>
      </el-table-column>
      <el-table-column label="选课百分比" align="center">
        <template slot-scope="scope">
          <div v-if="scope.row.choosenOrNot === '已选'">
            {{ scope.row.percentage }}
          </div>
          <el-input
            v-if="scope.row.choosenOrNot === '未选'"
            v-model="percentage[scope.row.courseCode]"
            type="number"
            :disabled="scope.row.percentageLeft===0?true:false"
            :placeholder="scope.row.percentageLeft>0?'最大值为' + scope.row.percentageLeft:'已没有百分比数，无法选课！' "
          />
        </template>
      </el-table-column>
      <el-table-column label="选项" align="center">
        <template slot-scope="scope">
          <span v-if="scope.row.choosenOrNot === '已选'">
            <el-button type="text" disabled>已选</el-button>
          </span>
          <span v-else-if="scope.row.choosenOrNot === '未选' && scope.row.percentageLeft === 0">
            <el-button @click="gotoCourseChoosenList()">去管理选课</el-button>
          </span>
          <span v-else>
            <el-button :id="scope.row.courseCode" @click.native.prevent="chooseCourse(scope)">选课</el-button>
          </span>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import ElementUI from 'element-ui'
import { mapGetters } from 'vuex'

export default {
  name: 'Course',
  inject: ['reload'],
  data() {
    return {
      quereForm: {
        AcademicName: '',
        CourseName: '',
        TeachingTeacher: '',
        buttonLoading: false
      },
      list: [],
      listLoading: false,
      courseCode: '',
      academics: [],
      courses: [],
      percentage: {}
    }
  },
  computed: {
    ...mapGetters([
      'code'
    ])
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
    this.getAcademicAndCourses()
  },
  methods: {
    quere() {
      this.loading = true
      this.$store.dispatch('user/browseCourse', this.quereForm).then(response => {
        this.list = response.data
        console.log(this.list)
        this.loading = false
      }).catch(() => {
        console.log('err')
        this.loading = false
      })
    },
    chooseCourse(scope) {
      this.courseCode = scope.row.courseCode
      this.loading = true
      this.buttonLoading = true
      var obj = document.getElementById(scope.row.courseCode)
      if (this.percentage[scope.row.courseCode] <= scope.row.percentageLeft && this.percentage[scope.row.courseCode] >= 1) {
        const data = { CourseCode: this.courseCode, UserCode: this.code, Percentage: this.percentage[this.courseCode] }
        this.$store.dispatch('user/chooseCourse', data).then(response => {
          if (response.type === 200) {
            obj.type = Text
            obj.disabled = true
            this.buttonLoading = false
            this.quere()
            // obj.innerText = '已选'
          }
          this.loading = true
        }).catch(() => {
          console.log('err')
          this.loading = false
        })
      } else {
        // obj.innerText = '请输入正确的百分比！'
        ElementUI.Message.error('选课失败！请输入正确的百分比！')
        // ElementUI.Message.info()
      }
    },
    getAcademicAndCourses() {
      this.$store.dispatch('user/getUnits', this.code).then(response => {
        this.academics = response.data.academic
      })
    },
    gotoCourseChoosenList() {
      this.$router.push('choosenCourses')
    }
  }
}
</script>

