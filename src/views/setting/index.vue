<template>
  <div class="selfSetting-container">
    <el-form :model="selfSettingForm" class="selfSetting-form" auto-complete="on" label-position="left">
      <el-form-item>
        姓名：<el-input
          ref="Name"
          v-model="selfSettingForm.Name"
          name="Name"
          type="text"
          tabindex="1"
          auto-complete="on"
        />
      </el-form-item>
      <el-form-item>
        性别：<el-input
          ref="Gender"
          v-model="selfSettingForm.Gender"
          name="Gender"
          type="text"
          tabindex="2"
          auto-complete="on"
        />
      </el-form-item>
      <el-form-item>
        手机号：<el-input
          ref="PhoneNumber"
          v-model="selfSettingForm.PhoneNumber"
          name="PhoneNumber"
          type="text"
          tabindex="4"
          auto-complete="on"
        />
      </el-form-item>
      <el-form-item prop="HeadImg">
        原头像:<img
          width="100%"
          :src="headImg"
        >
        新头像：<el-upload
          ref="uploadExcel"
          name="headPicture"
          action="https://localhost:13001/api/UserSelfSetting/ReceiveHeadImg"
          accept="image/*"
          :auto-upload="false"
          :headers="header"
          :multiple="false"
          :limit="1"
          :before-upload="beforeUploadFile"
          :on-change="fileChange"
        >
          <i class="el-icon-plus">
            <img width="100%" :src="HeadPicture">
          </i>
        </el-upload>
      </el-form-item>
      <el-form-item>
        生日：<el-date-picker
          ref="BirthDate"
          v-model="selfSettingForm.BirthDate"
          name="BirthDate"
          type="date"
          tabindex="6"
        />
      </el-form-item>
      <el-button @click.native.prevent="saveChange">确认修改</el-button>
      <el-button @click.native.prevent="backHome">取消</el-button>
    </el-form>
  </div>
</template>

<script>
import ElementUI from 'element-ui'
import { mapGetters } from 'vuex'

export default {
  data() {
    return {
      selfSettingForm: {
        Name: '',
        Gender: '',
        BirthDate: '',
        HeadImg: '',
        UserCode: '',
        PhoneNumber: ''
      },
      HeadPicture: '',
      header: { Authorization: window.sessionStorage.getItem('token') }
    }
  },
  computed: {
    ...mapGetters([
      'code',
      'name',
      'gender',
      'birthDate',
      'headImg',
      'phoneNumber'
    ])
  },
  mounted: function() {
    this.selfInfo()
  },
  methods: {
    selfInfo() {
      this.selfSettingForm.UserCode = this.code
      this.selfSettingForm.Name = this.name
      this.selfSettingForm.Gender = this.gender
      if (this.HeadPicture === '') {
        this.selfSettingForm.HeadImg = null
      } else {
        this.selfSettingForm.HeadImg = this.headImg
      }
      this.selfSettingForm.PhoneNumber = this.phoneNumber
      this.selfSettingForm.BirthDate = this.birthDate
    },
    fileChange(file) {
      var that = this
      const reader = new FileReader()
      var img = ''
      reader.readAsDataURL(file.raw)
      reader.onload = function() {
        img = reader.result
        that.selfSettingForm.HeadImg = img
        that.HeadPicture = img
      }
    },
    saveChange() {
      console.log(this.selfSettingForm)
      this.$store.dispatch('user/saveChange', this.selfSettingForm).then(response => {
        this.$store.dispatch('user/getInfo')
        ElementUI.Message.info(response.content)
      })
    },
    backHome() {
      this.$router.push('/')
    },
    beforeUploadFile() {
    },
    uploadFile() {
      this.$refs.uploadExcel.submit()
    }
  }
}
</script>

<style lang="scss">
.selfSetting-container {
  .selfSetting-form {
    position: relative;
    width: 520px;
    max-width: 100%;
    padding: 160px 35px 0;
    margin: 0 auto;
    overflow: hidden;
  }
  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
  }
  .el-icon-plus {
    border-radius: 10px;

  }
}
</style>
