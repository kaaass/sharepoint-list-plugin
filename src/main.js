import Vue from 'vue'
import App from './app.vue'
import {isDev} from './config'
import {loadStyle} from './utils'
import './styles/global.scss'

loadStyle('https://unpkg.com/element-ui@2.14.1/lib/theme-chalk/index.css')


const id = `app_vue_${Date.now()}`
const root = document.createElement('div')
root.id = id
document.body.appendChild(root)

if (isDev) {
    const ElementUI = require('element-ui')
    Vue.use(ElementUI)
}

new Vue({
    el: `#${id}`,
    render: h => h(App)
})