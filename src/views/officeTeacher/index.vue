<template>
  <div class="officeTeacher-container">
    <div class="officeTeacher-text">name: {{ name }} </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'OfficeTeacherIndex',
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
