import React from 'react'
import { connect } from 'dva'
import { Button } from 'antd'
import './index.css'

const IndexPage = (props) => {
  const { match: { params: { business } } } = props
  return (
    <div className='normal'>
      <h1 className='title'>{business}</h1>
      <div className='welcome' />
      <ul className='list'>
        <li>To get started, edit <code>src/index.js</code> and save to reload.ss</li>
        <li><a href='https://github.com/dvajs/dva-docs/blob/master/v1/en-us/getting-started.md'>Getting Started</a></li>
      </ul>
      <Button onClick={() => { throw new Error('test') }}>test</Button>
    </div>
  )
} 

IndexPage.propTypes = {
}

export default connect()(IndexPage)
