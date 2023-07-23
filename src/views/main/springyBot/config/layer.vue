<template>
  <Layer :layer="layer" @confirm="submit" ref="layerDom">
    <el-form :model="form" ref="ruleForm" label-width="230px" style="margin-right:100px;">
      <template v-for="item in formItems">
        <el-form-item :label="item.label" :prop="item.prop" v-if="layer.type === item.type">
          <template v-if="item.component === 'el-select'">
            <el-select v-model="form.followChannelSet_chatId" placeholder="请选择">
              <el-option :key="0" :label="'请选择'" :value="0"></el-option>
              <el-option v-for="chatEntry in chatList" :key="chatEntry.id" :label="chatEntry.channelTitle"
                :value="chatEntry.channelId">
              </el-option>
            </el-select>
          </template>
          <template v-else>
            <component :is="item.component" v-model="form[item.prop]"></component>
          </template>
        </el-form-item>
      </template>
    </el-form>
  </Layer>
</template>

<script>
import { defineComponent, ref } from 'vue'
import { updateConfig, fetchManagedChat } from '@/api/springyBot'
import { botType } from '../operatingStatus/enum'
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
    const ruleForm = ref(null)
    const layerDom = ref(null)
    let form = ref({})
    let chatList = ref({})
    init()
    const formItems = ref([
      { type: 'channel', label: '频道订阅限制发言开关', prop: 'followChannelSet', component: 'el-switch' },
      { type: 'channel', label: '指定频道：', prop: 'followChannelChatId', component: 'el-select' },
      { type: 'channel', label: '系统消息显示：', prop: 'followChannelSet_chatTitle', component: 'el-input' },
      { type: 'channel', label: '系统消息删除(秒)：', prop: 'deleteSeconds', component: 'el-input' },
      { type: 'invite', label: '邀请限制发言开关', prop: 'inviteFriendsSet', component: 'el-switch' },
      { type: 'invite', label: '邀请几位才能发言：', prop: 'inviteFriendsQuantity', component: 'el-input' },
      { type: 'invite', label: '邀请记录自动清除时间：', prop: 'inviteFriendsAutoClearTime', component: 'el-input' },
      { type: 'bonus', label: '邀请奖励开关', prop: 'invitationBonusSet', component: 'el-switch' },
      { type: 'bonus', label: '邀请目标人数：', prop: 'inviteMembers', component: 'el-input' },
      { type: 'bonus', label: '支付金额：', prop: 'inviteEarnedOutstand', component: 'el-input' },
      { type: 'bonus', label: '目标达成奖金：', prop: 'minimumPayout', component: 'el-input' },
      { type: 'bonus', label: '联系人：', prop: 'contactPerson', component: 'el-input' }
    ]);
    function init() { // 用于判断新增还是编辑功能
      if (props.layer.row) {
        form.value = JSON.parse(JSON.stringify(props.layer.row.config)) // 数量量少的直接使用这个转
        fetchManagedChat(props.layer.row.config)
          .then(res => {
            chatList.value = res.data.list;
          })
      }
    }
    return {
      form,
      layerDom,
      ruleForm,
      botType,
      formItems,
      chatList,
    }
  },
  methods: {
    submit() {
      if (this.ruleForm) {
        this.ruleForm.validate((valid) => {
          if (valid) {
            let params = this.form
            if (this.layer.row && this.checkForm(params)) {
              this.updateForm(params)
            }
          } else {
            return false;
          }
        });
      }
    },
    // 编辑提交事件
    updateForm(params) {
      updateConfig(params)
        .then(res => {
          this.$message({
            type: 'success',
            message: res.msg
          })
          this.$emit('getTableData', false)
          this.layerDom && this.layerDom.close()
        })
    },
    checkForm(params) {
      return true;
    },
  }
})
</script>

<style lang="scss" scoped></style>