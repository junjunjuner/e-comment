<template>
  <div>
    <div id="select">
      <div class="down-select">
        <span>产品类别：&#12288;</span>
        <el-select v-model="type" clearable filterable placeholder="请选择">
          <el-option v-for="(item,index) in options" :key="index" :label="item" :value="item"></el-option>
        </el-select>
      </div>
      <el-input
        class="input"
        type="text"
        v-model="search"
        placeholder="此处可搜索商品详情"
        width="200px"
        @keyup.enter.native="mysearch(search)"
        style="flaot:left;margin-right:-20px;"
      >
        <el-button slot="append" icon="el-icon-search" @click="mysearch(search)"></el-button>
      </el-input>
      <el-button type="primary" class="out" @click="exportClick()">导出数据</el-button>
      <el-button @click="expandAll" class="expand-all">{{expand? "全部展开": "全部收起"}}</el-button>
    </div>
    <div id="form">
      <!--v-loading="loading"-->
      <el-table :data="newData" stripe style="width: 100%" ref="refTable" @row-click="expandChange">
        <div v-for="(item,index) in dataLabels" :key="index">
          <!--<el-table-column  :prop="item.dataName" :label="item.label" :width="item.width" :show-overflow-tooltip="expand">-->
          <el-table-column
            :prop="item.label"
            :label="item.label"
            :width="item.width"
            :show-overflow-tooltip="expand"
          >
            <!--<template slot-scope="scope">-->
            <!--&lt;!&ndash;<span class="col-cont" v-html="showDate(scope.row[item.dataName])"></span>&ndash;&gt;-->
            <!--<span class="col-cont" v-html="showDate(scope.row[item.label])"></span>-->
            <!--</template>-->
          </el-table-column>
        </div>
        <el-table-column label="操作" width="120px" fixed="right">
          <template slot-scope="scope">
            <el-button class="comment-button" @click="changePage(scope.$index,scope.row)">查看评论</el-button>
          </template>
        </el-table-column>
        <el-table-column type="expand" fixed="right">
          <template slot-scope="scope">
            <el-form
              label-position="left"
              class="demo-table-expand"
              v-for="(item,index) in scope.row"
              :key="index"
            >
              <el-form-item :label="index" class="label">
                <span>{{item }}</span>
              </el-form-item>
            </el-form>
            <!--<tr v-show="scope.row.editing">{{item.key}}:{{item.value}}</tr>-->
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!--分页功能-->
    <el-pagination
      class="page"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      layout="total, prev, pager, next, jumper"
      :total="total"
    ></el-pagination>
  </div>
</template>

