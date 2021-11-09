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
          编号(两位)：<el-input v-model="writeInForm.num" />
          学院：<el-select v-model="writeInForm.academic" placeholder="选择学院" @change="forClass">
            <el-option
              v-for="(item,index) in academics"
              :key="index"
              :label="item"
              :value="item"
            />
          </el-select>
          班级：<el-select v-model="writeInForm.class" placeholder="选择班级">
            <el-option
              v-for="(item,index) in classes"
              v-show="item.indexOf(writeInForm.academic) !== -1"
              :key="index"
              :label="item"
              :value="item"
            />
          </el-select>
          <!-- 这里根据学院选择班级有两种方式：v-show或者@change绑定的事件 -->
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
          学院：<el-select v-model="writeInForm.academic" placeholder="选择学院">
            <el-option
              v-for="(item,index) in academics"
              :key="index"
              :label="item"
              :value="item"
            />
          </el-select>
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
          学院：<el-select v-model="writeInForm.academic" placeholder="选择学院">
            <el-option
              v-for="(item,index) in academics"
              :key="index"
              :label="item"
              :value="item"
            />
          </el-select>
          部门：<el-select v-model="writeInForm.department" placeholder="选择部门">
            <el-option
              v-for="(item,index) in departments"
              :key="index"
              :label="item"
              :value="item"
            />
          </el-select>
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
          学院：<el-select v-model="writeInForm.academic" placeholder="选择学院">
            <el-option
              v-for="(item,index) in academics"
              :key="index"
              :label="item"
              :value="item"
            />
          </el-select>
          部门：<el-select v-model="writeInForm.department" placeholder="选择部门">
            <el-option
              v-for="(item,index) in departments"
              :key="index"
              :label="item"
              :value="item"
            />
          </el-select>
          <el-button @click.native.prevent="userRegister('其他职工')">录入</el-button>
        </el-form>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
const studentsTypes = ['学硕全日制', '专硕全日制', '专硕非全日制', '硕博连读']
export default {
  inject: ['reload'],
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
      userList: {},
      academics: [],
      classes: [],
      classesAfterAcademic: [],
      departments: []
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
  mounted: function() {
    this.getUnits()
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
      this.$store.dispatch('user/userRegister', this.userList).then(response => {
        this.reload()
      }).catch(() => {
        console.log('请求失败！')
      })
    },
    getUnits() {
      this.$store.dispatch('user/getUnits').then(response => {
        console.log(response.data)
        this.academics = response.data.academic
        this.classes = response.data.class
        this.departments = response.data.department
      })
    },
    forClass() {
      // 绑定学院的change事件，也可以直接在班级那里v-show
      this.classesAfterAcademic = []
      var that = this
      this.classes.forEach(c => {
        if (c.indexOf(this.writeInForm.academic) !== -1) {
          that.classesAfterAcademic.push(c)
        }
      })
    }
  }

}
</script>
