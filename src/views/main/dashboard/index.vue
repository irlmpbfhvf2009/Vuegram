<template>
  <div class="box">
    123
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
</style>