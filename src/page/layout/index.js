// import { GithubFilled, InfoCircleFilled, PlusCircleFilled, QuestionCircleFilled, SearchOutlined } from '@ant-design/icons'
import ProCard from '@ant-design/pro-card'
import { PageContainer, ProLayout } from '@ant-design/pro-layout' // ProSettings,
import { Divider } from 'antd'
import React, { useState } from 'react'
import { Link } from 'dva/router'
import CustomBoundary from './errorBoundary'

export default (props) => {
  const [pathname, setPathname] = useState(props.location.pathname)

  const styleSettings = {
    fixSiderbar: true,
    splitMenus: true,
    layout: 'mix',
    navTheme: 'light',
    contentWidth: 'Fluid',
    colorPrimary: '#1677FF',
    siderMenuType: 'sub', // group
    
    // Token 是一种设计系统的基本元素，可以使用 Token 快速的修改组件库的基础样式
    token: {
      header: {
        colorBgHeader: '#292f33',
        colorHeaderTitle: '#fff',
        colorTextMenu: '#dfdfdf',
        colorTextMenuSecondary: '#dfdfdf',
        colorTextMenuSelected: '#fff',
        colorBgMenuItemSelected: '#22272b',
        colorTextMenuActive: 'rgba(255,255,255,0.85)',
        colorTextRightActionsItem: '#dfdfdf'
      },
      colorTextAppListIconHover: '#fff',
      colorTextAppListIcon: '#dfdfdf',
      sider: {
        colorMenuBackground: '#fff',
        colorMenuItemDivider: '#dfdfdf',
        colorBgMenuItemHover: '#f6f6f6',
        colorTextMenu: '#595959',
        colorTextMenuSelected: '#242424',
        colorTextMenuActive: '#242424',
        colorBgMenuItemCollapsedHover: '#242424'
      }
    }

  }

  const titleSetting = {
    title: 'BOSS管理后台',
    logo: 'https://gw.alipayobjects.com/zos/antfincdn/upvrAjAPQX/Logo_Tech%252520UI.svg'
  }

  // console.debug('props==>', props)

  const appList = [
    {
      icon: 'https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg',
      title: 'Ant Design',
      desc: '杭州市较知名的 UI 设计语言',
      url: 'https://ant.design'
    },
    {
      icon: 'https://gw.alipayobjects.com/zos/antfincdn/FLrTNDvlna/antv.png',
      title: 'AntV',
      desc: '蚂蚁集团全新一代数据可视化解决方案',
      url: 'https://antv.vision/',
      target: '_blank'
    }
  ]

  return (
    <div id='test-pro-layout' style={{ height: '100vh' }} >
      <ProLayout
        {...props}

        appList={appList}

        bgLayoutImgList={[]}

        {...titleSetting}

        {...styleSettings}

        location={{ pathname }}

        menu={{
          collapsedShowGroupTitle: true
        }}

        avatarProps={{
          src: 'https://gw.alipayobjects.com/zos/antfincdn/efFD%24IOql2/weixintupian_20170331104822.jpg',
          size: 'small',
          title: '七妮妮'
        }}

        actionsRender={(props) => { return ['actions1'] }}

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

        breadcrumbRender={(route) => {
          route.forEach(item => {
            item.path = `${BASE_PATH}${item.path}`
          })
          return route
        }}

        onMenuHeaderClick={(e) => console.log('menuHeader==>', e)}

        menuItemRender={(item, dom) => (
          <div onClick={() => {
            // console.debug('onCLick==>', item)
            setPathname(item.path || '/') 
          }} >
            <Link to={item.path} >{dom}</Link>
          </div>
        )}

        ErrorBoundary={CustomBoundary}
      >
        
        <PageContainer
          extra={['extra']}
          subTitle=''
          footer={['footer']}
        >
          <ProCard style={{ height: '200vh', minHeight: 800 }} >
            {
              props.children
            }
          </ProCard>
        </PageContainer>

      </ProLayout>
    </div>
  )
}
