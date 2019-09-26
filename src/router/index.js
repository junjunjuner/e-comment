import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'

Vue.use(Router)

export default new Router({
  routes: [
    // {
    //   path: '/',
    //   name: 'Login',
    //   component: () => import('@/components/Login/Login'),
    //   meta: {}
    // },
    {
      path: '/',
      name: 'Start',
      component: () => import('@/components/Start'),
      meta: {}
    },
    {
      path: '/layout',
      name: 'Layout',
      component: () => import('@/components/Layout'),
      meta: {},
      children: [
        {
          path: '/paramers',
          name: 'Paramers',
          component: () => import('@/components/Main/Paramers')
        },
        {
          path: '/comment',
          name: 'Comment',
          component: () => import('@/components/Main/Comment')
        },
        {
          path: '/paramer-comment',
          name: 'PComment',
          component: () => import('@/components/Main/PComment'),
          children: [
            {
              path: '/pcomment-child',
              name: 'PCommentchild',
              component: () => import('@/components/Main/PCommentchild')
            }
          ]
        }
      ]
    },
    {
      path: '/error/404',
      name: '404',
      component: () => import('@/components/Common/errorPage'),
      meta: {}
    }
  ]
})
