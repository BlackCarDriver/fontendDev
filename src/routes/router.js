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

  // 注册页面和路由
  const demoPage = dynamicLoadByPath('demo', app)
  const welcomePage = dynamicLoadByPath('welcome', app)
  const notFoundPage = dynamicLoadByPath('404', app)

  return (
    <Router history={history}>
      <Switch>
        <Redirect from='/' to='/welcome' exact strict />
        <Route path='/'>
          <Layout location={location} route={{ path: '/', routes: menuConfig }}>
            <Switch>
              <Route path='/welcome' exact component={welcomePage} />
              <Route path='/cfg/:business/component' component={demoPage} />
              <Route path='/cfg/:business/strategy' component={demoPage} />
              <Route path='/cfg/:business/stat' component={demoPage} />
              <Redirect from='/cfg/:business' to='/cfg/:business/component' exact strict />
              
              <Route path='/stat/business' component={demoPage} />
              <Route path='/stat/system' component={demoPage} />

              <Route path='/admin/business' component={demoPage} />
              <Route path='/admin/auth' component={demoPage} />

              <Route component={notFoundPage} />
            </Switch>
          </Layout>
        </Route>
       
      </Switch>
    </Router>
  )
}

function dynamicLoadByPath (name, app) {
  const model = () => [
    (async () => {
      let promiseModel
      try {
        promiseModel = await import(`../page${name}/model.js`)
      } catch (err) {
        console.log(`can not load model: err=${err}`)
      }
      return promiseModel
    })()
  ]
  const component = async () => {
    let promiseComponent
    try {
      promiseComponent = await import(`../page/${name}/index.js`)
    } catch (err) {
      console.info(`can not load component:  err=${err}`)
      promiseComponent = () => { return <>not found</> }
    }
    return promiseComponent
  }
  return dynamic({ app, model, component }) 
}
