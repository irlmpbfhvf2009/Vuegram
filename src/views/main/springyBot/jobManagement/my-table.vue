<template>
  <div class="layout-container">
    <div class="layout-container-table">
      <Table ref="table" :data="tableData" @getTableData="getTableData" @selection-change="handleSelectionChange">
        <el-table-column prop="company" label="公司" align="center" />
        <el-table-column prop="position" label="职位" align="center" />
        <el-table-column prop="baseSalary" label="底薪" align="center" />
        <el-table-column prop="commission" label="提成" align="center" />
        <el-table-column prop="workTime" label="上班时间" align="center" />
        <el-table-column prop="requirements" label="要求内容" align="center" />
        <el-table-column prop="location" label="🐌地址" align="center" />
        <el-table-column prop="flightNumber" label="✈️咨询飞机号" align="center" />
      </Table>

      <Table ref="table" :data="tableData" @getTableData="getTableData" @selection-change="handleSelectionChange">
        <el-table-column prop="name" label="姓名" align="center" />
        <el-table-column prop="gender" label="性别" align="center" />
        <el-table-column prop="dateOfBirth" label="出生日期" align="center" />
        <el-table-column prop="age" label="年龄" align="center" />
        <el-table-column prop="nationality" label="国籍" align="center" />
        <el-table-column prop="education" label="学历" align="center" />
        <el-table-column prop="skills" label="技能" align="center" />
        <el-table-column prop="targetPosition" label="目标职位" align="center" />
        <el-table-column prop="resources" label="手上资源" align="center" />
        <el-table-column prop="expectedSalary" label="期望薪资" align="center" />
        <el-table-column prop="workExperience" label="工作经历" align="center" />
        <el-table-column prop="selfIntroduction" label="自我介绍" align="center" />
        <el-table-column prop="flightNumber" label="✈️咨询飞机号" align="center" />
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
  },
  setup() {

    const activeCategory = inject('active')
    const tableData = ref([])
    const chooseData = ref([])
    const handleSelectionChange = (val) => {
      chooseData.value = val
    }
    // 获取表格数据
    const getTableData = (init, val) => {
      let data = []
      if(val.jobPostingDTO){
        data = data.concat(val.jobPostingDTO)
      }
      if(val.jobSeekerDTO){
        data = data.concat(val.jobSeekerDTO)
      }
      tableData.value = data
    }


    watch(activeCategory, (newVal) => {
      getTableData(true, newVal)
    })
    return {
      tableData,
      chooseData,
      handleSelectionChange,
      getTableData,
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