<template>
  <Layer :layer="layer" @confirm="submit" ref="layerDom">
    <el-form :model="form" :rules="rules" ref="ruleForm" label-width="120px" style="margin-right:30px;">
      <el-form-item label="用户名" prop="username">
        <el-input v-model="form.username" placeholder="請輸入用戶名"></el-input>
      </el-form-item>
      <el-form-item label="密碼：" prop="password">
        <el-input type="password" v-model="form.password" placeholder="請輸入密碼"></el-input>
      </el-form-item>
      {{ form.radio }}
      <el-form-item label="狀態：" prop="enabled">
        <el-radio-group v-model="form.enabled">
          <el-radio v-for="item in radioData" :key="item.value" :label="item.value">{{ item.label }}</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="分配角色：" prop="roles">
        <el-checkbox-group v-model="form.roles">
          <el-checkbox v-for="item in roles" :key="item.value" :label="item.value">{{ item.label }}</el-checkbox>
        </el-checkbox-group>
      </el-form-item>
    </el-form>
  </Layer>
</template>

<script>
import { defineComponent, ref } from 'vue'
import { updateAdmin, addAdmin } from '@/api/admins'
import { radioData, roles } from './enum'
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
    const ruleForm = ref(null)
    const layerDom = ref(null)
    let form = ref({
      username: '',
      enabled: true,
      roles:['ADMIN'],
    })
    const rules = {
      username: [{ required: true, message: '請輸入用戶名', trigger: 'blur' }],
      password: [{ required: true, message: '請輸入密碼', trigger: 'blur' }],
      enabled: [{ required: true, message: '請選擇', trigger: 'blur' }],
    }
    init()
    function init() { // 用于判断新增还是编辑功能
      if (props.layer.row) {
        form.value = JSON.parse(JSON.stringify(props.layer.row)) // 数量量少的直接使用这个转
      } else {

      }
    }
    return {
      form,
      rules,
      layerDom,
      ruleForm,
      radioData,
      roles,
      store,
    }
  },
  methods: {
    
    submit() {
      if (this.ruleForm) {
        this.ruleForm.validate((valid) => {
          if (valid) {
            let params = this.form
            if(this.form.roles && this.form.roles.length > 0){
              if (this.layer.row) {
                this.updateForm(params)
              } else {
                this.addForm(params)
              }
            }else{
              this.$message({
                type: 'error',
                message: 'Roles is empty!'
              })
              return false;
            }
          } else {
            return false;
          }
        });
      }
    },
    // 新增提交事件
    addForm(params) {
      addAdmin(params)
        .then(res => {
          this.$message({
            type: res.code == 200 ? 'success' : 'error',
            message: res.msg
          })
          this.$emit('getTableData', true)
          this.layerDom && this.layerDom.close()
        })
    },
    // 编辑提交事件
    updateForm(params) {
      updateAdmin(params)
        .then(res => {
          this.$message({
            type: 'success',
            message: res.msg
          })
          if(this.form.username == this.store.state.user.info.username){
            let params = ref({
              token:this.store.state.user.token,
            })
            this.store.dispatch('user/getInfo',params.value)
          }
          this.$emit('getTableData', false)
          this.layerDom && this.layerDom.close()
        })
    }
  }
})
</script>

<style lang="scss" scoped></style>