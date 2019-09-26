// // 封装axios
// import Vue from 'vue'
// import axios from 'axios'
// import router from '../router'
// import store from '../store/index'
// // import element from 'element-ui'
//
// let vueobj = new Vue()
//
// const toSignin = function (msg) {
//   store.dispatch('clearUserInfo')
//   var message = msg ? msg : 'session过期，即将前往登录页面'
//   vueobj.$message.error({showClose: true,
//     message: message,
//     duration: 3000,
//     onClose: function () {
//       router.replace({path: '/signin', query: {redirect: router.currentRoute.fullPath}
//       })
//     }})
// }
// /**
//  * 请求失败后的错误统一处理
//  * @param {Number} status 请求失败的状态码
//  */
// const errorHandle = (status, other) => {
//   // 状态码判断
//   switch (status) {
//     case 400:
//       vueobj.$message.error({showClose: true, message: '请求参数有误！', duration: 3000})
//       break
//     // 401: 未登录状态，跳转登录页
//     case 401:
//       // vueobj.$message.error({showClose: true, message: "session过期，即将前往登录页面！", duration: 3000});
//       toSignin()
//       break
//     // 403 token过期
//     // 清除token并跳转登录页
//     case 403:
//       vueobj.$message.error({showClose: true, message: '没有操作权限！', duration: 3000})
//       break
//     // 404请求不存在
//     case 404:
//       vueobj.$message.error({showClose: true, message: '请求不存在', duration: 3000})
//       break
//     case 500:
//       vueobj.$message.error({showClose: true, message: '请求失败，服务器内部错误', duration: 3000})
//       break
//     case 504:
//       vueobj.$message.error({showClose: true, message: '与服务器连接失败！', duration: 3000})
//       break
//     default:
//       console.log(other)
//   }
// }
//
// // 创建axios实例
// var instance = axios.create({timeout: 1000 * 12})
//
// // 响应拦截器
// instance.interceptors.response.use(
//   response => {
//     // 如果返回的状态码为200，说明接口请求成功，可以正常拿到数据
//     // 否则的话抛出错误
//     if (response.status === 200) {
//       if (typeof response.data !== 'undefined') {
//         return Promise.resolve(response)
//       } else {
//         return Promise.reject(response)
//       }
//     } else {
//       return Promise.reject(response)
//     }
//   },
//   // 服务器状态码不是2开头的的情况
//   // 这里可以跟你们的后台开发人员协商好统一的错误状态码
//   // 然后根据返回的状态码进行一些操作，例如登录过期提示，错误提示等等
//   // 下面列举几个常见的操作，其他需求可自行扩展
//   error => {
//     const { response } = error
//     if (response) {
//       // 请求已发出，但是不在2xx的范围
//       errorHandle(response.status, response.data.message)
//       return Promise.reject(response)
//     } else {
//       // 处理断网的情况
//       // eg:请求超时或断网时，更新state的network状态
//       // network状态在app.vue中控制着一个全局的断网提示组件的显示隐藏
//       // 关于断网组件中的刷新重新获取数据，会在断网组件中说明
//       // store.commit('changeNetwork', false);
//       // toSignin();
//       // vueobj.$message.error({showClose: true, message: "与服务器连接失败！", duration: 3000});
//
//       var originalRequest = error.config
//       if (error.code === 'ECONNABORTED' && error.message.indexOf('timeout') !== -1 && !originalRequest._retry) {
//         // originalRequest._retry = true
//         // return axios.request(originalRequest);
//         vueobj.$message.error({showClose: true, message: '请求超时，请稍后重试！', duration: 3000})
//         return Promise.reject(response)
//       } else {
//
//       }
//     }
//   }
// )
//
// export default instance

import Vue from 'vue'
import axios from 'axios'
import qs from 'qs'
import { Message, Loading } from 'element-ui'
import Router from 'vue-router'

// 请求次数
axios.defaults.retry = 4
// 请求的间隙
axios.defaults.retryDelay = 1000
// 响应时间
// axios.defaults.timeout = 5 * 1000
// axios.defaults.timeout = 5000
// 配置cookie
// axios.defaults.withCredentials = true
// 配置请求头
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'
// 静态资源
Vue.prototype.$static = ''

// 配置接口地址
axios.defaults.baseURL = 'http://10.2.10.167:5050'
// axios.defaults.baseURL = 'http://172.28.171.101:5050'
var loadingInstance

// 请求超时时限 我设置500毫秒
// axios.defaults.timeout =  500;

// POST传参序列化(添加请求拦截器)
axios.interceptors.request.use(
  config => {
    loadingInstance = Loading.service({
      lock: false,
      text: '数据加载中，请稍后...',
      spinner: 'el-icon-loading',
      background: 'rgba(0, 0, 0, 0.7)'
    })
    if (config.method === 'post') {
      config.data = qs.stringify(config.data)
    }
    return config
  },
  err => {
    loadingInstance.close()
    Message.error('请求错误')
    return Promise.reject(err)
  }
)
// 返回状态判断(添加响应拦截器)
axios.interceptors.response.use(
  res => {
    if (res.status === 200) {
      loadingInstance.close()
      return res
    } else {
      if (res.status === 404) {
        Router.push({
          path: '/error/404'
        })
      }
      loadingInstance.close()
      // Message.error(res.data.msg)
    }
  },
  error => {
    // loadingInstance.close()
    // Message.error('请求失败，请稍后再试')
    // return Promise.reject(err)

    // 请求超时的之后，抛出 error.code = ECONNABORTED的错误..错误信息是 timeout of  xxx ms exceeded
    if (error.code === 'ECONNABORTED' && error.message.indexOf('timeout') !== -1) {
      var config = error.config
      config.__retryCount = config.__retryCount || 0

      if (config.__retryCount >= config.retry) {
        // Reject with the error
        // window.location.reload();
        return Promise.reject(error)
      }

      // Increase the retry count
      config.__retryCount += 1

      // Create new promise to handle exponential backoff
      var backoff = new Promise(function (resolve) {
        setTimeout(function () {
          // console.log('resolve');
          resolve()
        }, config.retryDelay || 1)
      })

      return backoff.then(function () {
        return axios(config)
      })
    } else {
      loadingInstance.close()
      Message.error('请求失败，请稍后再试')
      return Promise.reject(error)
    }
  }
)
// 发送请求
export function post (url, params) {
  return new Promise((resolve, reject) => {
    axios
      .post(url, params)
      .then(
        res => {
          resolve(res.data)
        },
        err => {
          reject(err.data)
        }
      )
      .catch(err => {
        reject(err.data)
      })
  })
}
export function get (url, params) {
  return new Promise((resolve, reject) => {
    axios.get(url, {params: params})
      .then(res => { resolve(res.data) })
      .catch(err => { reject(err.data) })
  })
}
