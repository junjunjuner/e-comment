<template>
  <div>
    <div>
      <el-button @click="prev" class="back">点击返回</el-button>
      <div id="select">
        <el-input class="input" type="text" v-model="search" placeholder="此处可搜索商品详情" width="200px" @keyup.enter.native="mysearch(search)">
          <el-button slot="append" icon="el-icon-search" @click="mysearch(search)"></el-button>
        </el-input>
        <el-button type="primary" class="out" @click="exportClick()">导出数据</el-button>
        <el-button @click="expandAll" class="expand-all">{{expand? "全部展开": "全部收起"}}</el-button>
      </div>
      <div id="form">
        <!--v-loading="loading"-->
        <el-table
          :data="newData"
          stripe style="width: 100%"
          ref="refTable"
          @row-click="expandChange"
        >
          <div v-for="(item,index) in dataLabels" :key="index">
            <el-table-column :prop="item.label" :label="item.label" :width="item.width" :show-overflow-tooltip="expand">
              <!--<el-table-column :prop="item.dataName" :label="item.label" :width="item.width" :show-overflow-tooltip="expand">-->
              <!--<template slot-scope="scope">-->
                <!--&lt;!&ndash;<span class="col-cont" v-html="showDate(scope.row[item.dataName])"></span>&ndash;&gt;-->
                <!--<span class="col-cont" v-html="showDate(scope.row[item.label])"></span>-->
              <!--</template>-->
            </el-table-column>
          </div>
          <el-table-column lable="操作" type="expand" width="120px" fixed="right">
            <template slot-scope="scope">
              <el-form label-position="left" inline class="demo-table-expand" v-for="(item,index) in scope.row" :key="index">
                <el-form-item :label="index" class="label">
                  <span>{{item }}</span>
                </el-form-item>
              </el-form>
              <!--<tr v-show="scope.row.editing">{{item.key}}:{{item.value}}</tr>-->
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <!--分页功能-->
    <el-pagination
      class="page"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      layout="total, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
  </div>
</template>

<script>
import moment from 'moment'
export default {
  name: 'PCommentchild',
  props: {
    inputdata: String,
    required: true
  },
  // props: ['inputdata'],
  data () {
    return {
      indata: '',
      value: '',
      loading: true,
      // 筛选后数据
      newData: [],
      dataLabels: [
        {
          dataName: 'type',
          label: '产品类别',
          width: '150',
          clientHeight: true
        },
        {
          dataName: 'brand',
          label: '商品品牌',
          width: '150',
          clientHeight: true
        },
        {
          dataName: 'name',
          label: '商品名称',
          width: '300',
          clientHeight: true
        },
        {
          dataName: 'comment',
          label: '评价详情',
          width: '500',
          clientHeight: true
        },
        {
          dataName: 'commenttype',
          label: '评价类型',
          width: '150',
          clientHeight: true
        },
        {
          dataName: 'source',
          label: '数据来源',
          width: '150',
          clientHeight: true
        }
      ],
      type: '',
      finder: {},
      search: '',
      // 分页功能
      currentPage: 1,
      total: 0,
      // 导出的list
      exportList: [],
      // 全部收起
      expand: true
    }
  },
  methods: {
    // 点击某一行展开数据
    expandChange (row, index, e) {
      this.$refs.refTable.toggleRowExpansion(row)
    },
    // 点击展开与折叠
    expandAll () {
      this.expand = !this.expand
    },
    // 点击返回
    prev () {
      this.$router.go(-1)
    },
    // 分页功能
    handleCurrentChange (val) {
      console.log(`当前页: ${val}`)
      this.currentPage = val
      this.getdata()
    },
    // 搜索关键词高亮
    showDate (val) {
      val = val + ''
      if (val.indexOf(this.search) !== -1 && this.search !== '') {
        return val.replace(this.search, '<font color="red">' + this.search + '</font>')
      } else {
        return val
      }
    },

    // 从后台获取数据
    getdata: function () {
      var vm = this
      this.$api.api.pcomment({
        url: this.indata,
        search: this.search,
        page: vm.currentPage
      }).then(function (response) {
        vm.loading = false
        console.log('hahhahaha.enter!!!!')
        // response.setHeaderValue('Access-Control-Allow-Origin', '*');
        vm.total = response.total_count
        vm.newData = response.result
      })
        .catch(error => {
          console.log('发生错误：', error)
          error.$message('抱歉，页面报错了（- -）')
        })
    },

    exportClick () {
      var vm = this
      this.$api.api.pcommentExportdata({
        url: this.indata,
        search: vm.search
      }).then(function (response) {
        // response.setHeaderValue('Access-Control-Allow-Origin', '*');
        vm.total = response.total_count
        vm.exportList = response.result
        vm.export2Excel()
      })
        .catch(error => {
          console.log('导出数据发生错误：', error)
          error.$message('抱歉，页面报错了（- -）')
        })
    },

    export2Excel () {
      require.ensure([], () => {
        const {jsonExcel} = require('../../vendor/Export2Excel')
        const tHeader = ['产品类别', '商品品牌', '商品名称', '评价详情', '评价类型', '数据来源']
        const filterVal = ['type', 'brand', 'name', 'comment', 'commenttype', 'source']
        const list = this.exportList
        const data = this.formatJson(filterVal, list)
        jsonExcel(tHeader, data, '电商评价数据' + moment(new Date()).format('YYYYMMDDHHmmss'))
      })
    },

    formatJson (filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => v[j]))
    },
    mysearch (search) {
      this.getdata()
    }
  },
  watch: {
    inputdata: function (newvalue, oldvalue) {
      this.indata = newvalue
      this.getdata()
    }
    // search: function () {
    //   this.getdata()
    // }
  },
  mounted () {
    this.inputdata()
  }
}
</script>

<style scoped>
  .back {
    float: left;
  }
  #select {
    margin-bottom: 20px;
    margin-top: 30px;
  }
  .input{
    width: 300px;
    /*margin-left: 150px;*/
    margin-right: 40px;
  }
  .out {
    /*margin-left: 300px;*/
    color: #FFF !important;
    background-color: #409EFF !important;
    border-color: #409EFF !important;
  }
  .expand-all {
    float: right;
    color: #606266 !important;
    border-color: #DCDFE6 !important;
    background-color: #FFF !important;
  }
  .page {
    margin-top: 10px;
  }
  .demo-table-expand .el-form-item {
    margin-bottom: 0 !important;
  }
  .demo-table-expand .label {
    font-weight: bold;
  }
  .demo-table-expand .label span {
    font-weight: normal;
  }

</style>
