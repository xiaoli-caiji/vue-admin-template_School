<template>
  <div class="app-container">
    <el-form ref="form" :model="form" label-width="120px">
      <el-form-item label="新闻标题" prop="NewsName">
        <el-input v-model="form.NewsName" />
      </el-form-item>
      <el-form-item label="新闻类型" prop="NewsType">
        <el-select v-model="form.NewsType" placeholder="请选择新闻类型">
          <el-option
            v-for="(item,index) in types"
            :key="index"
            :label="item"
            :value="item"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="展示时间" prop="NewsStartTime">
        <el-col :span="11">
          <el-date-picker ref="NewsStartTime" v-model="form.NewsStartTime" type="date" value-format="yyyy-MM-dd" name="NewsStartTime" placeholder="选择开始时间" style="width: 100%;" />
        </el-col>
        <el-col :span="2" class="line">-</el-col>
        <el-col :span="11" prop="NewsEndTime">
          <el-form-item prop="NewsEndTime">
            <el-date-picker v-model="form.NewsEndTime" type="date" value-format="yyyy-MM-dd" placeholder="选择结束时间" style="width: 100%;" />
          </el-form-item>
        </el-col>
      </el-form-item>
      <el-form-item label="封面内容" prop="newsCoverType">
        <el-radio-group v-model="form.newsCoverType" @change="chooseCover">
          <el-radio label="图片" />
          <el-radio label="标题" />
        </el-radio-group>
      </el-form-item>
      <el-form-item id="addPicture1" label="上传图片：" prop="NewsCover">
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
      <el-form-item label="编辑器" prop="content">
        <Tinymce ref="editor" v-model="content" :height="400" />
      </el-form-item>
      <el-form-item>
        <el-button @click.native.prevent="onSubmitOnline">上传</el-button>
        <el-button @click="onCancel">Cancel</el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="submit" @click.native.prevent="onSubmit">上传</el-button>
        <el-button @click="onCancel">Cancel</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import ElementUI from 'element-ui'
import { mapGetters } from 'vuex'
import Tinymce from '@/components/Tinymce'

