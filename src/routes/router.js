import React from 'react'
import { Router, Switch, Route, Redirect } from 'dva/router'
// import { Switch, Route, Redirect } from 'react-router-dom'
import dynamic from './dynamic'
import Layout from '../page/layout'
import IndexPage from '../page/demo' 
 
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

export default ({ history, app }) => {
  console.debug('history==>', history)
  return (
    <Router history={history}>
      <Switch>
        <Redirect from='/' to='/lo' exact strict />
        <Route path='/lo' component={Layout} />
        <Route path='/page/demo' component={IndexPage} />
        <Route path='/page' component={dynamic({ component: () => import('../page/404') })} />
      </Switch>
    </Router>
  )
}
