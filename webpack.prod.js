const { merge } = require('webpack-merge')
const common = require('./webpack.common')

module.exports = merge(common(), {
  mode: 'production',
  externals: {
    // 使用 @require 导入依赖
    vue: 'Vue',
    'element-ui': 'element-ui'
  },
  // 根据 Greasy Fork 规则取消最小化
  optimization: {
    minimize: false
  },
})
