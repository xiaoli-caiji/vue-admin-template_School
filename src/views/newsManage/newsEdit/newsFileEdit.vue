<template>
  <div>
    <el-form ref="form" :model="form" label-width="120px">
      <el-form-item label="新闻标题" prop="NewsName">
        <el-input v-model="form.NewsName" />
      </el-form-item>
      <el-form-item label="新闻类型" prop="NewsType">
        <el-select v-model="form.NewsType" placeholder="请选择新闻类型">
          <el-option
            v-for="(item, index) in types"
            :key="index"
            :label="item"
            :value="item"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="上次编辑时间" prop="NewsUploadHistoryTime">
        <a>{{ form.NewsUploadHistoryTime }}</a>
      </el-form-item>
      <el-form-item label="上次编辑作者" prop="NewsWriter">
        <a>{{ form.NewsWriter }}</a>
      </el-form-item>
      <el-form-item label="展示时间" prop="NewsStartTime">
        <el-col :span="11">
          <el-date-picker
            ref="NewsStartTime"
            v-model="form.NewsStartTime"
            type="date"
            value-format="yyyy-MM-dd"
            name="NewsStartTime"
            placeholder="选择开始时间"
            style="width: 100%"
          />
        </el-col>
        <el-col :span="2" class="line">-</el-col>
        <el-col :span="11">
          <el-form-item prop="NewsEndTime">
            <el-date-picker
              v-model="form.NewsEndTime"
              type="date"
              value-format="yyyy-MM-dd"
              placeholder="选择结束时间"
              style="width: 100%"
            />
          </el-form-item>
        </el-col>
      </el-form-item>
      <el-form-item label="封面内容" prop="NewsCoverType">
        <el-radio-group v-model="form.NewsCoverType" @change="chooseCover">
          <el-radio label="图片" />
          <el-radio label="标题" />
        </el-radio-group>
      </el-form-item>
      <el-form-item id="historyCover" label="原版封面" prop="historyCover">
        <img :src="historyCover" width="150px" height="auto">
      </el-form-item>
      <el-form-item id="addPicture" label="上传图片：" prop="NewsCover">
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
          <img :src="form.NewsCover" width="150px" height="auto">
          <i class="el-icon-plus" />
        </el-upload>
      </el-form-item>
      <el-form-item label="上传新闻稿" prop="NewsFile">
        <el-upload
          ref="uploadExcel"
          action="https://localhost:13001/api/UserSelfSetting/ReceiveHeadImg"
          name="NewsFile"
          accept="*.*"
          :auto-upload="false"
          :multiple="false"
          :on-change="fileChange"
        >
          <i class="el-icon-plus" />
        </el-upload>
        <el-button id="docx" type="text" @click="doxcPreview">点击预览原稿件</el-button>
        <el-button id="pdf" type="text" @click="pdfPreview">点击预览原稿件</el-button>
      </el-form-item>
      <el-form-item label="上传稿件内图片" prop="NewsPicture">
        <el-upload
          ref="uploadImgs"
          action="https://localhost:13001/api/UserSelfSetting/ReceiveHeadImg"
          name="NewsPicture"
          accept="image/*"
          :auto-upload="false"
          :multiple="true"
          :on-change="imgChange"
          :file-list="NewsPicturesBefore"
        >
          <i class="el-icon-plus" />
        </el-upload>
        <span v-for="(item, index) in newsPictureAddList" :key="index">
          <img :src="item" width="150px" height="auto">
        </span>
      </el-form-item>
      <el-form-item label="原备选图片">
        <span v-for="(item, index) in newsPictureAddressList" :key="index" @mouseenter="mouseenter($event)" @mouseleave="mouseleave($event)">
          <div :id="index">
            <img :src="item" width="150px" height="auto">
            <svg-icon v-show="deleteIconShow" icon-class="删除" style="width:50px; height:auto;" @click.native="deleteImg(index)" />
          </div>
        </span>
      </el-form-item>
      <el-form-item>
        <el-button type="submit" @click.native.prevent="onSubmit">上传</el-button>
        <el-button @click="onCancel">Cancel</el-button>
      </el-form-item>
    </el-form>
    <el-dialog :visible.sync="filePreviewVisible" title="原稿件（Word）" :modal="false" width="800px" @close="filePreviewVisible = false" @open="getDocx">
      <div style="height:auto; overflow-y:auto;">
        <div ref="docxFile" />
      </div>
    </el-dialog>
    <el-dialog :visible.sync="pdfPreviewVisible" title="原稿件（PDF）" :modal="false" width="800px" @close="pdfPreviewVisible = false">
      <div style="height:auto; overflow-y:auto;">
        <iframe :src="fileUrl" width="800px" height="800px" />
      </div>
    </el-dialog>
  </div>
</template>

<script>
import ElementUI from 'element-ui'
import { mapGetters } from 'vuex'
import axios from 'axios'
const docx = require('docx-preview')

