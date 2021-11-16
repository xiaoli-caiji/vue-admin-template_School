<template>
  <div class="student-container">
    <div>
      <div style="float: left">
        <img :src="headImg" width="100px" height="auto">
      </div>
      <div class="student-text" style="float: right">
        <p>姓名: {{ name }}</p>
        <p>学号: {{ code }}</p>
        <p>学院: {{ academic }}</p>
        <p>学制: {{ education }}</p>
      </div>
    </div>
    <div>
      <el-button @click.native.prevent="browseCourse">
        <svg-icon icon-class="notebook" />
        {{ '查选课' }}
      </el-button>
      <el-button @click.native.prevent="getReportCard">
        <svg-icon icon-class="clipboard" />
        {{ '成绩单查询' }}
      </el-button>
      <el-button @click.native.prevent="getCourses">
        <svg-icon icon-class="calculator" />
        {{ '已选课表查看' }}
      </el-button>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'StudentIndex',
  data() {
    return {
      education: '',
      academic: ''
    }
  },
  computed: {
    ...mapGetters([
      'name', 'code', 'role', 'headImg'
    ])
  },
  mounted: function() {
    this.getStudentInfo()
  },
  methods: {
    browseCourse() {
      this.loading = true
      this.$router.push({ path: 'browseAndChooseCourse' })
      // var log = await this.$store.dispatch('user/login', this.loginForm)
    },
    getReportCard() {
      this.$router.push({ path: 'reportCard' })
    },
    getCourses() {
      this.$router.push({ path: 'choosenCourses' })
    },
    getStudentInfo() {
      console.log(this.code)
      var that = this
      var educationNum = this.code.substring(4, 6)
      var academicNum = this.code.substring(6, 8)
      // var classNum = this.code.substring(8, 10)
      switch (educationNum) {
        case '21':
          that.education = '学硕全日制'
          break
        case '22':
          that.education = '专硕全日制'
          break
        case '52':
          that.education = '专硕非全日制'
          break
        case '23':
          that.education = '硕博连读'
          break
      }
      const numAndAcademic = new Map([
        ['01', '信息与通信工程学院'],
        ['02', '电子科学与工程学院'],
        ['03', '机械与电气工程学院'],
        ['04', '航空航天学院'],
        ['05', '资源与环境学院'],
        ['06', '计算机科学与工程学院'],
        ['07', '经济与管理学院'],
        ['08', '信息与软件工程学院'],
        ['09', '自动化工程学院'],
        ['10', '通信抗干扰技术国家级重点实验室'],
        ['11', '物理学院']
      ])
      this.academic = numAndAcademic.get(academicNum)
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
