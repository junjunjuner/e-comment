<template>
  <el-container>
    <el-header>
      <Header></Header>
    </el-header>
    <el-container>
      <!--<el-aside>-->
        <Aside></Aside>
      <!--</el-aside>-->
      <el-main><router-view></router-view></el-main>
    </el-container>
  </el-container>
</template>

<script>
import Header from './Header/Header'
import Aside from './Aside/Aside'
export default {
  name: 'Layout',
  components: {Aside, Header}
}
</script>

<style scoped>
  .el-header, .el-footer {
    background-color: #2d3d5f;
    /*color: #333;*/
    text-align: center;
    line-height: 60px;
    height: 72px;
  }

  .el-aside {
    background-color: #D3DCE6;
    color: #333;
    text-align: center;
    height: 900px;
    float: left;
    /*line-height: 200px;*/
  }
  .el-main {
    color: #333;
    text-align: center;
    margin: 30px;
    /*line-height: 160px;*/
  }
</style>
