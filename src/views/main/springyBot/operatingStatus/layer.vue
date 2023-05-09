<template>
  <Layer :layer="layer" @confirm="submit" ref="layerDom">
    <el-form :model="form" ref="ruleForm" label-width="230px" style="margin-right:100px;">
      <el-form-item label="名称：" prop="username">
        <el-input v-model="form.username" placeholder="请输入名称"></el-input>
      </el-form-item>
      <el-form-item label="Token：" prop="token">
        <el-input v-model="form.token" placeholder="请输入Token"></el-input>
      </el-form-item>
      <el-form-item label="机器人类型：" prop="botType">
        <el-radio-group v-model="form.botType">
          <el-radio v-for="item in botType" :key="item.value" :label="item.value">{{ item.label }}</el-radio>
        </el-radio-group>
      </el-form-item>
    </el-form>
  </Layer>
</template>

<script>
import { defineComponent, ref } from 'vue'
import { addBot, updateBot } from '@/api/bot'
import { selectData, radioData, botType } from '../operatingStatus/enum'
import { useStore } from 'vuex'
import Layer from '@/components/layer/index.vue'
export default defineComponent({
  components: {
    Layer
  },
  props: {
    layer: {
      type: Object,
      default: () => {
        return {
          show: false,
          title: '',
          showButton: true
        }
      }
    }
  },
  setup(props, ctx) {
    const store = useStore()
    const hasTestRole = store.state.user.info.roles.includes('TEST');
    const ruleForm = ref(null)
    const layerDom = ref(null)
    let form = ref({
      token: '',
      username: '',
      state: false,
      botType: 'talentBot',
    })
    init()
    function init() { // 用于判断新增还是编辑功能
      if (props.layer.row) {
        form.value = JSON.parse(JSON.stringify(props.layer.row)) // 数量量少的直接使用这个转
      } else {

      }
    }
    return {
      form,
      layerDom,
      ruleForm,
      selectData,
      radioData,
      botType,
      hasTestRole,
    }
  },
  methods: {
    submit() {
      if (this.ruleForm) {
        this.ruleForm.validate((valid) => {
          if (valid) {
            let params = this.form
            if(this.form.botType == "coolbaoBot"){
              if(!this.hasTestRole){
                this.$message({
                  type: 'error',
                  message: '开发测试用,限制新增'
                })
                return false;
              }
            }
            if (this.layer.row) {
              this.updateForm(params)
            } else {
              this.addForm(params)
            }
          } else {
            return false;
          }
        });
      }
    },
    // 新增提交事件
    addForm(params) {
      addBot(params)
        .then(res => {
          this.$message({
            type: 'success',
            message: '新增成功'
          })
          this.$emit('getTableData', true)
          this.layerDom && this.layerDom.close()
        })
    },
    // 编辑提交事件
    updateForm(params) {
      updateBot(params)
        .then(res => {
          this.$message({
            type: 'success',
            message: res.msg
          })
          this.$emit('getTableData', false)
          this.layerDom && this.layerDom.close()
        })
    }
  }
})
</script>

<style lang="scss" scoped></style>