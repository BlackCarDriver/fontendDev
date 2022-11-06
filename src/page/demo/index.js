import React, { Component } from 'react'
import { connect } from 'dva'
import { Button } from 'antd'
import './index.css'

const namespace = 'demoPage'

@connect(({ demoPage }) => ({
  model: demoPage
}))

class DemoPage extends Component {
   // 调用 model 处理函数
   callModel = (funcName, params) => {
     const { dispatch } = this.props
     dispatch({
       type: `${namespace}/${funcName}`,
       payload: params
     })
   }
  
  // 修改单个model state 成员
  changeState = (name, newValue) => {
    this.callModel('updateState', {
      name: name, newValue: newValue
    })
  }

  onTestGetFunc = () => {
    this.callModel('getDatabaseInfo', {
      params: { value: 1111, name: 'xxxxx' },
      cbFunc: (ret) => { console.debug('ret==>', ret) }
    })
  }

  render () {
    const { match: { params: { business } } } = this.props
    console.debug('model==>', this.props.model)
    
    return (
      <div className='normal'>
        <h1 className='title'>{business}</h1>
        <div className='welcome' />
        <ul className='list'>
          <li>To get started, edit <code>src/index.js</code> and save to reload.ss</li>
          <li><a href='https://github.com/dvajs/dva-docs/blob/master/v1/en-us/getting-started.md'>Getting Started</a></li>
        </ul>
        <Button onClick={this.onTestGetFunc}>test</Button>
      </div>
    )
  }
}

export default DemoPage
