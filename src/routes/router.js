import React from 'react'
import { Router, Switch, Route, Redirect } from 'dva/router'
import { CrownOutlined, SmileFilled, BranchesOutlined, PieChartOutlined, BuildOutlined, ExperimentOutlined, BarChartOutlined } from '@ant-design/icons'
import dynamic from './dynamic'
import Layout from '../page/layout'

/*
  <Route />
  history: 可以通过代码控制前进、后退

  <switch /> 
  只会运行其中一个 <route>， 子元素只能是 <route> 或者 <redirect>

  <Route />
  strict: 结尾斜线匹配
  exact: 完全匹配
  path: <route>中 path 属性的值，与浏览器地址栏 url 进行匹配，“/topics/:topicId”

  <redirect />
  push: 值为 true 时不会替换当前页面，而是在历史记录栈中新增一条记录。
  from: 相当于 <route> 中的 path 属性，匹配 url 地址，匹配成功，跳转到另一个 url 地址。
*/

const businessList = [
  { key: 'jy', name: '交友' },
  { key: 'bb', name: '宝贝' },
  { key: 'yo', name: 'yo语音' }
]

const menuConfig = [
  { path: '/welcome', name: '欢迎', icon: <SmileFilled /> },
  { path: '/cfg',
    name: '灰度控制',
    icon: <BranchesOutlined />,
    routes: businessList.map(item => {
      return { 
        path: `/cfg/${item.key}`,
        name: item.name,
        routes: [
          { path: `/cfg/${item.key}/component`, name: '组件管理', icon: <BuildOutlined /> },
          { path: `/cfg/${item.key}/strategy`, name: '灰度控制', icon: <ExperimentOutlined /> },
          { path: `/cfg/${item.key}/stat`, name: '数据统计', icon: <BarChartOutlined /> }
        ] }
    })
  },
  { path: '/stat',
    name: '数据中心',
    icon: <PieChartOutlined />,
    routes: [
      { path: '/stat/business', name: '业务数据', src: '' },
      { path: '/stat/system', name: '系统数据', src: '' }
    ] },
  { path: '/admin',
    name: '管理后台',
    icon: <CrownOutlined />,
    access: 'adminOnly',
    routes: [
      { path: '/admin/business', name: '业务管理', src: '' },
      { path: '/admin/auth', name: '权限管理', src: '' }
    ] }
]

export default ({ history, app }) => {
  const { location } = history
  // console.debug('location==>', location)
  return (
    <Router history={history}>
      <Switch>
        <Redirect from='/' to='/welcome' exact strict />
        <Route path='/'>
          <Layout location={location} route={{ path: '/', routes: menuConfig }}>
            <Switch>
              <Route path='/welcome' exact component={dynamic({ component: () => import('@/page/welcome') })} />
              <Route path='/cfg/:business/component' component={dynamic({ component: () => import('@/page/demo') })} />
              <Route path='/cfg/:business/strategy' component={dynamic({ component: () => import('@/page/demo') })} />
              <Route path='/cfg/:business/stat' component={dynamic({ component: () => import('@/page/demo') })} />
              <Redirect from='/cfg/:business' to='/cfg/:business/component' exact strict />
              
              <Route path='/stat/business' component={dynamic({ component: () => import('@/page/demo') })} />
              <Route path='/stat/system' component={dynamic({ component: () => import('@/page/demo') })} />

              <Route path='/admin/business' component={dynamic({ component: () => import('@/page/demo') })} />
              <Route path='/admin/auth' component={dynamic({ component: () => import('@/page/demo') })} />

              <Route component={dynamic({ component: () => import('../page/404') })} />
            </Switch>
          </Layout>
        </Route>
       
      </Switch>
    </Router>
  )
}
