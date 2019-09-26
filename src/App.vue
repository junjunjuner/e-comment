<template>
  <div id="app">
    <!--<img src="./assets/logo.png">-->
    <router-view v-if="isRouterAlive"></router-view>
  </div>
</template>

<script>
export default {
  name: 'App',
  provide () {
    return {
      reload: this.reload
    }
  },
  data () {
    return {
      isRouterAlive: true
    }
  },
  methods: {
    reload () {
      this.isRouterAlive = false
      this.$nextTick(function () {
        this.isRouterAlive = true
      })
    }
  }
}
</script>

<style>
/*#app {*/
  /*font-family: 'Avenir', Helvetica, Arial, sans-serif;*/
  /*-webkit-font-smoothing: antialiased;*/
  /*-moz-osx-font-smoothing: grayscale;*/
  /*text-align: center;*/
  /*color: #2c3e50;*/
  /*margin-top: 60px;*/
/*}*/
  html,body{
    /*width: 100%;*/
    /*height: 100%;*/
    margin: 0;
    padding: 0;
    /*background: #333;*/
    background: #d8e1e8;
    font-family: 微软雅黑;
  }
/*.el-button {*/
  /*color: #FFF;*/
  /*background-color: #409EFF;*/
  /*border-color: #409EFF;*/
/*}*/
/*.el-button:active,.el-button:hover,.el-button:focus{*/
  /*color: #606266 !important;*/
  /*border-color: #DCDFE6 !important;*/
  /*background-color: #FFF !important;*/
/*}*/
</style>
