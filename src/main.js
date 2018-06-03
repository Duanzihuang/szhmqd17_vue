/**
 * 导入App.vue 并且利用Vue框架把App.vue中内容渲染出来
 */
import Vue from 'vue' //相当于Node中 var Vue = require('vue')
import moment from 'moment'
import ElementUI from 'element-ui';
import VueLazyload from 'vue-lazyload'
const path = require('path')

//使用基于Vue的中间件
Vue.use(ElementUI) //把我们ElementUI都进行注册 & 并且在Vue的原型上还绑定了$message...
// or with options
Vue.use(VueLazyload, {
    loading: path.join(__dirname,"src/statics/site/images/01.gif")
})

//定义全局过滤器
Vue.filter('dateFmt',(input,formatStr="YYYY-MM-DD")=>{
    //第二个参数的 formatStr="YYYY-MM-DD" 相当于下面这样写
    //const lastFormatStr = formatStr || "YYYY-MM-DD"

    /**
     * 第一个参数:要过滤的原始的时间字符串
     * 第二个参数：要格式化成的字符串
     */
    return moment(input).format(formatStr)
})

//导入App.vue
import App from './App.vue'

//导入全局需要用到的样式
import 'element-ui/lib/theme-chalk/index.css'
import "./statics/site/css/style.css"

//导入router
//如果我们导入某个模块的时候，没有写具体的文件名，那么它那个目录下，必须会有一个
//index.js
import router from './router'

//导入vuex
import {store} from './store'

new Vue({
    el:"#app",
    //参考:https://cn.vuejs.org/v2/guide/render-function.html
    // render:function(createElement){
    //     return createElement(App)
    // } 
    render:h=>h(App),
    router,
    store
})