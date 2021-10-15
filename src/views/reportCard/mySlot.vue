<template>
  <div>
    <slot v-bind="courseName">
        {{ courseName.data }}
    </slot>
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
      requiredGrades: 0,
    };
  },
  mounted: function () {
    this.checkReportCard();
  },
  methods: {
    checkReportCard() {
      this.loading = true;
      this.$store
        .dispatch("user/getReportCard")
        .then((response) => {
          this.list = response.data;
          this.list2 = response.data.courseName;
          console.log(this.list2);
          this.loading = false;
        })
        .catch(() => {
          console.log("查询失败！");
          this.loading = false;
        });
    },
  },
};
</script>
