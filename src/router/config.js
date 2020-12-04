import TabsView from '@/layouts/tabs/TabsView'
import BlankView from '@/layouts/BlankView'
import PageView from '@/layouts/PageView'

// 路由配置
const options = {
  routes: [
    {
      path: '/login',
      name: '登录页',
      component: () => import('@/pages/login')
    },
    {
      path: '/homepage',
      name: '欢迎页',
      component: () => import('@/pages/homepage')
    },
    // {
    //   path: '/mainpage',
    //   name: '主页',
    //   component: () => import('@/pages/mainpage')
    // },
    {
      path: '*',
      name: '404',
      component: () => import('@/pages/exception/404'),
    },
    {
      path: '/403',
      name: '403',
      component: () => import('@/pages/exception/403'),
    },
    {
      path: '/',
      name: '首页',
      component: TabsView,
      redirect: '/homepage',
      children: [
        {
          path: 'mainpage',
          name: '冷链监测设备',
          meta: {
            icon: 'home'
          },
          component: () => import('@/pages/mainpage')
        },
        {
          path: 'cymainpage',
          name: '冷链储运设备',
          meta: {
            icon: 'home'
          },
          component: () => import('@/pages/cypage')
        },
        {
          path: 'api_test',
          name: 'API测试页',
          meta: {
            icon: 'ie'
          },
          component: () => import('@/pages/api_test')
        },
        {
          path: 'onenet_test',
          name: 'OneNet测试页',
          meta: {
            icon: 'reddit'
          },
          component: () => import('@/pages/onenet_test')
        },
        {
          path: 'parent1',
          name: '父级路由1',
          meta: {
            icon: 'dashboard',
          },
          component: BlankView,
          children: [
            {
              path: 'demo1',
              name: '演示页面1',
              component: () => import('@/pages/mainpage'),
            }
          ]
        },
        {
          path: 'parent2',
          name: '父级路由2',
          meta: {
            icon: 'form'
          },
          component: PageView,
          children: [
            {
              path: 'demo2',
              name: '演示页面2',
              component: () => import('@/pages/demo'),
            }
          ]
        },
        {
          path: 'exception',
          name: '异常页',
          meta: {
            icon: 'warning',
          },
          component: BlankView,
          children: [
            {
              path: '404',
              name: 'Exp404',
              component: () => import('@/pages/exception/404')
            },
            {
              path: '403',
              name: 'Exp403',
              component: () => import('@/pages/exception/403')
            },
            {
              path: '500',
              name: 'Exp500',
              component: () => import('@/pages/exception/500')
            }
          ]
        },
        {
          name: '验权页面',
          path: 'auth/mainpage',
          meta: {
            icon: 'file-ppt',
            authority: {
              permission: 'form',
              role: 'manager'
            },
            component: () => import('@/pages/mainpage')
          }
        },
        {
          name: '安冷科技官网',
          path: 'anleng',
          meta: {
            icon: 'home',
            link: 'http://www.anleng-tec.com/'
          }
        },
        {
          name: '数字可视化大屏',
          path: 'echats1',
          meta: {
            icon: 'eye',
            link: 'https://open.iot.10086.cn/view/main/#/share2d?id=5f87a68fb48f8d0057b63d0e'
          }
        }
      ]
    }
  ]
}

export default options
