<template>
  <div class="upload-container">
    <el-button :style="{background:color,borderColor:color}" icon="el-icon-upload" size="mini" type="primary" @click=" dialogVisible=true">
      upload
    </el-button>
    <el-dialog :visible.sync="dialogVisible" :append-to-body="true">
      <el-upload
        ref="tinymceUpload"
        :auto-upload="false"
        accept="*.*"
        :multiple="true"
        :file-list="fileListBefore"
        :show-file-list="true"
        :on-remove="handleRemove"
        :on-success="handleSuccess"
        :on-change="picturesUpload"
        :before-upload="beforeUpload"
        class="editor-slide-upload"
        action="https://localhost:13001/api/NewsManage/UpLoadHtmlPictures"
        list-type="picture-card"
      >
        <el-button size="small" type="primary">
          Click upload
        </el-button>
      </el-upload>
      <el-button @click="dialogVisible = false">
        取消
      </el-button>
      <el-button type="primary" @click="handleSubmit">
        确定
      </el-button>
    </el-dialog>
  </div>
</template>

<script>
// import { getToken } from 'api/qiniu'
import { htmlImgUpload } from '@/api/user'

export default {
  name: 'EditorSlideUpload',
  inject: ['reload'],
  props: {
    color: {
      type: String,
      default: '#1890ff'
    }
  },
  data() {
    return {
      dialogVisible: false,
      listObj: {},
      fileList: [],
      pictures: [],
      fileListBefore: [],
      pictureList: new FormData()
    }
  },
  methods: {
    picturesUpload(file, fileList) {
      var that = this
      this.fileListBefore = fileList
      this.fileList = []
      fileList.forEach(f => {
        that.fileList.push(f.raw)
      })
    },
    checkAllSuccess() {
      return Object.keys(this.listObj).every(item => this.listObj[item].hasSuccess)
    },
    handleSubmit() {
      var that = this
      console.log('fileList', this.fileList)
      this.fileList.forEach(f => {
        that.pictureList.append('pictureUrls', f)
      })
      htmlImgUpload(this.pictureList).then(response => {
        that.pictures = response.data
        that.$emit('successCBK', that.pictures)
        console.log(response)
      })
      this.fileList = []
      this.pictureList = new FormData()
      this.dialogVisible = false
      // that.reload()
    },
    handleSuccess(response, file) {
      console.log(response)
      const uid = file.uid
      const objKeyArr = Object.keys(this.listObj)
      for (let i = 0, len = objKeyArr.length; i < len; i++) {
        if (this.listObj[objKeyArr[i]].uid === uid) {
          this.listObj[objKeyArr[i]].url = response.files.file
          this.listObj[objKeyArr[i]].hasSuccess = true
          return
        }
      }
    },
    handleRemove(file) {
      const uid = file.uid
      const objKeyArr = Object.keys(this.listObj)
      for (let i = 0, len = objKeyArr.length; i < len; i++) {
        if (this.listObj[objKeyArr[i]].uid === uid) {
          delete this.listObj[objKeyArr[i]]
          return
        }
      }
    },
    beforeUpload(file) {
      const _self = this
      const _URL = window.URL || window.webkitURL
      const fileName = file.uid
      this.listObj[fileName] = {}
      return new Promise((resolve, reject) => {
        const img = new Image()
        img.src = _URL.createObjectURL(file)
        img.onload = function() {
          _self.listObj[fileName] = { hasSuccess: false, uid: file.uid, width: this.width, height: this.height }
        }
        resolve(true)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.editor-slide-upload {
  margin-bottom: 20px;
  ::v-deep .el-upload--picture-card {
    width: 100%;
  }
}
</style>
