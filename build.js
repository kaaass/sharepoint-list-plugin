/**
 * TamperMonkey插件打包脚本
 */

const fs = require('fs')

const appName = process.env.TAMPERMONKEY_APP_NAME
const appVersion = require('./package.json').version
const entryFile = process.env.TAMPERMONKEY_ENTRY_FILE

const app = fs.readFileSync(`./dist/${entryFile}`, 'utf8')
let tampermonkeyConfig = fs.readFileSync('./tampermonkey.js', 'utf8')
tampermonkeyConfig = tampermonkeyConfig.replace('__APP_NAME__', appName)
tampermonkeyConfig = tampermonkeyConfig.replace('__APP_VERSION__', appVersion)
fs.writeFileSync(`./dist/${entryFile}`, tampermonkeyConfig + '\n' + app)
console.log('build complete!')
