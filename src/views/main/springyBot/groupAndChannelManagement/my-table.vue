<template>
  <div class="layout-container">
    <div class="layout-container-table">
      <Table ref="table" :data="tableData" @getTableData="getTableData" @selection-change="handleSelectionChange">
        <el-table-column prop="inviteId" label="邀请人ID" align="center" />
        <el-table-column prop="inviteUsername" label="邀请人TG" align="center" />
        <el-table-column prop="link" label="链结" align="center" />
      </Table>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref, reactive, inject, watch } from 'vue'
import Table from '@/components/table/index.vue'
export default defineComponent({
  components: {
    Table,
    // Layer
  },
  setup() {
    const activeCategory = inject('active')
    const loading = ref(true)
    const tableData = ref([])
    const chooseData = ref([])
    const handleSelectionChange = (val) => {
      chooseData.value = val
    }
    // 获取表格数据
    const getTableData = (init, val) => {
      if (val.robotGroupManagementDTO) {
        let data = val.robotGroupManagementDTO
        tableData.value = data
      }
      if (val.robotChannelManagementDTO) {
        let data = val.robotChannelManagementDTO
        tableData.value = data
      }
    }
    watch(activeCategory, (newVal) => {
      getTableData(true, newVal)
    })
    // getTableData(true)
    return {
      // query,
      tableData,
      chooseData,
      loading,
      handleSelectionChange,
      getTableData
    }
  }
})
</script>

<style lang="scss" scoped>
.layout-container {
  height: 100%;
  margin: 0 0 0 10px;
  width: calc(100% - 10px);
}
</style>