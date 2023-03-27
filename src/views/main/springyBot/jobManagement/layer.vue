<template>
  <Layer :layer="layer" @confirm="submit" ref="layerDom">
    <el-form :model="form" ref="ruleForm" label-width="230px" style="margin-right:100px;">
      <el-form-item label="名称：" prop="username">
        <el-input v-model="form.username" placeholder="请输入名称"></el-input>
      </el-form-item>
      <el-form-item label="Token：" prop="token">
        <el-input v-model="form.token"  placeholder="请输入Token"></el-input>
      </el-form-item>
      <el-form-item label="邀请好友发言限制：" prop="inviteFriendsSet">
        <el-radio-group v-model="form.config.inviteFriendsSet">
          <el-radio v-for="item in radioData" :key="item.value" :label="item.value">{{ item.label }}</el-radio>
        </el-radio-group>
        <el-form-item label="指定人数" prop="inviteFriendsQuantity">
          <el-input v-model="form.config.inviteFriendsQuantity" ></el-input>
        </el-form-item>
        <el-form-item label="重置天数" prop="inviteFriendsAutoClearTime">
          <el-input v-model="form.config.inviteFriendsAutoClearTime" ></el-input>
        </el-form-item>
      </el-form-item>
      <el-form-item label="关注频道发言限制：" prop="followChannelSet">
        <el-radio-group v-model="form.config.followChannelSet">
          <el-radio v-for="item in radioData" :key="item.value" :label="item.value">{{ item.label }}</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="系统消息删除：" prop="deleteSeconds">
        <el-input v-model="form.config.deleteSeconds"  placeholder="请输入秒数"></el-input>
      </el-form-item>
        <el-form-item label="邀请奖金功能：" prop="invitationBonusSet">
          <el-radio-group v-model="form.config.invitationBonusSet">
            <el-radio v-for="item in radioData" :key="item.value" :label="item.value">{{ item.label }}</el-radio>
          </el-radio-group>
          <el-form-item label="指定人数：" prop="inviteMembers">
            <el-input v-model="form.config.inviteMembers" ></el-input>
          </el-form-item>
          <el-form-item label="每次获得奖金：" prop="inviteEarnedOutstand">
            <el-input v-model="form.config.inviteEarnedOutstand" ></el-input>
          </el-form-item>
          <el-form-item label="联系人：" prop="contactPerson">
            <el-input v-model="form.config.contactPerson" ></el-input>
          </el-form-item>
        </el-form-item>
    </el-form>
  </Layer>
</template>

<script>
import { defineComponent, ref } from 'vue'
import { addBot ,updateBot} from '@/api/bot'
import { selectData, radioData } from '../operatingStatus/enum'
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
    const ruleForm= ref(null)
    const layerDom = ref(null)
    let form = ref({
      token: '5855785269:AAH9bvPpYudd2wSAvMnBTiKakCeoB92_Z_8',
      username:'CCP_1121_BOT',
      state:false,
      config:{
        inviteFriendsSet:false,
        followChannelSet:false,
        invitationBonusSet:false,
        deleteSeconds:6,
        inviteFriendsAutoClearTime:3,
        inviteFriendsQuantity:2,
        inviteMembers:6,
        inviteEarnedOutstand:1.2,
        contactPerson:'@aa',
      },
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
      radioData
    }
  },
  methods: {
    submit() {
      if (this.ruleForm) {
        this.ruleForm.validate((valid) => {
          if (valid) {
            let params = this.form
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
        console.log(res)
        this.$message({
          type: 'success',
          message: '编辑成功'
        })
        this.$emit('getTableData', false)
        this.layerDom && this.layerDom.close()
      })
    }
  }
})
</script>

<style lang="scss" scoped>
  
</style>