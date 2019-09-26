<template>
  <div>
    <i :class="isCollapse? 'el-icon-s-unfold myicon':'el-icon-s-fold myicon'" @click="onclick()"></i>
    <h1 @click="prev">电商评论展示及分类系统</h1>
  </div>
</template>

<script>
import Bus from '../../assets/js/bus'
export default {
  name: 'Header',
  data () {
    return {
      isCollapse: false
    }
  },
  methods: {
    onclick () {
      this.isCollapse = !this.isCollapse
      Bus.$emit('send', this.isCollapse)
    },
    prev () {
      this.$router.push({path: '/'}) // 返回根目录
      // this.$router.go(-1) // 返回上一级
    }
  }
}
</script>

<style scoped>
  h1 {
    font-size: 25px;
    margin: 2px 88px;
    float: left;
    cursor: pointer;
    color: rgb(185, 198, 215);
  }
  .myicon {
    color: #b7c4d5;
    margin-top: 15px;
    font-weight: 100;
    font-size: 36px;
    cursor: pointer;
    float: left;
  }

</style>
