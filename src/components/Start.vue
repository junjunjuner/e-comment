<template>
  <div id="whole">
    <div class="header">
      <span>电商评论展示及分类系统</span>
    </div>
    <div class="select-content">
      <MilkTea class="start-mytea"></MilkTea>
      <div class="right">
        <div class="svg-wrapper">
          <svg height="60" width="320" xmlns="http://www.w3.org/2000/svg">
            <rect class="shape" height="60" width="320" />
          </svg>
          <div class="button" @click="param">电商参数展示</div>
        </div>
        <div class="svg-wrapper">
          <svg height="60" width="320" xmlns="http://www.w3.org/2000/svg">
            <rect class="shape" height="60" width="320" />
          </svg>
          <div class="button" @click="comm">电商评论展示</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import MilkTea from './Common/MilkTea'
export default {
  name: 'Start',
  components: { MilkTea },
  methods: {
    param () {
      this.$router.push({ path: '/paramers' })
    },
    comm () {
      this.$router.push({ path: '/comment' })
    }
  }
}
</script>

<style scoped>
/*body {*/
/*margin: 0;*/
/*padding: 0;*/
/*}*/
.header {
  width: 100%;
  text-align: center;
  margin-top: 85px;
}
.select-content {
  width: 1200px;
  position: absolute;
  left: 50%;
  margin-left: -600px;
}
.start-mytea {
  float: left;
}
.header span {
  /*background: #F9D3C0;*/
  color: rgb(89, 62, 71);
  font-size: 50px;
  /*position: relative;*/
  /*left: 530px;*/
  /*top: 85px;*/
  font-weight: bolder;
}
/*html, body {*/
/*background: #333;*/
/*height: 100%;*/
/*overflow: hidden;*/
/*text-align: center;*/
/*}*/
.right {
  float: right;
  margin-right: 19%;
  margin-top: 28%;
}

.svg-wrapper {
  height: 60px;
  margin: 0 auto;
  position: relative;
  top: 50%;
  transform: translateY(-50%);
  width: 320px;
  margin-bottom: 100px;
  cursor: pointer;
}

.shape {
  fill: transparent;
  stroke-dasharray: 180 540;
  stroke-dashoffset: -474;
  stroke-width: 8px;
  stroke: #d96c61;
}

.button {
  color: #4a313d;
  /*font-family: 'Roboto Condensed';*/
  font-family: 微软雅黑;
  font-size: 22px;
  letter-spacing: 8px;
  line-height: 32px;
  position: relative;
  top: -48px;
  margin-left: 50px;
}
.button:hover {
  font-weight: bold;
}

@keyframes draw {
  0% {
    stroke-dasharray: 140 540;
    stroke-dashoffset: -474;
    stroke-width: 8px;
  }
  100% {
    stroke-dasharray: 760;
    stroke-dashoffset: 0;
    stroke-width: 2px;
  }
}

.svg-wrapper:hover .shape {
  -webkit-animation: 0.5s draw linear forwards;
  animation: 0.5s draw linear forwards;
}
</style>
