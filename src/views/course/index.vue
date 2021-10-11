<template>
    <div class="course-container">
        <el-table
        v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row>
    </div>
</template>
