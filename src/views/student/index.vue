<template>
  <div class="student-container">
    <div class="student-text">name: {{ name }} </div>
    <div>
      <el-button @click.native.prevent="browseCourse">browseCourse</el-button>
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
