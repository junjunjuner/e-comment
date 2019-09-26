<template>
  <div class="Asidecont">
    <el-menu class="el-menu-vertical-demo"
             :default-active="$route.path"
             :default-openeds="openeds"
             :collapse="isCollapse"
             active-text-color="#ffd04b"
             router>
      <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span slot="title">电商类</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="/comment">电商评价类信息</el-menu-item>
          <el-menu-item index="/paramers">电商参数类信息</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
    </el-menu>
  </div>
</template>

<script>
import Bus from '../../assets/js/bus'
export default {
  name: 'Aside',
  data () {
    return {
      openeds: ['1'],
      icon: 'true',
      isCollapse: false
    }
  },
  created () {
    let _this = this
    Bus.$on('send', (data) => {
      _this.isCollapse = data
      console.log(_this.isCollapse)
    })
  }
}

</script>

<style scoped>
  .el-menu-vertical-demo {
    height: 400px;
    margin-top: 16px;
  }
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    height: 400px;
  }
</style>
