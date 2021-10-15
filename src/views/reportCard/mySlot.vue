<template>
  <div>
    <slot :courseName="courseName" name="courseName">
    </slot>
  </div>
</template>

<script>
export default {
  data() {
    return {
      courseName: [],
      courseCode: [],
      courseCredits: [],
      gotGrades: 0,
      gpa: 0,
      grades: [],
      requiredGrades: 0
    }
  },
  mounted: function() {
    this.checkReportCard()
  },
  methods: {
    checkReportCard() {
      this.loading = true
      this.$store.dispatch('user/getReportCard').then((response) => {
        this.courseName = response.data.courseName
        console.log(this.courseName)
        this.loading = false
      }).catch(() => {
        console.log('查询失败!')
        this.loading = false
      })
    }
  }
}
</script>
