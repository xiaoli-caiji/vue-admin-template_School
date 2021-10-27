<template>
  <div class="userList">
    <el-tabs type="card">
      <el-tab-pane label="学生">
        <!-- {{ '内容' }} -->
        <el-form ref="writeInForm" :model="writeInForm" @submit.native.prevent>
          姓名：<el-input v-model="writeInForm.userName" />
          <div>
            学生类型：
            <el-radio-group v-model="writeInForm.studentType">
              <el-radio v-for="type in writeInForm.studentTypes" :key="type" :label="type">
                {{ type }}
              </el-radio>
            </el-radio-group>
          </div>
          身份证号：<el-input v-model="writeInForm.idCardNum" />
          编号：<el-input v-model="writeInForm.num" />
          学院：<el-input v-model="writeInForm.academic" />
          班级：<el-input v-model="writeInForm.class" />

          <el-button @click.native.prevent="userRegister('学生')">录入</el-button>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="教师">
        <!-- {{ '内容' }} -->
        <el-form ref="writeInForm" :model="writeInForm" @submit.native.prevent>
          姓名：<el-input v-model="writeInForm.userName" />
          教师编号：<el-input v-model="writeInForm.userCode" />
          身份证号：<el-input v-model="writeInForm.idCardNum" />
          联系方式：<el-input v-model="writeInForm.phoneNum" />
          学院：<el-input v-model="writeInForm.academic" />
          <!-- 教授课程：<el-checkbox v-model="teachCourse"> -->
          <el-button @click.native.prevent="userRegister('教师')">录入</el-button>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="办公老师">
        <!-- {{ '内容' }} -->
        <el-form ref="writeInForm" :model="writeInForm" @submit.native.prevent>
          姓名：<el-input v-model="writeInForm.userName" />
          职员编号：<el-input v-model="writeInForm.userCode" />
          身份证号：<el-input v-model="writeInForm.idCardNum" />
          联系方式：<el-input v-model="writeInForm.phoneNum" />
          学院：<el-input v-model="writeInForm.academic" />
          部门：<el-input v-model="writeInForm.department" />

          <el-button @click.native.prevent="userRegister('办公老师')">录入</el-button>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="其他职工">
        <!-- {{ '内容' }} -->
        <el-form ref="writeInForm" :model="writeInForm" @submit.native.prevent>
          姓名：<el-input v-model="writeInForm.userName" />
          职员编号：<el-input v-model="writeInForm.userCode" />
          身份证号：<el-input v-model="writeInForm.idCardNum" />
          联系方式：<el-input v-model="writeInForm.phoneNum" />
          学院：<el-input v-model="writeInForm.academic" />
          部门：<el-input v-model="writeInForm.department" />

          <el-button @click.native.prevent="userRegister('其他职工')">录入</el-button>
        </el-form>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
const studentsTypes = ['学硕全日制', '专硕全日制', '专硕非全日制', '硕博连读']
export default {
  data() {
    return {
      writeInForm: {
        userName: '',
        idCardNum: '',
        num: '',
        academic: '',
        class: '',
        studentType: '',
        studentTypes: studentsTypes,
        department: '',
        userRole: '',
        teachCourse: [],
        courses: [],
        phoneNum: '',
        userCode: ''
      },
      userList: {}

    }
  },
  watch: {
    $route: {
      handler: function(route) {
        this.redirect = route.query && route.query.redirect
      },
      immediate: true
    }
  },
  methods: {
    userRegister(label) {
      this.userList = {
        UserCode: this.writeInForm.userCode,
        Name: this.writeInForm.userName,
        StudentType: this.writeInForm.studentType,
        IdCardNumber: this.writeInForm.idCardNum,
        Num: this.writeInForm.num,
        Academic: this.writeInForm.academic,
        Class: this.writeInForm.class,
        userRole: label,
        Department: this.writeInForm.department,
        PhoneNumber: this.writeInForm.phoneNum
      }
      console.log(this.writeInForm)
      console.log(this.userList)
      this.$store.dispatch('user/userRegister', this.userList).then(response => {
        console.log(response)
      }).catch(() => {
        console.log('请求失败！')
      })
    }
  }

}
</script>
