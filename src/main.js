import Vue from 'vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'

import routes from './config/routes'
import store from './store/'
import components from './components/' //加载公共组件
// 引入element ui文件

// 引入element ui文件
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
// 加载element
Vue.use(ElementUI)

import './css/main.css'

Object.keys(components).forEach((key) => {
    var name = key.replace(/(\w)/, (v) => v.toUpperCase()) //首字母大写
    Vue.component(`v${name}`, components[key])
})

Vue.use(VueRouter)
Vue.use(VueResource)

const router = new VueRouter({
    routes
})


router.beforeEach(({meta, path}, from, next) => {
    var { auth = true } = meta
    var isLogin = Boolean(store.state.user.username) //true用户已登录， false用户未登录
    if (auth && !isLogin && path !== '/login') {
        return next({ path: '/login' })
    }
    next()
})

new Vue({ store, router }).$mount('#app')

Vue.http.options.emulateJSON = true;

Vue.http.interceptors.push((request, next) => {
    next((response) => {
        if (response.status === 400) {
            // Update your state
            console.log('ret:' + response.body.ret)
            router.replace('/login')
        }
        return response
    })
})