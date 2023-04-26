<template>
  <div class="layout-container">
    <div class="layout-container-form flex space-between">
      <div class="layout-container-form-handle">
        <el-button type="primary" icon="el-icon-circle-plus-outline" @click="handleAdd">新增</el-button>
        <el-popconfirm title="批量删除" @confirm="handleDel(chooseData)">
          <template #reference>
            <el-button type="danger" icon="el-icon-delete" :disabled="chooseData.length === 0">批量删除</el-button>
          </template>
        </el-popconfirm>
      </div>
    </div>
    <div class="layout-container-table">
      <Table ref="table" v-model:page="page" v-loading="loading" :showIndex="true" :showSelection="true" :data="tableData"
        @getTableData="getTableData" @selection-change="handleSelectionChange">
        <!-- <el-table-column prop="username" label="名称" align="center" /> -->
        <el-table-column label="名称" align="center">
          <template #default="{ row }">
            <div>
              <div :class="['circle', row.state ? 'green' : 'red']"></div>
              {{ row.username }}
            </div>
          </template>
        </el-table-column>

        <el-table-column prop="token" label="Token" align="center" />
        <!-- <el-table-column prop="state" label="状态" align="center" /> -->
        <el-table-column label="状态" align="center">
          <template #default="scope">
            <div class="status-indicator" :class="{ 'status-on': scope.row.state, 'status-off': !scope.row.state }">
              <span>{{ scope.row.state ? '启动中' : '已停止' }}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center" fixed="right" width="275">
          <template #default="scope">
            <!-- <el-button type="success" @click="handleStart(scope.row)">启动</el-button>
            <el-button type="info" @click="handleStop(scope.row)">停止</el-button> -->
            <el-button :type="scope.row.state ? 'info' : 'success'"
              @click="scope.row.state ? handleStop(scope.row) : handleStart(scope.row)">{{ scope.row.state ? '停止' : '启动'
              }}</el-button>
            <el-button type="primary" @click="handleEdit(scope.row)">编辑</el-button>
            <el-popconfirm title="删除" @confirm="handleDel([scope.row])">
              <template #reference>
                <el-button type="danger">删除</el-button>
              </template>
            </el-popconfirm>
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
import { getAllBot, deleteBot, start, stop } from '@/api/bot'
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
    const handleEdit = (row) => {
      layer.title = '编辑电报机器人'
      layer.row = row
      layer.show = true
    }
    const handleStart = (row) => {
      start(row).then(res => {
        console.log(res)
        getTableData(true)
      })
    }
    const handleStop = (row) => {
      stop(row).then(res => {
        console.log(res)
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