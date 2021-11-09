<template>
  <div class="student-container">
    <div class="student-text">name: {{ name }} </div>
    <pre />
    <div>
      <el-button @click.native.prevent="browseCourse">
        {{ '查选课' }}
      </el-button>
      <el-button @click.native.prevent="getReportCard">
        {{ '成绩单查询' }}
      </el-button>
      <el-button @click.native.prevent="getCourses">
        {{ '已选课表查看' }}
      </el-button>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'StudentIndex',
  computed: {
    ...mapGetters([
      'name', 'code', 'role'
    ])
  },
  methods: {
    browseCourse() {
      this.loading = true
      this.$router.push({ path: '/course' })
      // var log = await this.$store.dispatch('user/login', this.loginForm)
    },
    getReportCard() {
      this.$router.push({ path: '/reportcard' })
    },
    getCourses() {
      this.$router.push({ path: 'choosenCourses' })
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
