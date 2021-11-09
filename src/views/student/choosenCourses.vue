<template>
  <div>
    <div><h3>已选课程</h3></div>
    <div>
      <el-tab type="card">
        <el-tab-pane label="选课列表查看">
          <el-table
            :data="list"
            element-loading-text="Loading"
            border
            lazy
            fit
            highlight-current-row
          >
            <el-table-column label="课程名" align="center">
              <template slot-scope="scope">
                {{ scope.row.courseName }}
              </template>
            </el-table-column>
            <el-table-column label="课程编号" align="center">
              <template slot-scope="scope">
                {{ scope.row.courseCode }}
              </template>
            </el-table-column>
            <el-table-column label="开课学院" align="center">
              <template slot-scope="scope">
                {{ scope.row.academics.join('、') }}
              </template>
            </el-table-column>
            <el-table-column label="学分" align="center">
              <template slot-scope="scope">
                {{ scope.row.courseCredit }}
              </template>
            </el-table-column>
            <el-table-column label="学时" align="center">
              <template slot-scope="scope">
                {{ scope.row.courseHour }}
              </template>
            </el-table-column>
            <el-table-column label="授课教师" align="center">
              <template slot-scope="scope">
                {{ scope.row.teachingTeacher }}
              </template>
            </el-table-column>
            <el-table-column label="课程容量" align="center">
              <template slot-scope="scope">
                {{ scope.row.courseCapacity }}
              </template>
            </el-table-column>
            <el-table-column label="选课人数" align="center">
              <template slot-scope="scope">
                {{ scope.row.courseChoosenNumber }}
              </template>
            </el-table-column>
            <el-table-column label="上课时间" align="center">
              <template slot-scope="scope">
                {{ scope.row.courseTime }}
              </template>
            </el-table-column>
            <el-table-column label="选项" align="center">
              <template slot-scope="scope">
                <span v-if="scope.row.choosenOrNot === '已选'">
                  <el-button type="text" disabled>已选</el-button>
                </span>
                <span v-else>
                  <el-button :id="scope.row.courseCode" @click.native.prevent="chooseCourse(scope.row.courseCode)">选课</el-button>
                </span>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
        <!-- <el-tab-pane label="选课课表查看">
        </el-tab-pane> -->
      </el-tab>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  data() {
    return {
      list: []
    }
  },
  computed: {
    ...mapGetters([
      'code'
    ])
  },
  mounted: function() {
    this.getCourses()
  },
  methods: {
    getCourses() {
      this.$store.dispatch('user/getCourses', this.code).then(response => {
        console.log(response.data)
      })
    }
  }
}
</script>
