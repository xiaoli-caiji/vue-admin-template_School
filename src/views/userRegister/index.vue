<template>
  <div class="userList">
    <el-tabs type="card">
      <el-tab-pane label="学生">
        <!-- {{ '内容' }} -->
        <el-form ref="writeInForm" :model="writeInForm" @submit.native.prevent>
          姓名：<el-input ref="userName" v-model="writeInForm.userName" />
          学号：<el-input ref="userCode" v-model="writeInForm.userCode" />
          身份证号：<el-input ref="userName" v-model="writeInForm.idCardNum" />
          联系方式：<el-input ref="userName" v-model="writeInForm.phoneNum" />
          <el-button @click.native.prevent="userRegister('学生')">录入</el-button>
        </el-form>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>

export default {
  data() {
    return {
      writeInForm: {
        userName: '钱三',
        userCode: '202022010103',
        idCardNum: '123765199908022973',
        phoneNum: '124349837265',
        userRole: '',
        teachCourse: []
      },
      userList: []
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
      this.userList.push({
        Name: this.writeInForm.userName,
        UserCode: this.writeInForm.userCode,
        IdCardNumber: this.writeInForm.idCardNum,
        PhoneNumber: this.writeInForm.phoneNum,
        userRole: label
      })
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