<script>
/* eslint-disable */
import moment from "moment";
export default {
  name: "Paramers",
  data() {
    return {
      detail: false,
      loading: true,
      // 类别
      options: [],
      value: "",
      // 筛选后数据
      newData: [],
      dataLabels: [
        {
          dataName: "p_type",
          label: "产品类别",
          width: "",
          clientHeight: true
        },
        {
          dataName: "brand",
          label: "商品品牌",
          width: "",
          clientHeight: true
        },
        {
          dataName: "p_Name",
          label: "商品名称",
          width: "260px",
          clientHeight: true
        },
        // {
        //   dataName: 'PreferentialPrice',
        //   label: '价格',
        //   width: '',
        //   clientHeight: true
        // },
        {
          dataName: "X_name",
          label: "商品型号",
          width: "150px",
          clientHeight: true
        },
        {
          dataName: "source",
          label: "数据来源",
          width: "",
          clientHeight: true
        },
        {
          dataName: "x_type",
          label: "商品详情",
          width: "500px",
          clientHeight: true
        },
        {
          dataName: "keyword",
          label: "评论关键词",
          width: "280px",
          clientHeight: true
        }
      ],
      type: "",
      finder: {},
      search: "",
      // 分页功能
      currentPage: 1,
      total: 0,
      // 导出的list
      exportList: [],
      // 全部收起
      expand: true
    };
  },
  methods: {
    expandAll() {
      this.expand = !this.expand;
    },
    // 点击某一行展开数据
    expandChange(row, index, e) {
      this.$refs.refTable.toggleRowExpansion(row);
    },
    // 查看评论
    changePage(index, row) {
      let stringRow = JSON.stringify(row);
      this.$router.push({ name: "PComment", query: { row: stringRow } });
    },
    // 分页功能
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.currentPage = val;
      this.getdata();
    },
    // 搜索关键词高亮
    showDate(val) {
      val = val + "";
      if (val.indexOf(this.search) !== -1 && this.search !== "") {
        return val.replace(
          this.search,
          '<font color="red">' + this.search + "</font>"
        );
      } else {
        return val;
      }
    },

    // 从后台获取下拉菜单
    getmenu: function() {
      var vm = this;
      this.$api.api.paramMenu().then(function(response) {
        vm.options = response.menu_list;
        console.log(vm.options);
      });
    },
    // 从后台获取数据
    getdata: function() {
      var vm = this;
      this.$api.api
        .param({
          type: this.type,
          search: this.search,
          page: vm.currentPage
        })
        .then(function(response) {
          vm.loading = false;
          console.log("hahhahaha.enter!!!!");
          vm.total = response.total_count;
          let _data = response.result;
          let length = response.result.length;
          console.log(length);
          vm.newData = _data;
          console.log(vm.newData);
        })
        .catch(error => {
          // vm.$router.push({name: '404'})
          console.log("发生错误：", error);
        });
    },
    // 数据导出
    exportClick() {
      var vm = this;
      this.$api.api
        .paramExportdata({
          type: vm.type,
          search: vm.search
        })
        .then(function(response) {
          // response.setHeaderValue('Access-Control-Allow-Origin', '*');
          vm.total = response.total_count;
          vm.exportList = response.result;
          vm.export2Excel();
        })
        .catch(error => {
          // vm.$router.push({name: '404'})
          console.log("导出数据发生错误：", error);
        });
    },

    export2Excel() {
      require.ensure([], () => {
        const { jsonExcel } = require("../../vendor/Export2Excel");
        const tHeader = [
          "产品类别",
          "商品品牌",
          "商品名称",
          "商品价格",
          "商品型号",
          "数据来源",
          "商品特性",
          "评论关键词"
        ];
        const filterVal = [
          "p_type",
          "brand",
          "p_Name",
          "PreferentialPrice",
          "X_name",
          "source",
          "x_type",
          "keyword"
        ];
        const list = this.exportList;
        const data = this.formatJson(filterVal, list);
        jsonExcel(
          tHeader,
          data,
          "电商参数数据" + moment(new Date()).format("YYYYMMDDHHmmss")
        );
      });
    },

    formatJson(filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => v[j]));
    },
    mysearch(search) {
      this.getdata();
    }
  },
  watch: {
    type: function() {
      this.getdata();
    }
    // search: function () {
    //   this.getdata()
    // }
  },
  mounted() {
    this.getmenu();
    this.getdata();
  }
};
</script>

<style scoped>
#select {
  margin-bottom: 20px;
}
.down-select {
  float: left;
  margin-left: 38px;
  color: #303133;
  font-family: 微软雅黑;
  font-size: 14px;
}
.input {
  width: 300px;
}
.out {
  margin-left: 5%;
  color: #fff !important;
  background-color: #409eff !important;
  border-color: #409eff !important;
}
.expand-all {
  float: right;
  color: #606266 !important;
  border-color: #dcdfe6 !important;
  background-color: #fff !important;
}
.page {
  margin-top: 10px;
}
.demo-table-expand .el-form-item {
  margin-bottom: 0 !important;
}
.expanded .el-form-item .el-form-item__label {
  padding: 0 !important;
}
.demo-table-expand .label {
  font-weight: bold;
}
.demo-table-expand .label span {
  font-weight: normal;
}
</style>
