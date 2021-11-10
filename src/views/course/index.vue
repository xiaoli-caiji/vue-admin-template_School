<template>
  <div class="course-container">
    <el-form ref="quereForm" :model="quereForm">
      <el-form-item prop="AcademicName">
        <!-- <span class="svg-container">
          <svg-icon icon-class="course" />
        </span> -->
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
        <!-- <el-select v-model="quereForm.CourseName" placeholder="请选择课程">
          <el-option
            v-for="(item,index) in courses"
            v-show="showOrNot(item)"
            :key="index"
            :label="item.courseName"
            :value="item.courseName"
          />
        </el-select> -->
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
      <el-table-column label="学分" align="center">
        <template slot-scope="scope">
          {{ scope.row.courseCredit }}
        </template>
      </el-table-column>
      <el-table-column label="学时" align="center">
        <template slot-scope="scope">
          {{ scope.row.courseHour }}
        </template>
      </el-table-column>
      <el-table-column label="授课教师" align="center">
        <template slot-scope="scope">
          {{ scope.row.teachingTeacher }}
        </template>
      </el-table-column>
      <el-table-column label="课程容量" align="center">
        <template slot-scope="scope">
          {{ scope.row.courseCapacity }}
        </template>
      </el-table-column>
      <el-table-column label="选课人数" align="center">
        <template slot-scope="scope">
          {{ scope.row.courseChoosenNumber }}
        </template>
      </el-table-column>
      <el-table-column label="上课时间" align="center">
        <template slot-scope="scope">
          {{ scope.row.courseTime }}
        </template>
      </el-table-column>
      <el-table-column label="选项" align="center">
        <template slot-scope="scope">
          <span v-if="scope.row.choosenOrNot === '已选'">
            <el-button type="text" disabled>已选</el-button>
          </span>
          <span v-else>
            <el-button :id="scope.row.courseCode" @click.native.prevent="chooseCourse(scope.row.courseCode)">选课</el-button>
          </span>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
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
      courses: []
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
      // var that = this
      // var hasAcademic = false
      // var hasCourse = false
      // var hasTeacher = false
      // this.list = []
      // this.courses.forEach(c => {
      //   hasAcademic = false
      //   hasCourse = false
      //   hasTeacher = false
      //   c.academics.some(ca => {
      //     hasAcademic = !that.quereForm.AcademicName || ca === that.quereForm.AcademicName
      //     return hasAcademic === true
      //   })
      //   if (c.TeachingTeacher === that.quereForm.TeachingTeacher || !that.quereForm.TeachingTeacher) {
      //     hasTeacher = true
      //   }
      //   if (c.courseName === that.quereForm.CourseName || !that.quereForm.CourseName) {
      //     hasCourse = true
      //   }
      //   if (hasCourse && hasTeacher && hasAcademic) {
      //     that.list.push(c)
      //   }
      // })
      this.loading = true
      this.$store.dispatch('user/browseCourse', this.quereForm).then(response => {
        this.list = response.data
        console.log(response)
        this.loading = false
      }).catch(() => {
        console.log('err')
        this.loading = false
      })
    },
    chooseCourse(courseCode) {
      this.courseCode = courseCode
      this.loading = true
      this.buttonLoading = true
      var obj = document.getElementById(courseCode)
      console.log(courseCode)
      this.$store.dispatch('user/chooseCourse', this.courseCode).then(response => {
        if (response.type === 200) {
          obj.type = Text
          obj.disabled = true
          this.buttonLoading = false
          obj.innerText = '已选'
        }
        this.loading = false
      }).catch(() => {
        console.log('err')
        this.loading = false
      })
    },
    getAcademicAndCourses() {
      this.$store.dispatch('user/getUnits', this.code).then(response => {
        this.academics = response.data.academic
      })
    }
    // showOrNot(item) {
    //   var show = false
    //   var that = this
    //   item.academics.some(a => {
    //     show = !that.quereForm.AcademicName || a === that.quereForm.AcademicName
    //     return show === true
    //   })
    //   return show
    // }
  }
}
</script>

