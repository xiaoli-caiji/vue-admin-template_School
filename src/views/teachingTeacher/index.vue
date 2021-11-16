<template>
  <div class="teachingTeacher-container">
    <div class="teachingTeacher-text">name: {{ name }} </div>
    <div class="report">
      <el-button @click.native.prevent="gotoReportCard">录入成绩</el-button>
    </div>

  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'TeachingTeacherIndex',
  computed: {
    ...mapGetters([
      'name', 'code', 'role'
    ])
  },
  methods: {
    gotoReportCard() {
      this.$router.push({ path: 'writeIn' })
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
