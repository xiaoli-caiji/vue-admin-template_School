<template>
  <div class="app-container">
    <el-form ref="form" :model="form" label-width="120px">
      <el-form-item label="新闻标题" prop="NewsName">
        <el-input v-model="form.NewsName" />
      </el-form-item>
      <el-form-item label="新闻类型" prop="NewsType">
        <el-select v-model="form.NewsType" :placeholder="form.NewsType">
          <el-option
            v-for="(item,index) in types"
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
          <el-date-picker ref="NewsStartTime" v-model="form.NewsStartTime" type="date" value-format="yyyy-MM-dd" name="NewsStartTime" placeholder="选择开始时间" style="width: 100%;" />
        </el-col>
        <el-col :span="2" class="line">-</el-col>
        <el-col :span="11" prop="NewsEndTime">
          <el-form-item prop="NewsEndTime">
            <el-date-picker v-model="form.NewsEndTime" type="date" value-format="yyyy-MM-dd" placeholder="选择结束时间" style="width: 100%;" />
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
      <el-form-item id="addPicture" label="添加封面" prop="NewsCover">
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
      <el-form-item label="编辑器" prop="content">
        <Tinymce ref="editor" v-model="content" :height="400" />
      </el-form-item>
      <el-form-item>
        <el-button @click.native.prevent="onSubmitOnline">保存并上传</el-button>
        <el-button @click="onCancel">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import ElementUI from 'element-ui'
import { mapGetters } from 'vuex'
import Tinymce from '@/components/Tinymce'

export default {
  name: 'NewsEditForm',
  inject: ['reload'],
  components: { Tinymce },
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
        NewsUploadHistoryTime: '',
        NewsWriter: ''
      },
      types: [],
      NewsPicturesBefore: [],
      dto: new FormData(),
      content: '',
      exist: false,
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
    this.getHistoryOrDetails()
  },
  methods: {
    onCancel() {
      this.reload()
      this.$message({
        message: 'cancel!',
        type: 'warning'
      })
    },
    getTypes() {
      this.$store.dispatch('user/getNewsTypes').then(response => {
        this.types = response.data
      })
    },
    getHistoryOrDetails() {
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
          document.getElementById('historyCover').style.display = 'inline'
          that.historyCover = 'https://localhost:13001/' + that.currentNews.newsCoverAddressOrTitle
        } else {
          document.getElementById('addPicture').style.display = 'none'
          document.getElementById('historyCover').style.display = 'none'
        }
        that.form.NewsUploadHistoryTime = that.currentNews.newsWriteTime
        // 网址后面加随机数解决浏览器的缓存效果，实时获取最新数据
        this.content = this.currentNews.newsContent
        // this.$http.get('https://localhost:13001/' + that.currentNews.newsContentAddress + '?num=' + Math.random()).then(response => {
        //   console.log(response)
        //   that.content = response.body
        // })
      }
    },
    fileChange(file, fileList) {
      this.form.NewsFile = fileList[0].raw
    },
    imgChange(file, fileList) {
      this.NewsPicturesBefore = fileList
    },
    onSubmitOnline() {
      var that = this
      this.$refs.editor.pictureList.forEach(p => {
        that.dto.append('NewsPictures', p)
      })
      var t = new Date()
      this.form.NewsUploadTime = t.getFullYear() + '-' + (t.getMonth() + 1) + '-' + t.getDate() + ' ' + t.getHours() + ':' + t.getMinutes() + ':' + t.getSeconds()
      if (this.form.NewsCoverType === '标题') {
        this.form.NewsCover = this.form.NewsName
      }
      this.dto.append('NewsId', this.form.NewsId)
      this.dto.append('NewsName', this.form.NewsName)
      this.dto.append('NewsType', this.form.NewsType)
      this.dto.append('NewsStartTime', this.form.NewsStartTime)
      this.dto.append('NewsEndTime', this.form.NewsEndTime)
      this.dto.append('NewsUploadTime', this.form.NewsUploadTime)
      this.dto.append('NewsCover', this.form.NewsCover)
      this.dto.append('NewsWriter', this.name)
      this.dto.append('NewsCoverType', this.form.NewsCoverType)
      this.dto.append('NewsContent', this.content)
      this.$store.dispatch('user/newsEdit', this.dto).then(response => {
        ElementUI.Message.info(response.content)
        this.$parent.$data.dialogFormVisible = false
        this.$nextTick(item => {
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
    }
  }
}
</script>

<style scoped>
.line{
  text-align: center;
}
</style>

