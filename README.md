# FontEndDev

前端项目开发步骤记录。

- fec 初始化项目

  ```
  npm config set @yy:registry https://npm-registry.yy.com/
  fec i react boss
  ```

- dva 框架改造

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

  