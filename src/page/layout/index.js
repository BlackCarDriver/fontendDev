// import { GithubFilled, InfoCircleFilled, PlusCircleFilled, QuestionCircleFilled, SearchOutlined } from '@ant-design/icons'
import ProCard from '@ant-design/pro-card'
import { PageContainer, ProLayout } from '@ant-design/pro-layout' // ProSettings,
import { Divider } from 'antd'
import React, { useState } from 'react'
import defaultProps from './defaultProps.js'
  
export default (props) => {
  const [pathname, setPathname] = useState('/list/sub-page/sub-sub-page1')

  const settings = {
    fixSiderbar: true,
    layout: 'mix',
    splitMenus: true,
    navTheme: 'light',
    contentWidth: 'Fluid',
    colorPrimary: '#1890ff',
    siderMenuType: 'group'
  }

  console.debug('props===>', props)

  return (
    <div id='test-pro-layout' style={{ height: '100vh' }} >
      <ProLayout
        bgLayoutImgList={[]}

        {...defaultProps}
        {...settings}

        location={{ pathname }}

        menu={{
          collapsedShowGroupTitle: true
        }}

        avatarProps={{
          src: 'https://gw.alipayobjects.com/zos/antfincdn/efFD%24IOql2/weixintupian_20170331104822.jpg',
          size: 'small',
          title: '七妮妮'
        }}

        actionsRender={(props) => { return [] }}

        headerTitleRender={(logo, title, _) => {  
          const defaultDom = (
            <a>
              {logo}
              {title}
            </a>
          )
          if (document.body.clientWidth < 1400) {
            return defaultDom
          }
          if (_.isMobile) return defaultDom
          return (
            <>
              {defaultDom}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center'
                }}
              >
                <Divider
                  style={{
                    height: '1.5em'
                  }}
                  type='vertical'
                />
              </div>
            </>
          )
        }}

        menuFooterRender={(props) => {
          if (props?.collapsed) return undefined
          return (
            <div
              style={{
                textAlign: 'center',
                paddingBlockStart: 12
              }}
            >
              <div>© 2021 Made with love</div>
              <div>by Ant Design</div>
            </div>
          )
        }}

        onMenuHeaderClick={(e) => console.log(e)}

        menuItemRender={(item, dom) => (
          <div
            onClick={() => {
              setPathname(item.path || '/welcome')
            }}
          >
            {dom}
          </div>
        )}
      >
        
        <PageContainer
          extra={[]}
          subTitle=''
          footer={[]}
        >
          <ProCard style={{ height: '200vh', minHeight: 800 }} >
            {props.children}
          </ProCard>
        </PageContainer>

      </ProLayout>
    </div>
  )
}
