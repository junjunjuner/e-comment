<template>
  <div class="error">
    <span class="aaa">404</span> <br><br><br><br><br><br>
    <span class="bbb">小主不要着急，试试刷新页面哦～～ </span>
  </div>
</template>

<script>
export default {
  name: 'errorPage',
  inject: ['reload']
}
</script>

<style scoped>
  .error {
    text-align: center;
    margin-top: 25px;
    height: 600px;
  }
  .aaa{
    font-size: 250px;
    color: white;
    font-family: '微软雅黑'
  }
  .bbb{
    font-size: 80px;
    color: white;
    font-family: '微软雅黑'
  }
</style>
