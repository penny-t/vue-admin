<template>
  <div>
    <el-dialog title="新增" :visible.sync="dialog_info_flag" @close="close" width="580px">
      <el-form :model="form" ref="addInfoForm">
        <el-form-item label="类别：" :label-width="formLabelWidth">
          <el-select v-model="form.region" placeholder="请选择活动区域">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="标题：" :label-width="formLabelWidth">
          <el-input v-model="form.name" placehoder="请输入标题"></el-input>
        </el-form-item>
        <el-form-item label="概况：" :label-width="formLabelWidth" >
          <el-input type="textarea" v-model="form.name" placehoder="请输入内容"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="close">取消</el-button>
        <el-button type="danger" >确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'dialogInfo',
  data() {
    return {
      dialog_info_flag: true,
      form: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      },
      formLabelWidth: '70px'
    }

  },
  // 父子传参属于单向数据流，父级 ->子级，不能反向修改，想要修改使用emit
  props: {
    flag: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    flag: {
      handler(newValue, oldValue) {
        // newval接收父组件传过来的值,点击新增时，该值是true
        this.dialog_info_flag = newValue
      }
    }
  },
  methods: {
    close() {
      console.log('1111');
      this.dialog_info_flag = false
      // 修饰器用法，更新父组件的flag中的值，用此方法父组件的flag后需加.sync 即 :flag.sync=dialog_info，父组件的close方法也不需要写了
      // 回调时需要做逻辑处理的时候，就不能用修饰器，反之，可以用修饰器
      this.$emit('update:flag', false)
      // 监听close，并传其值为false
      // this.$emit('close',false)
    }
  },
}
</script>
<style lang="sass" scoped>

</style>
