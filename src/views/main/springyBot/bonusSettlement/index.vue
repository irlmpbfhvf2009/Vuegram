<template>
  <div class="layout-container">
    <div class="layout-container-form flex space-between">
      <div class="layout-container-form-search">
        <el-input v-model="query.input" placeholder="请输入关键词进行检索" @change="getTableData(true)"></el-input>
        <el-button type="primary" icon="el-icon-search" class="search-btn" @click="getTableData(true)">搜索</el-button>
      </div>
    </div>
    <div class="layout-container-table">
      <Table ref="table" v-model:page="page" v-loading="loading" :data="tableData" @getTableData="getTableData"
        @selection-change="handleSelectionChange">
        <el-table-column label="用户" align="center">
          <template #default="{ row }">
            <div>
              {{ "[ " + row.userId + " ]" }}
              <span v-if="row.username">{{ "@" + row.username }}</span>
              <span v-else>{{ row.firstname + row.lastname }}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="邀请人数" align="center">
          <template #default="{ row }">
            <div>
              {{ row.pendingInvitations == "" ? 0 : row.pendingInvitations.length }}
            </div>
          </template>
        </el-table-column>
        <el-table-column label="频道/群组" align="center">
          <template #default="{ row }">
            <div>
              {{ row.chatTitle }}
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="outstandingAmount" label="未結金額" align="center" />
        <el-table-column prop="settlementAmount" label="累积结算奖金" align="center" />
        <el-table-column label="累计邀请人数" align="center">
          <template #default="{ row }">
            <div>
              {{ row.accumulatedInvitations == "" ? 0 : row.accumulatedInvitations.length }}
            </div>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center" fixed="right" width="200">
          <template #default="{ row }">
            <el-popconfirm title="确认将清空邀请人数及未结金额" @confirm="handleSettlement(row)">
              <template #reference>
                <el-button type="danger">结算</el-button>
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
import { del } from '@/api/table'
import { getAllInvitationBonusUser, settlement } from '@/api/invitationBonusUser'
import Layer from './layer.vue'
import { ElMessage } from 'element-plus'
export default defineComponent({
  name: 'crudTable',
  components: {
    Table,
    Layer
  },
  setup() {
    // 存储搜索用的数据
    const query = reactive({
      input: ''
    })
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
        ...query
      }
      getAllInvitationBonusUser(params)
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
    const handleSettlement = (data) => {
      settlement(data)
        .then(res => {
          console.log(res)
          ElMessage({
            type: 'success',
            message: '結算成功'
          })
          getTableData(tableData.value.length === 1 ? true : false)
        })
    }
    // 新增弹窗功能
    const handleAdd = () => {
      layer.title = '新增数据'
      layer.show = true
      delete layer.row
    }
    // 编辑弹窗功能
    const handleEdit = (row) => {
      layer.title = '编辑数据'
      layer.row = row
      layer.show = true
    }
    getTableData(true)
    return {
      query,
      tableData,
      chooseData,
      loading,
      page,
      layer,
      handleSelectionChange,
      handleAdd,
      handleEdit,
      handleSettlement,
      getTableData
    }
  }
})
</script>

<style lang="scss" scoped></style>