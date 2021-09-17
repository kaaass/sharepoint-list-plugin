const { merge } = require('webpack-merge')
const common = require('./webpack.common')

module.exports = merge(common(), {
  mode: 'production',
  externals: {
    // use @require in header to import vue
    vue: 'Vue',
    'element-ui': 'element-ui'
  },
  // 根据 Greasy Fork 规则取消最小化
  optimization: {
    minimize: false
  },
})
