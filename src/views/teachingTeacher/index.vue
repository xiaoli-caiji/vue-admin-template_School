<template>
  <div class="teachingTeacher-container">
    <div class="teachingTeacher-text">name: {{ name }} </div>
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
