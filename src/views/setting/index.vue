<template>
  <div class="selfSetting-container">
    <el-form model="selfSettingForm" class="selfSetting-form" auto-complete="on" label-position="left">
      <el-form-item prop="Name">
        姓名：<el-input
          ref="Name"
          v-model="selfSettingForm.Name"
          name="Name"
          type="text"
          tabindex="1"
          auto-complete="on"
        />
      </el-form-item>
      <el-form-item prop="Gender">
        性别：<el-input
          ref="Gender"
          v-model="selfSettingForm.Gender"
          name="Gender"
          type="text"
          tabindex="2"
          auto-complete="on"
        />
      </el-form-item>
      <el-form-item prop="PhoneNumber">
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
        <!-- 头像：<el-input
          ref="HeadImg"
          v-model="selfSettingForm.HeadImg"
          name="HeadImg"
          type="file"
          tabindex="5"
          auto-complete="on"
          accept="image/*"
        /> -->
        <el-upload
          name="headPicture"
          action="https://localhost:13001/api/UserSelfSetting/ReceiveHeadImg"
          accept="image/*"
          :auto-upload="true"
          :multiple="false"
          :before-upload="beforeUploadFile"
        >
          <i class="el-icon-plus" />
        </el-upload>
      </el-form-item>
      <el-form-item>
        <el-button size="small" type="primary" @click="uploadFile">立即上传</el-button>
        <el-button size="small">取消</el-button>
      </el-form-item>
      <el-form-item prop="BirthDate">
        生日：<el-input
          ref="BirthDate"
          v-model="selfSettingForm.BirthDate"
          name="BirthDate"
          type="date"
          tabindex="6"
          auto-complete="on"
        />
      </el-form-item>
      <el-button @click.native.prevent="saveChange">确认修改</el-button>
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
        BirthDate: new Date(),
        HeadImg: '',
        UserCode: '',
        PhoneNumber: ''
      }
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
      this.selfSettingForm.HeadImg = this.headImg
      this.selfSettingForm.PhoneNumber = this.phoneNumber
      this.selfSettingForm.BirthDate = this.birthDate
    },
    handleFile(event) {
      this.selfSettingForm.HeadImg = event.target.files[0]
    },
    saveChange() {
      console.log(this.selfSettingForm)
      this.$store.dispatch('user/saveChange', this.selfSettingForm).then(response => {
        this.$store.dispatch('user/getInfo')
        ElementUI.Message.info(response.content)
      })
    },
    beforeUploadFile(file) {
      console.log(file)
      var reader = new FileReader()
      let img = ''
      reader.readAsDataURL(file)
      reader.onload = function() {
        img = reader.result
      }
      console.log(img)
    },
    uploadFile() {
      console.log(this.$refs.target.files[0])
      this.$refs.upload.submit()
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
}
</style>
