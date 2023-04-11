<template>
  <div class="box">
    <div>
      设计方向 : 今日数据概览,商户在线状态,机器人运作时长,报表,客户意见反馈
    </div>
   
  </div>
</template>

<script>
import { defineComponent,ref,watch } from 'vue'
import { start,stop } from '@/api/bot'
export default defineComponent({
  
  setup() {
      let params = ref({
        username:'',
        token:'',
      })
    return{
      params,
    }
  },
  methods:{
      startBtn(){
        start().then(res=>{
          console.log(res)
        })
      },
      stopBtn(){
        console.log(this.params)
        stop().then(res=>{
          console.log(res)
        })
      }
    },
})
</script>

<style lang="scss" scoped>
  .box {
    padding: 15px;
  }
  div {
    margin-bottom: 20px;
  }
</style>