export default {
  components: { Tinymce },
  data() {
    return {
      form: {
        NewsName: '',
        NewsType: '',
        NewsStartTime: '',
        NewsFile: '',
        NewsEndTime: '',
        NewsUploadTime: '',
        NewsCover: '',
        newsCoverType: ''
      },
      types: [],
      NewsPicturesBefore: [],
      dto: new FormData(),
      content: ''
    }
  },
  computed: {
    ...mapGetters([
      'name'
    ])
  },
  mounted: function() {
    this.getTypes()
    this.getHistoryOrDetails()
  },
  methods: {
    onCancel() {
      this.$message({
        message: 'cancel!',
        type: 'warning'
      })
    },
    getTypes() {
      document.getElementById('addPicture1').style.display = 'none'
      document.getElementById('addPicture2').style.display = 'none'
      this.$store.dispatch('user/getNewsTypes').then(response => {
        this.types = response.data
      })
    },
    getHistoryOrDetails() {
      var currentNews = this.$route.params.value
      if (currentNews !== undefined) {
        this.form.NewsName = currentNews.newsName
        this.form.NewsType = currentNews.newsType.newTypeName
        this.form.NewsStartTime = currentNews.newsShowStartTime
        this.form.NewsEndTime = currentNews.newsShowEndTime
        // this.form.n
      }
    },
    fileChange(file, fileList) {
      this.form.NewsFile = fileList[0].raw
    },
    imgChange(file, fileList) {
      this.NewsPicturesBefore = fileList
    },
    onSubmit() {
      var that = this
      this.form.NewsUploadTime = new Date()
      // var tt = this.form.NewsStartTime.getFullYear() + '-' + (this.form.NewsStartTime.getMonth() + 1) + '-' + this.form.NewsStartTime.getDate() + ' ' + this.form.NewsStartTime.getHours() + ':' + this.form.NewsStartTime.getMinutes() + ':' + this.form.NewsStartTime.getSeconds()
      // var et = this.form.NewsEndTime.getFullYear() + '-' + (this.form.NewsEndTime.getMonth() + 1) + '-' + this.form.NewsEndTime.getDate() + ' ' + this.form.NewsEndTime.getHours() + ':' + this.form.NewsEndTime.getMinutes() + ':' + this.form.NewsEndTime.getSeconds()
      // var ut = this.form.NewsUploadTime.getFullYear() + '-' + (this.form.NewsUploadTime.getMonth() + 1) + '-' + this.form.NewsUploadTime.getDate() + ' ' + this.form.NewsUploadTime.getHours() + ':' + this.form.NewsUploadTime.getMinutes() + ':' + this.form.NewsUploadTime.getSeconds()
      this.NewsPicturesBefore.forEach(p => {
        that.dto.append('NewsPictures', p.raw)
      })
      this.dto.append('NewsName', this.form.NewsName)
      this.dto.append('NewsType', this.form.NewsType)
      this.dto.append('NewsStartTime', this.form.NewsStartTime)
      this.dto.append('NewsEndTime', this.form.NewsEndTime)
      this.dto.append('NewsUploadTime', this.form.NewsUploadTime)
      this.dto.append('NewsFile', this.form.NewsFile)
      this.dto.append('NewsCover', this.form.NewsCover)
      this.dto.append('NewsWriter', this.name)
      this.dto.append('NewsCoverType', this.form.newsCoverType)
      this.dto.append('NewsContent', this.content)
      console.log(this.NewsPicturesBefore)
      console.log(this.form)
      this.$store.dispatch('user/newsSave', this.dto).then(response => {
        ElementUI.Message.info(response.content)

        // this.$refs.form.resetFields()
      })
    },
    onSubmitOnline() {
      var that = this
      console.log(this.$refs.editor.pictureList)
      this.$refs.editor.pictureList.forEach(p => {
        that.dto.append('NewsPictures', p)
      })
      this.form.NewsUploadTime = new Date()
      var tt = this.form.NewsStartTime.getFullYear() + '-' + (this.form.NewsStartTime.getMonth() + 1) + '-' + this.form.NewsStartTime.getDate() + ' ' + this.form.NewsStartTime.getHours() + ':' + this.form.NewsStartTime.getMinutes() + ':' + this.form.NewsStartTime.getSeconds()
      var et = this.form.NewsEndTime.getFullYear() + '-' + (this.form.NewsEndTime.getMonth() + 1) + '-' + this.form.NewsEndTime.getDate() + ' ' + this.form.NewsEndTime.getHours() + ':' + this.form.NewsEndTime.getMinutes() + ':' + this.form.NewsEndTime.getSeconds()
      var ut = this.form.NewsUploadTime.getFullYear() + '-' + (this.form.NewsUploadTime.getMonth() + 1) + '-' + this.form.NewsUploadTime.getDate() + ' ' + this.form.NewsUploadTime.getHours() + ':' + this.form.NewsUploadTime.getMinutes() + ':' + this.form.NewsUploadTime.getSeconds()
      this.dto.append('NewsName', this.form.NewsName)
      this.dto.append('NewsType', this.form.NewsType)
      this.dto.append('NewsStartTime', tt)
      this.dto.append('NewsEndTime', et)
      this.dto.append('NewsUploadTime', ut)
      this.dto.append('NewsCover', this.form.NewsCover)
      this.dto.append('NewsWriter', this.name)
      this.dto.append('NewsCoverType', this.form.newsCoverType)
      this.dto.append('NewsContent', this.content)
      // this.dto.append('NewsPicture', this.$refs.editor.pictureList)
      this.$store.dispatch('user/newsSave', this.dto).then(response => {
        ElementUI.Message.info(response.content)
        this.$refs.form.resetFields()
      })
    },
    chooseCover() {
      if (this.form.newsCoverType === '图片') {
        document.getElementById('addPicture1').style.display = 'inline'
        document.getElementById('addPicture2').style.display = 'inline'
      } else {
        this.form.NewsCover = this.form.NewsName
        document.getElementById('addPicture1').style.display = 'none'
        document.getElementById('addPicture2').style.display = 'none'
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
    }
  }
}
</script>

<style scoped>
.line{
  text-align: center;
}
</style>

