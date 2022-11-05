# ChangeLog

前端项目开发步骤记录。

- fec 初始化项目 （fec初始化项目）

  ```
  npm config set @yy:registry https://npm-registry.yy.com/
  fec i react boss
  ```

- dva 框架改造 （dva改造）

  ```
  2022-10-30
  1. dva 框架引入
  2. eslint等配置
  3. fec.config.js 完善(部分作用未清除)
  
  【相关依赖引入】
  babel-plugin-import: 
  是 babel 的模块化导入插件，支持对 antd、material-ui、loadsh 等依赖包的模块按需引入
  dva-loading:
  用于页面过渡效果
  babel-polyfill：
  Babel默认只转换新的JavaScript句法（syntax），而不转换新的API，比如 Iterator、Generator、Set、Maps、Proxy、Reflect、Symbol、Promise等全局对象不会转码。例如ES6在Array对象上新增了Array.from方法，Babel就会转码这个方法。如果想让这个方法运行，必须使用babel-polyfill.
  ```

- 简单静态路由 (simple route)

  ```
  2022-10-30
  1. 引入antd
  2. 调整代码结构
  3. 新增两个页面demo\404, 绑定到路由
  4. 异步态加载页面
  ```

- 主页布局  (ant-pro-layout )

  ```
  2022-11-05
  1. 引入了ant-pro的后台布局作为页面;
  2. 尝试配置出合理的路由结构和对接菜单传参，但是未成功，二级路由无效的问题未解决。
  ```

- 解决二级路由无效问题  (fix router)

  ```
  2022-11-05
  dva使用createHistory初始化解决了必须使用哈希路径的问题，初始化时需要传入参数 basePath, basePath遇到二级路径时，请求资源路径带上了前面的路由，会出现找不到资源的状况。 解决方法是配置代理。
  ```

- 路由绑定 (bind router)

  ```
  路由和菜单的绑定，以及Layout页面的优化微调
  ```

  