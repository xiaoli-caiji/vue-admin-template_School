<template>
  <div class="dashboard-container" auto-complete="on">
    <div class="dashboard-text">姓名: {{ name }} </div>
    <div class="body">
      {{ '这里是缅甸北部，我生长的地方;欢迎来到我的世界，娇贵的小公主。' }}
    </div>
    <div>
      <el-carousel v-model="pl" :interval="4000" type="card" arrow="always" height="200px">
        <el-carousel-item v-for="item in 6" :key="item">
          <img :src="pl[item]">
        </el-carousel-item>
      </el-carousel>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Dashboard',
  data() {
    return {
      pl: [{}]
    }
  },
  computed: {
    ...mapGetters([
      'name', 'code', 'role'
    ])
  }
}
</script>

<style lang="scss" scoped>
$bg:#2adb1a ;
$light_gray:#fff;
$cursor: #fff;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
  }
}
$bg:#0a94f0d2;
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
.dashboard-container {
  min-height: 100%;
  width: 100%;
  background: $bg
}
</style>
