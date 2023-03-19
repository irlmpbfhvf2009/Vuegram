<template>
  <div class="box">
    <label for="">token</label>
    <input type="text">
    <button>启动</button>
    <button>停止</button>
    <br>注意事项：

    <br>1. 每个机器人的token只能被一个服务端注册如果多个注册可能导致接收不到机器人消息回调

    <br>2. telegramBotsApi.registerBot()注册机器顺序会影响机器人注册接口，如果前面有个注册机器人注册失败，后面的机器人都会注册不成功，收不到消息回调。可以再最后注册一个测试机器人测试前面的是否全部注册成功。

    <br>3. 如果前面的机器人注册失败报403 或者 deleteWebhook 失败可以重新生成token或者删除该机器人，用相同的机器人名称重新创建机器人
  </div>
</template>

<script>
import { defineComponent } from 'vue'
export default defineComponent({

})
</script>

<style lang="scss" scoped>
  .box {
    padding: 15px;
  }
</style>