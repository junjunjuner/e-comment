import { get } from '../http.js'
export default {
  // 评论数据导出到excel
  exportdata (params) {
    return get('/api/comment/exportdata', params)
  },
  // 获取评论数据
  comment (params) {
    return get('/api/comment', params)
  },
  // 获取评论下拉菜单
  commentMenu (params) {
    return get('/api/comment/menu', params)
  },
  // 参数数据导出到excel
  paramExportdata (params) {
    return get('/api/param/exportdata', params)
  },
  // 获取参数数据
  param (params) {
    return get('/api/param', params)
  },
  // 获取参数下拉菜单
  paramMenu (params) {
    return get('/api/param/menu', params)
  },
  // 获取某参数下评论数据
  pcomment (params) {
    return get('/api/pcomment', params)
  },
  // 某参数下评论数据导出到excel
  pcommentExportdata (params) {
    return get('/api/pcomment/exportdata', params)
  }
}
