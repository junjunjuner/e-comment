<template>
  <div>
    <div class="param">
      <el-table :data="rowdata" stripe style="width: 100%">
        <div v-for="(item,index) in dataLabels" :key="index">
          <!--<el-table-column  :prop="item.dataName" :label="item.label" :width="item.width">-->
            <el-table-column  :prop="item.label" :label="item.label" :width="item.width">
          </el-table-column>
        </div>
      </el-table>
    </div>
    <div class="comment">
      <PCommentchild :inputdata="producturl"></PCommentchild>
    </div>
  </div>
</template>

<script>
import PCommentchild from './PCommentchild'
export default {
  name: 'PComment',
  components: {PCommentchild},
  data () {
    return {
      rowdata: {},
      producturl: '',
      dataLabels: [
        {
          dataName: 'p_type',
          label: '产品类别',
          width: '150',
          clientHeight: true
        },
        {
          dataName: 'brand',
          label: '商品品牌',
          width: '100',
          clientHeight: true
        },
        {
          dataName: 'p_Name',
          label: '商品名称',
          width: '300',
          clientHeight: true
        },
        // {
        //   dataName: 'PreferentialPrice',
        //   label: '价格',
        //   width: '150',
        //   clientHeight: true
        // },
        {
          dataName: 'X_name',
          label: '商品型号',
          width: '150',
          clientHeight: true
        },
        {
          dataName: 'source',
          label: '数据来源',
          width: '120',
          clientHeight: true
        },
        {
          dataName: 'x_type',
          label: '商品详情',
          width: '500px',
          clientHeight: true
        },
        {
          dataName: 'keyword',
          label: '评论关键词',
          width: '300',
          clientHeight: true
        }
      ]
    }
  },
  methods: {
    getParamer () {
      let vm = this
      let paramer = JSON.parse(vm.$route.query.row)
      vm.rowdata = [paramer]
      console.log(vm.rowdata)
      // vm.producturl = paramer.url
      vm.producturl = paramer.商品链接
      console.log(vm.producturl)
    }
  },
  mounted () {
    this.getParamer()
  }
}
</script>

<style scoped>

</style>
