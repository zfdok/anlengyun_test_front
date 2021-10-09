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
      redirect: '/login',
      children: [
        {
          path: 'mainpage',
          name: '冷链监测设备',
          meta: {
            icon: 'ant-cloud',
            keepAlive: true
          },
          component: () => import('@/pages/mainpage')
        },
        {
          path: 'cymainpage',
          name: '冷链储运设备',
          meta: {
            icon: 'ant-cloud',
            keepAlive: true
          },
          component: () => import('@/pages/cypage')
        },
        {
          path: 'gsppage',
          name: '医药及GSP设备',
          meta: {
            icon: 'ant-cloud',
            keepAlive: true
          },
          component: () => import('@/pages/gsppage')
        },
        {
          path: 'datacenter',
          name: '数据中心',
          meta: {
            icon: 'bar-chart',
          },
          component: BlankView,
          children: [
            {
              path: 'verification_report_request',
              name: '验证报告申请',
              component: () => import('@/pages/reportapply')
            },
            {
              path: 'verification_report',
              name: '验证报告交付',
              component: () => import('@/pages/blankpage')
            }
          ]
        },
        {
          path: 'accountmgr',
          name: '账户管理',
          meta: {
            icon: 'team',
          },
          component: PageView,
          children: [
            {
              path: 'property',
              name: '资产管理',
              component: () => import('@/pages/blankpage'),
            },
            {
              path: 'expenditure',
              name: '费用管理',
              component: () => import('@/pages/blankpage'),
            },
            {
              path: 'selfaccount',
              name: '自身账户管理',
              component: () => import('@/pages/blankpage'),
            },
            {
              path: 'subaccount',
              name: '子账户管理',
              component: () => import('@/pages/blankpage'),
            },
          ]
        },
        {
          path: 'message',
          name: '消息管理',
          meta: {
            icon: 'message',
            keepAlive: true
          },
          component: () => import('@/pages/blankpage')
        },
        {
          path: 'manifest',
          name: '货单管理',
          meta: {
            icon: 'file-done',
          },
          component: PageView,
          children: [
            {
              path: 'manifestbind',
              name: '货单绑定',
              component: () => import('@/pages/blankpage'),
            },
            {
              path: 'manifestinfo',
              name: '货单信息查询',
              component: () => import('@/pages/blankpage'),
            }
          ]
        },
        {
          path: 'charts',
          name: '信息可视化',
          meta: {
            icon: 'pie-chart'
          },
          component: PageView,
          children: [
            {
              path: 'overviewmap',
              name: '资产概览',
              component: () => import('@/pages/blankpage'),
            },
            {
              path: 'productoverview',
              name: '产品概览',
              component: () => import('@/pages/blankpage'),
            },
            {
              path: 'singledeviceview',
              name: '单设备追踪',
              component: () => import('@/pages/blankpage'),
            },
            {
              name: '数字可视化大屏',
              path: 'echats1',
              meta: {
                // icon: 'eye',
                link: 'https://open.iot.10086.cn/view/main/#/share2d?id=5f87a68fb48f8d0057b63d0e'
              }
            }
          ]
        },

        {
          path: 'service',
          name: '客户服务',
          meta: {
            icon: 'customer-service',
          },
          component: () => import('@/pages/blankpage')
        },
      ]
    },
    {
      path: '/device',
      name: '设备页',
      component: () => import('@/pages/devicepage')
    },
    {
      path: '/device2',
      name: '设备页2',
      component: () => import('@/pages/devicepage2')
    }, {
      path: '/devicehistory',
      name: '设备页history',
      component: () => import('@/pages/devicepagehistory')
    },
    {
      path: '/datacenter/reportpage',
      name: '报告页',
      component: () => import('@/pages/reportpage')
    },
    {
      path: '/datacenter/reportPDF',
      name: '报告PDF页',
      component: () => import('@/pages/reportPDF')
    },
  ]
}

export default options
