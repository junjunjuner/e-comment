<template>
  <div id="whole">
    <div class="header"><span>电商评论展示及分类系统</span></div>
    <div class="login">
      <div id="mylogin">
        <el-tabs v-model="activeName" @tab-click="handelClick">
          <el-tab-pane label="用户登录" name="first">
            <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
              <el-form-item label="帐号" prop="text">
                <el-input type="text" v-model="ruleForm.pass" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="密码" prop="pass">
                <el-input type="password" v-model="ruleForm.pass" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="年龄" prop="age">
                <el-input v-model.number="ruleForm.age"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
                <el-button @click="resetForm('ruleForm')">重置</el-button>
              </el-form-item>
            </el-form>
          </el-tab-pane>
          <el-tab-pane label="用户注册" name="second">用户注册页面</el-tab-pane>
        </el-tabs>
      </div>
      <MilkTea class="login-mytea"></MilkTea>
    </div>
  </div>
</template>

<script>
import MilkTea from '../Common/MilkTea'
export default {
  name: 'Login.vue',
  components: {MilkTea},
  data () {
    var checkAge = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('年龄不能为空'))
      }
      setTimeout(() => {
        if (!Number.isInteger(value)) {
          callback(new Error('请输入数字值'))
        } else {
          if (value < 18) {
            callback(new Error('必须年满18岁'))
          } else {
            callback()
          }
        }
      }, 1000)
    }
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        if (this.ruleForm.checkPass !== '') {
          this.$refs.ruleForm.validateField('checkPass')
        }
        callback()
      }
    }
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.ruleForm.pass) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      activeName: 'first',
      ruleForm: {
        pass: '',
        checkPass: '',
        age: ''
      },
      rules: {
        pass: [
          { validator: validatePass, trigger: 'blur' }
        ],
        checkPass: [
          { validator: validatePass2, trigger: 'blur' }
        ],
        age: [
          { validator: checkAge, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('submit!')
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
    },
    handelClick (tab, event) {
      console.log(tab, event)
    }
  }
}

</script>

<style>
  /*.login-mytea {*/
    /*float: right;*/
  /*}*/
  .login {
    /*width: 500px;*/
    /*height: 500px;*/
    /*float: left;*/
    /*padding-top:243px;*/
    /*padding-left: 350px;*/
    width: 1100px;
    margin: 0 270px;
  }
  #mylogin {
    border: 3px solid #4a313d;
    color: #4a313d;
    width: 500px;
    height: 400px;
    float: left;
    margin-top: 100px;
  }
  #mylogin .el-tabs__item.is-active {
    color: #da6b62;
    font-size: 26px;
    font-weight: bold;
  }
  #mylogin .el-tabs__item {
    color: #4a313d;
    font-size: 18px;
    padding: 0 30px;
  }
  #mylogin .el-tabs__active-bar {
    color: #da6b62;
  }
  #mylogin .el-input {
    width: 80%;
  }
  .demo-ruleForm {
    margin-top: 48px;
  }
  #whole {
    margin-left: 80px;
  }
  .header span{
    /*background: #F9D3C0;*/
    color: rgb(89, 62, 71);
    font-size: 50px;
    position: relative;
    left: 530px;
    top: 85px;
    font-weight: bolder;
  }

</style>
