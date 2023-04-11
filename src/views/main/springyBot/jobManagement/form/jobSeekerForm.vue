<template>
    <el-form class="form">
        <el-form-item label="姓名：" prop="name">
            <el-input v-model="form.name" placeholder="请输入姓名"></el-input>
        </el-form-item>
        <el-form-item label="性別：" prop="gender">
            <el-radio-group v-model="form.gender">
                <el-radio v-for="item in radioData" :key="item.label" :label="item.label">{{ item.label }}</el-radio>
            </el-radio-group>
        </el-form-item>
        <el-form-item label="出生日期：" prop="dateOfBirth">
            <el-date-picker type="date" :default-value="1980-12-30" v-model="form.dateOfBirth" value-format="YYYY-MM-DD" placeholder="请选择出生日期"></el-date-picker>
        </el-form-item>
        <el-form-item label="年龄：" prop="age">
            <el-input v-model="form.age" type="number"></el-input>
        </el-form-item>
        <el-form-item label="国籍：" prop="nationality">
            <el-select v-model="form.nationality" placeholder="请选择国籍" clearable>
                <el-option v-for="item in nativePlace" :key="item.value" :label="item.label"
                    :value="item.label"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="学历：" prop="education">
            <el-select v-model="form.education" placeholder="请选择学历" clearable>
                <el-option v-for="item in educationOptions" :key="item.label" :label="item.label" :value="item.label">
                </el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="技能：" prop="skills">
            <el-input v-model="form.skills" placeholder="请输入技能"></el-input>
        </el-form-item>
        <el-form-item label="目标职位：" prop="targetPosition">
            <el-input v-model="form.targetPosition" placeholder="请输入目标职位"></el-input>
        </el-form-item>
        <el-form-item label="手上的资源：" prop="resources">
            <el-input v-model="form.resources" placeholder="请输入手上的资源"></el-input>
        </el-form-item>
        <el-form-item label="期望薪资：" prop="expectedSalary">
            <el-input v-model.number="form.expectedSalary" placeholder="请输入期望薪资" type="number"></el-input>
        </el-form-item>
        <el-form-item label="工作经历：" prop="workExperience">
            <el-input v-model="form.workExperience" placeholder="请输入工作经历，限50字以内"></el-input>
        </el-form-item>
        <el-form-item label="自我介绍：" prop="selfIntroduction">
            <el-input v-model="form.selfIntroduction" placeholder="请输入自我介绍，限50字以内"></el-input>
        </el-form-item>
        <div>
            <el-button type="primary" @click="submit">確認</el-button>
        </div>
    </el-form>
</template>


<script>
import { defineComponent, ref, onMounted } from 'vue'
import { useRoute } from "vue-router";
import { radioData, nativePlace,educationOptions } from './enum'
import { addJobSeeker, decryptedUbWithJobSeeker } from '@/api/job'
export default defineComponent({

    setup() {
        const route = useRoute()
        let form = ref({
            name: '',
            gender: '',
            dateOfBirth: '',
            age:'',
            nationality:'',
            education:'',
            skills:'',
            targetPosition:'',
            resources:'',
            expectedSalary:'',
            workExperience:'',
            selfIntroduction:'',
        })
        onMounted(() => {
            decryptedUbWithJobSeeker({ ub: decodeURIComponent(route.query.ub) })
                .then(res => {
                    form.value.userId = res.data.userId
                    form.value.botId = res.data.botId
                    form.value.name = res.data.name
                    form.value.gender = res.data.gender
                    form.value.dateOfBirth = res.data.dateOfBirth
                    form.value.age = res.data.age
                    form.value.nationality = res.data.nationality
                    form.value.education = res.data.education
                    form.value.skills = res.data.skills
                    form.value.targetPosition = res.data.targetPosition
                    form.value.resources = res.data.resources
                    form.value.expectedSalary = res.data.expectedSalary
                    form.value.workExperience = res.data.workExperience
                    form.value.selfIntroduction = res.data.selfIntroduction
                })
        })
        return {
            form,
            radioData,
            nativePlace,
            educationOptions,
        }
    },
    methods: {
        submit() {
            let params = this.form;
            this.addForm(params)
        },
        addForm(params) {
            addJobSeeker(params)
                .then(res => {
                    this.$message({
                        type: 'success',
                        message: res.msg
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


