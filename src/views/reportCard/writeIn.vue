<template>
  <div class="courseList">
    <el-tabs v-model="courseName" @click="handleClick">
      <el-tab-pane>
        <span slot="label">
          <!-- <i class="el-icon-data" /> -->
          {{ courseName }}
        </span>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>

export default {
  data() {
      return {
          courseName: ''
      }
  }
}
</script>
