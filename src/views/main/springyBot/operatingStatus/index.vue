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

        <el-table-column label="名称" align="center">
          <template #default="{ row }">
            <div>
              {{ row.username }}{{ row.botId === null ? '' : " [ " + row.botId + " ] " }}
            </div>
            
          </template>
        </el-table-column>

        <el-table-column label="Token" align="center">
          <template #default="scope">
            <el-tooltip class="item" :content="scope.row.token" placement="right">
              <div class="truncate" ref="copyContent" @click="copyText(scope.row.token)">
                <el-button>复制</el-button>
              </div>
            </el-tooltip>
          </template>
        </el-table-column>

        <el-table-column prop="botType" label="类型" align="center">
          <template #default="scope">
            <template v-if="scope.row.botType === 'talent'">
              人才招募
            </template>
            <template v-if="scope.row.botType === 'demand'">
              供应需求
            </template>
            <template v-else-if="scope.row.botType === 'triSpeak'">
              群组管理
            </template>
            <template v-else-if="scope.row.botType === 'coolbao'">
              测试
            </template>
            <!-- <template v-else>
              {{ scope.row.botType }}
            </template> -->
          </template>
        </el-table-column>
        <el-table-column label="运行模式" align="center">
          <template #default="{ row }">
            <div>
              <div :class="['circle', row.state ? 'green' : 'red']"></div>
              {{ row.botModel }}
              <el-switch v-model="row.state" :active-value="true" :inactive-value="false"
              @change="row.state ? handleStart(row) : handleStop(row)"></el-switch>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center" fixed="right" width="275">
          <template #default="scope">
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
import { getAllBot, deleteBot, start, stop } from '@/api/springyBot'
import Layer from './layer.vue'
import { ElMessage } from 'element-plus'
import Clipboard from 'clipboard';

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
        // console.log(res)
        ElMessage({
            type: 'success',
            message: res.msg
          })
      })
    }
    const handleStop = (row) => {
      stop(row).then(res => {
        // console.log(res)
        ElMessage({
            type: 'success',
            message: res.msg
          })
        // location.reload()
      }).catch(error => {
        console.log(error)
      })
    }
    getTableData(true)

    const copyText = (text) => {
      const clipboard = new Clipboard('.truncate', {
        text: () => text
      });

      clipboard.on('success', () => {
        ElMessage({
          type: 'success',
          message: '已成功复制到剪贴板'
        })
        clipboard.destroy();
      });

      clipboard.on('error', () => {
        ElMessage({
          type: 'error',
          message: '复制失败，请手动复制'
        })
        clipboard.destroy();
      });

    };
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
      getTableData,
      copyText,
    }
  }
})
</script>

<style lang="css" scoped>
@import "styles.css";
</style>
