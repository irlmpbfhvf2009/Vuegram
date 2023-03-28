<template>
    <el-form class="form">
        <el-form-item label="姓名：" prop="name">
            <el-input v-model="form.name" placeholder="请输入姓名"></el-input>
        </el-form-item>
        <el-form-item label="性別：">
            <el-radio-group v-model="form.value">
                <el-radio v-for="item in radioData" :key="item.value" :label="item.value">{{ item.label }}</el-radio>
            </el-radio-group>
        </el-form-item>
        <el-form-item label="出生日期：" prop="dateOfBirth">
            <el-date-picker type="date" placeholder="请选择出生日期" v-model="form.dateOfBirth"></el-date-picker>
        </el-form-item>
        <el-form-item label="年龄：" v-model.number="form.age" type="number" prop="age">
            <el-input></el-input>
        </el-form-item>
        <el-form-item label="国籍：" prop="nationality">
            <el-select v-model="form.nationality" placeholder="请选择国籍" clearable>
                <el-option v-for="item in nativePlace" :key="item.value" :label="item.label"
                    :value="item.value"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="学历：" prop="education">
            <el-select v-model="form.education" placeholder="请选择学历">
                <el-option v-for="item in educationOptions" :key="item.value" :label="item.label" :value="item.value">
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
            <el-input  v-model="form.resources" placeholder="请输入手上的资源"></el-input>
        </el-form-item>
        <el-form-item label="期望薪资：" prop="expectedSalary">
            <el-input  v-model.number="form.expectedSalary" placeholder="请输入期望薪资" type="number"></el-input>
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
import { defineComponent, ref, reactive } from 'vue'
import { useRoute } from "vue-router";
import { selectData, radioData, nativePlace } from './enum'
export default defineComponent({
    components: {

    },
    setup() {
        const route = useRoute()
        let form = ref({
            name: '',
            gender: '',
            radioData: '',
        })
        const userId = route.query.userId;
        const username = route.query.username;
        console.log("userId=" + userId)
        console.log("username=" + username)


        return {
            form,
            radioData,
            nativePlace,
        }
    },
    methods: {
        submit() {

        }
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


