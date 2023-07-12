<template>
  <div class="layout-container">
    <div class="layout-container-table">
      <Table ref="table" v-model:page="page" v-loading="loading" :data="tableData" @getTableData="getTableData"
        @selection-change="handleSelectionChange">
        <!-- <el-table-column prop="username" label="名称" align="center" /> -->
        <el-table-column label="名称" align="center">
          <template #default="{ row }">
            <div>
              {{ row.username }}{{ row.botId === null ? '' : " [ " + row.botId + " ] " }}
            </div>
          </template>
        </el-table-column>

        <el-table-column label="频道订阅限制发言" align="center">
          <template #default="{ row }">
            <div>
              <div :class="['circle', row.config.followChannelSet ? 'green' : 'red']"></div>
            </div>
          </template>
        </el-table-column>

        <el-table-column label="邀请限制发言" align="center">
          <template #default="{ row }">
            <div>
              <div :class="['circle', row.config.inviteFriendsSet ? 'green' : 'red']"></div>
            </div>
          </template>
        </el-table-column>

        <el-table-column label="邀请奖励" align="center">
          <template #default="{ row }">
            <div>
              <div :class="['circle', row.config.invitationBonusSet ? 'green' : 'red']"></div>
            </div>
          </template>
        </el-table-column>

        <el-table-column label="操作" align="center" fixed="right" width="400">
          <template #default="scope">
            <el-button type="primary" @click="handleEdit(scope.row, 'channel')">频道订阅设置</el-button>
            <el-button type="primary" @click="handleEdit(scope.row, 'invite')">邀请限制设置</el-button>
            <el-button type="primary" @click="handleEdit(scope.row, 'bonus')">邀请奖励设置</el-button>
          </template>
        </el-table-column>
      </Table>
      <Layer :layer="layer" @getTableData="getTableData" v-if="layer.show" />
    </div>
  </div>
</template>

<script>
import { defineComponent, ref, reactive } from 'vue'
import Table from '@/components/table/index.vue'
import { getAllBot, deleteBot, start, stop } from '@/api/springyBot'
import Layer from './layer.vue'
import { ElMessage } from 'element-plus'
export default defineComponent({
  name: 'crudTable',
  components: {
    Table,
    Layer
  },
  setup() {
    // 弹窗控制器
    const layer = reactive({
      show: false,
      title: '新增',
      showButton: true
    })
    // 分页参数, 供table使用
    const page = reactive({
      index: 1,
      size: 20,
      total: 0
    })
    const loading = ref(true)
    const tableData = ref([])
    const chooseData = ref([])
    const handleSelectionChange = (val) => {
      chooseData.value = val
    }
    // 获取表格数据
    // params <init> Boolean ，默认为false，用于判断是否需要初始化分页
    const getTableData = (init) => {
      loading.value = true
      if (init) {
        page.index = 1
      }
      let params = {
        page: page.index - 1,
        pageSize: page.size,
      }
      getAllBot(params)
        .then(res => {
          tableData.value = res.data.list
          page.total = Number(res.data.pager.total)
        })
        .catch(error => {
          tableData.value = []
          page.index = 1
          page.total = 0
        })
        .finally(() => {
          loading.value = false
        })
    }
    // 删除功能
    const handleDel = (data) => {
      let params = {
        ids: data.map((e) => {
          return e.id
        }).join(',')
      }
      deleteBot(params)
        .then(res => {
          ElMessage({
            type: 'success',
            message: res.msg
          })
          getTableData(tableData.value.length === 1 ? true : false)
        })
    }
    // 新增弹窗功能
    const handleAdd = () => {
      layer.title = '新增电报机器人'
      layer.show = true
      delete layer.row
    }
    // 编辑弹窗功能
    const handleEdit = (row, type) => {
      if (type === 'channel') {
        layer.title = '频道订阅设置'
      }
      if (type === 'invite') {
        layer.title = '邀请限制设置'
      }
      if (type === 'bonus') {
        layer.title = '邀请奖励设置'
      }
      layer.row = row
      layer.show = true
      layer.type = type
    }
    const handleStart = (row) => {
      start(row).then(res => {
        // console.log(res)
        getTableData(true)
      })
    }
    const handleStop = (row) => {
      stop(row).then(res => {
        // console.log(res)
        location.reload()
      }).catch(error => {
        console.log(error)
      })
    }
    getTableData(true)
    return {
      tableData,
      chooseData,
      loading,
      page,
      layer,
      handleSelectionChange,
      handleAdd,
      handleEdit,
      handleDel,
      handleStart,
      handleStop,
      getTableData
    }
  }
})
</script>

<style lang="scss" scoped>
.status-indicator {
  display: inline-flex;
  align-items: center;
}

.status-on {
  color: green;
}

.status-off {
  color: red;
}

.circle {
  display: inline-block;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  margin-right: 1px;
}

.green {
  background-color: green;
}

.red {
  background-color: red;
}
</style>