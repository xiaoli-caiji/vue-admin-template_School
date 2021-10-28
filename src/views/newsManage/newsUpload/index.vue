<template>
  <div class="app-container">
    <el-form ref="form" :model="form" label-width="120px">
      <el-form-item label="新闻标题">
        <el-input v-model="form.NewsName" />
      </el-form-item>
      <el-form-item label="新闻类型">
        <el-select v-model="form.NewsType" placeholder="请选择新闻类型">
          <el-option
            v-for="(item,index) in types"
            :key="index"
            :label="item"
            :value="item"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="新闻展示时间">
        <el-col :span="11">
          <el-date-picker ref="NewsStartTime" v-model="form.NewsStartTime" type="date" name="NewsStartTime" placeholder="选择开始时间" style="width: 100%;" />
        </el-col>
        <el-col :span="2" class="line">-</el-col>
        <el-col :span="11">
          <el-date-picker v-model="form.NewsEndTime" type="date" placeholder="选择结束时间" style="width: 100%;" />
          <!-- <el-time-picker v-model="form.NewsEndTime" type="fixed-time" placeholder="选择结束时间" style="width: 100%;" /> -->
        </el-col>
      </el-form-item>
      <!-- <el-form-item label="Instant delivery">
        <el-switch v-model="form.delivery" />
      </el-form-item> -->
      <!-- <el-form-item label="Activity type">
        <el-checkbox-group v-model="form.type">
          <el-checkbox label="Online activities" name="type" />
          <el-checkbox label="Promotion activities" name="type" />
          <el-checkbox label="Offline activities" name="type" />
          <el-checkbox label="Simple brand exposure" name="type" />
        </el-checkbox-group>
      </el-form-item> -->
      <el-form-item label="封面内容">
        <el-radio-group v-model="form.newsCoverType" @change="chooseCover">
          <el-radio label="图片" />
          <el-radio label="标题" />
        </el-radio-group>
      </el-form-item>
      <el-form-item id="addPicture" label="上传图片：">
        <el-upload
          ref="uploadPicture"
          action="https://localhost:13001/api/UserSelfSetting/ReceiveHeadImg"
          name="NewsCoverImg"
          accept="image/*"
          :auto-upload="false"
          :multiple="false"
          :limit="1"
          :on-change="pictureAdd"
        >
          <img :src="form.NewsCover">
          <i class="el-icon-plus" />
        </el-upload>
      </el-form-item>
      <el-form-item label="上传新闻稿">
        <el-upload
          ref="uploadExcel"
          action="https://localhost:13001/api/UserSelfSetting/ReceiveHeadImg"
          name="NewsFile"
          accept=".docx"
          :auto-upload="false"
          :multiple="false"
          :limit="1"
          :on-change="fileChange"
        >
          <i class="el-icon-plus" />
        </el-upload>
      </el-form-item>
      <el-form-item>
        <el-button @click.native.prevent="onSubmit">上传</el-button>
        <el-button @click="onCancel">Cancel</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import ElementUI from 'element-ui'
import { mapGetters } from 'vuex'

export default {
  data() {
    return {
      form: {
        NewsName: '',
        NewsType: '',
        NewsStartTime: '',
        NewsEndTime: '',
        NewsUploadTime: '',
        NewsFile: '',
        NewsCover: '',
        newsCoverType: ''
      },
      types: [],
      dto: new FormData(),
      showOrNot: false
    }
  },
  computed: {
    ...mapGetters([
      'name'
    ])
  },
  mounted: function() {
    this.getTypes()
  },
  methods: {
    onCancel() {
      this.$message({
        message: 'cancel!',
        type: 'warning'
      })
    },
    getTypes() {
      document.getElementById('addPicture').style.display = 'none'
      this.$store.dispatch('user/getNewsTypes').then(response => {
        this.types = response.data
      })
    },
    fileChange(file, fileList) {
      this.form.NewsFile = fileList[0].raw
    },
    onSubmit() {
      this.form.NewsUploadTime = new Date()
      var tt = this.form.NewsStartTime.getFullYear() + '-' + (this.form.NewsStartTime.getMonth() + 1) + '-' + this.form.NewsStartTime.getDate() + ' ' + this.form.NewsStartTime.getHours() + ':' + this.form.NewsStartTime.getMinutes() + ':' + this.form.NewsStartTime.getSeconds()
      var et = this.form.NewsEndTime.getFullYear() + '-' + (this.form.NewsEndTime.getMonth() + 1) + '-' + this.form.NewsEndTime.getDate() + ' ' + this.form.NewsEndTime.getHours() + ':' + this.form.NewsEndTime.getMinutes() + ':' + this.form.NewsEndTime.getSeconds()
      var ut = this.form.NewsUploadTime.getFullYear() + '-' + (this.form.NewsUploadTime.getMonth() + 1) + '-' + this.form.NewsUploadTime.getDate() + ' ' + this.form.NewsUploadTime.getHours() + ':' + this.form.NewsUploadTime.getMinutes() + ':' + this.form.NewsUploadTime.getSeconds()
      this.dto.append('NewsName', this.form.NewsName)
      this.dto.append('NewsType', this.form.NewsType)
      this.dto.append('NewsStartTime', tt)
      this.dto.append('NewsEndTime', et)
      this.dto.append('NewsUploadTime', ut)
      this.dto.append('NewsFile', this.form.NewsFile)
      this.dto.append('NewsCover', this.form.NewsCover)
      this.dto.append('NewsWriter', this.name)
      this.dto.append('NewsCoverType', this.form.newsCoverType)
      console.log(this.form.NewsCover)
      console.log(this.form.newsCoverType)
      this.$store.dispatch('user/newsSave', this.dto).then(response => {
        ElementUI.Message.info(response.content)
      })
    },
    chooseCover() {
      if (this.form.newsCoverType === '图片') {
        document.getElementById('addPicture').style.display = 'inline'
      } else {
        this.form.NewsCover = this.form.NewsName
        document.getElementById('addPicture').style.display = 'none'
      }
    },
    pictureAdd(file, FileList) {
      var that = this
      const reader = new FileReader()
      var img = ''
      reader.readAsDataURL(file.raw)
      reader.onload = function() {
        img = reader.result
        that.form.NewsCover = img
      }
      // this.form.NewsCover = FileList[0].raw
    }
  }
}
</script>

<style scoped>
.line{
  text-align: center;
}
</style>