export default {
  name: 'NewsFileEdit',
  inject: ['reload'],
  props: {
    currentNews: {
      type: Object,
      default: undefined
    }
  },
  data() {
    return {
      form: {
        NewsId: 0,
        NewsName: '',
        NewsType: '',
        NewsStartTime: '',
        NewsFile: '',
        NewsEndTime: '',
        NewsUploadTime: '',
        NewsCover: '',
        NewsCoverType: '',
        NewsWriter: '',
        NewsUploadHistoryTime: ''
      },
      newsFileName: '',
      types: [],
      NewsPicturesBefore: [],
      dto: new FormData(),
      content: '',
      fileUrl: '',
      newsDeletePictureList: [],
      newsPictureAddressList: [],
      filePreviewVisible: false,
      pdfPreviewVisible: false,
      deleteIconShow: false,
      newsPictureAddList: [],
      deleteImgAddress: [],
      historyCover: ''
    }
  },
  computed: {
    ...mapGetters([
      'name'
    ])
  },
  mounted: function() {
    this.getTypes()
    this.getHistoryNews()
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
    getHistoryNews() {
      var that = this
      if (this.currentNews !== undefined) {
        that.form.NewsId = that.currentNews.id
        that.form.NewsWriter = that.currentNews.newsWriter
        that.form.NewsName = that.currentNews.newsName
        that.form.NewsType = String(that.currentNews.newsType.newsTypeName)
        that.form.NewsStartTime = that.currentNews.newsShowStartTime
        that.form.NewsEndTime = that.currentNews.newsShowEndTime
        that.form.NewsCoverType = that.currentNews.newsCoverType
        if (that.form.NewsCoverType === '图片') {
          document.getElementById('addPicture').style.display = 'inline'
          that.historyCover = 'https://localhost:13001/' + that.currentNews.newsCoverAddressOrTitle
        } else {
          document.getElementById('addPicture').style.display = 'none'
        }
        that.form.NewsUploadHistoryTime = that.currentNews.newsWriteTime
        that.form.NewsFile = 'https://localhost:13001/' + that.currentNews.NewsFile
        var s1 = this.currentNews.newsFileAddress.split('/')
        var s3 = s1[s1.length - 1].split('.')
        var fileKind = s3[s3.length - 1]
        if (fileKind === 'docx') {
          document.getElementById('docx').style.display = 'inline'
          document.getElementById('pdf').style.display = 'none'
        } else {
          document.getElementById('pdf').style.display = 'inline'
          document.getElementById('docx').style.display = 'none'
        }
        this.fileUrl = 'https://localhost:13001/' + this.currentNews.newsFileAddress
        if (this.currentNews.newsImgsAddress !== null) {
          var s2 = this.currentNews.newsImgsAddress.split(',')
          s2.forEach(s => {
            var ps = 'https://localhost:13001/' + s + '?num=' + Math.random()
            this.newsDeletePictureList.push(s)
            this.newsPictureAddressList.push(ps)
          })
        }
      }
    },
    fileChange(file, fileList) {
      this.form.NewsFile = fileList[0].raw
    },
    imgChange(file, fileList) {
      this.NewsPicturesBefore = fileList
      var that = this
      this.newsPictureAddList = []
      this.NewsPicturesBefore.forEach(f => {
        const reader = new FileReader()
        reader.readAsDataURL(f.raw)
        reader.onload = function() {
          that.newsPictureAddList.push(reader.result)
        }
      })
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
      this.dto.append('NewsCoverType', this.form.NewsCoverType)
      this.dto.append('NewsContent', this.content)
      this.dto.append('NewsId', this.form.NewsId)
      this.deleteImgAddress.forEach(dia => {
        that.dto.append('DeletePicture', dia)
      })
      // this.dto.append('DeletePicture', this.deleteImgAddress)
      console.log(this.dto.get('DeletePicture'))
      this.$store.dispatch('user/newsEdit', this.dto).then(response => {
        ElementUI.Message.info(response.content)
        that.dto = new FormData()
        that.deleteImgAddress = []
        that.$parent.$data.dialogFileVisible = false
        that.$nextTick(item => {
          that.reload()
        })
      })
    },
    chooseCover() {
      if (this.form.NewsCoverType === '图片') {
        document.getElementById('addPicture').style.display = 'inline'
      } else {
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
    },
    doxcPreview() {
      this.filePreviewVisible = true
    },
    getDocx() {
      console.log(this.$refs)
      axios({
        mothod: 'get',
        responseType: 'blob',
        url: this.fileUrl
      }).then(({ data }) => {
        console.log(data)
        this.$nextTick(item => {
          docx.renderAsync(data, this.$refs.docxFile)
        })
      })
    },
    pdfPreview() {
      this.pdfPreviewVisible = true
    },
    mouseenter: function(event) {
      this.deleteIconShow = true
    },
    mouseleave: function(event) {
      this.deleteIconShow = false
    },
    deleteImg(index) {
      document.getElementById(index).style.display = 'none'
      this.deleteImgAddress.push(this.newsDeletePictureList[index])
      console.log(this.deleteImgAddress)
    }
  }
}
</script>

