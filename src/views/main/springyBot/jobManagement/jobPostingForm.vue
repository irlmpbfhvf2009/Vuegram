<template>
    <el-form class="form">
        <el-form-item label="公司名称：" prop="company">
            <el-input v-model="form.company" placeholder="请输入公司名称"></el-input>
        </el-form-item>
        <el-form-item label="职位名称：" prop="position">
            <el-input v-model="form.position" placeholder="请输入职位名称"></el-input>
        </el-form-item>
        <el-form-item label="底薪：" prop="baseSalary">
            <el-input v-model="form.baseSalary" placeholder="请输入底薪"></el-input>
        </el-form-item>
        <el-form-item label="提成：" prop="commission">
            <el-input v-model="form.commission" placeholder="请输入提成"></el-input>
        </el-form-item>
        <el-form-item label="上班时间：" prop="workTime">
            <el-input  v-model="form.workTime" placeholder="请输入上班时间"></el-input>
        </el-form-item>
        <el-form-item label="要求内容：" prop="requirements">
            <el-input type="textarea" v-model="form.requirements" maxlength="50" placeholder="限50字以内"></el-input>
        </el-form-item>
        <el-form-item label="🐌地址：" prop="location">
            <el-input v-model="form.location" placeholder="请输入地址"></el-input>
        </el-form-item>
        <el-form-item label="✈️咨询飞机号：" prop="flightNumber">
            <el-input v-model="form.flightNumber" placeholder="请输入咨询飞机号"></el-input>
        </el-form-item>
        <div>
            <el-button type="primary" @click="submit">確認</el-button>
        </div>
    </el-form>
</template>


<script>
import { defineComponent, ref, reactive,onMounted   } from 'vue'
import { useRoute } from "vue-router";
import { radioData, nativePlace } from './enum'
import { addJobPosting,decryptedUbWithJobPosting } from '@/api/job'
export default defineComponent({
    components: {

    },
    setup() {
        const route = useRoute()
        let form = ref({
            userId : '',
            botId : '',
            company: '',
            position: '',
            baseSalary: '',
            commission: '',
            workTime: '',
            requirements: '',
            location: '',
            flightNumber: '',
        })

        onMounted(() => {
            decryptedUbWithJobPosting({ub:decodeURIComponent(route.query.ub)})
                .then(res => {
                    console.log(res.data)
                    form.value.userId = res.data.userId
                    form.value.botId = res.data.botId
                    form.value.company = res.data.company
                    form.value.position = res.data.position
                    form.value.baseSalary = res.data.baseSalary
                    form.value.commission = res.data.commission
                    form.value.workTime = res.data.workTime
                    form.value.requirements = res.data.requirements
                    form.value.location = res.data.location
                    form.value.flightNumber = res.data.flightNumber
                })
        })

        return {
            form,
            radioData,
            nativePlace,
        }
    },
    methods: {
        submit() {
            let params = this.form;
            this.addForm(params)

        },
        addForm(params){
            addJobPosting(params)
            .then(res => {
                this.$message({
                    type:'success',
                    message:res.msg
                })
            })
        },
    },
})
</script>

<style lang="scss" scoped>
.form {
    max-width: 600px;
    margin: 50px auto 0;
    padding: 30px;
    border: 1px solid #ccc;
    border-radius: 5px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.el-form-item__label {
    font-weight: bold;
}

.el-form-item__content {
    margin-bottom: 20px;
}

.el-input {
    width: 100%;
}
</style>


