const path = require('path')
const BASE_PATH = '/boss'
const targetUrl = 'https://172.29.190.69:4000'
let cdn = BASE_PATH

module.exports = (mode, req) => {
  const plugins = [
    [
      require.resolve('babel-plugin-import'), { 'libraryName': 'antd', 'libraryDirectory': 'es', 'style': 'css' }
    ]
  ]  
  if (mode !== 'production') {
    plugins.push([
      path.resolve('./babel-plugin-dva-hmr/index.js')
    ])
  }
  
  return {
    debug: true,
    debugWebpack: true,
    jsx: 'react',
    define: {
      BASE_PATH: JSON.stringify(BASE_PATH)
    },
    babelConfig: {
      plugins
    },
    cdn,
    devServer: {
      publicPath: BASE_PATH,
      https: true, // endable https of dev mode
      before (app) {
        app.get('/', (req, res) => {
          res.redirect(BASE_PATH)
        })
      },
      historyApiFallback: {
        rewrites: [
          { from: /^.*$/, to: BASE_PATH }
        ]
      },
      proxy: {
        [`!(${BASE_PATH}/**)`]: {
          target: targetUrl,
          changeOrigin: true
        }
      }
    },
    extendWebpack (config) {
      config.set('externals', {
        jquery: 'jQuery'
      })
      config.module.rules.values().forEach(rule => {
        rule.oneOfs.values().forEach(oneOf => {
          oneOf.uses.values().forEach(use => {
            if (use.entries().loader === 'less-loader') {
              use.tap(options => {
                return {
                  ...options,
                  javascriptEnabled: true
                }
              })
            }
          })
        })
      })
      // 分割代码
      if (mode === 'production') {
        // const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')
        // config.plugin('bundle-report').use(BundleAnalyzerPlugin, [{}])
        config.optimization.splitChunks({
          cacheGroups: {
            vendors: {
              name: `chunk-vendors`,
              test: /[\\/]node_modules[\\/]/,
              priority: -10,
              chunks: 'all'
            },
            common: {
              name: `chunk-common`,
              minChunks: 2,
              priority: -20,
              chunks: 'all',
              reuseExistingChunk: true
            }
          }
        })
      }
    }
  }
}
