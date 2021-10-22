<template>
  <div class="selfSetting-container">
    <el-form model="selfSettingForm" class="selfSetting-form" auto-complete="on" label-position="left">
      <el-form-item prop="Name">
        <el-input
          ref="Name"
          v-model="selfSettingForm."
    </el-form>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  data() {
    return {
      selfSettingForm: {
        Name: '',
        Gender: '',
        Password: '',
        BirthDate: new Date(),
        HeadImg: '',
        PhoneNumber: ''
      }
    }

  },
    computed: {
    ...mapGetters([
      'name',
      'headImg',
      'gender',
      'phoneNumber',
      'birthDate',
      'password'
    ])
  },
  methods: {

  }
}
</script>
