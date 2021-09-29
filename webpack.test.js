const {merge} = require('webpack-merge')
const common = require('./webpack.common')

module.exports = merge(common(), {
    mode: 'production',
    // 根据 Greasy Fork 规则取消最小化
    optimization: {
        minimize: false
    },
    devtool: 'inline-source-map',
})
