/**
 * 导入App.vue 并且利用Vue框架把App.vue中内容渲染出来
 */
import Vue from 'vue' //相当于Node中 var Vue = require('vue')
import VueRouter from 'vue-router'
import Vuex from 'vuex'
import moment from 'moment'
import ElementUI from 'element-ui';
import VueLazyload from 'vue-lazyload'
const path = require('path')

import axios from 'axios'
axios.defaults.baseURL = "http://47.106.148.205:8899/" //设置axios的基路径

//模仿vue-resource
Vue.prototype.$axios = axios

//使用基于Vue的中间件
Vue.use(VueRouter) //Vue.prototype.$route Vue.prototype.$router
Vue.use(Vuex) //Vue.prototype.$store
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

//路由相关
//导入定义好的组件
import goodslist from './components/goods/goodslist'
import goodsinfo from './components/goods/goodsinfo'
import shopcart from './components/shopcart/shopcart'
const router = new VueRouter({
    routes:[
        {path:'/',redirect:'/site/goodslist'},
        {path:'/site/goodslist',component:goodslist},
        {path:'/site/goodsinfo/:goodsId',component:goodsinfo},
        {path:'/site/shopcart',component:shopcart}
    ]
})

//和Vuex相关
//按需导入localStorage中的方法【按需导入必须要有{}】
import {
    addLocalGoods,
    getTotalLocalCount
} from './common/localStorageHelper'
const store = new Vuex.Store({
    state:{
        buyCount:0,//购买的总数量
    },
    getters:{
        getTotalGoodsCount(state){
            if(state.buyCount>0){//非第一次
                return state.buyCount
            }else{//第一次
                return getTotalLocalCount()
            }
        }
    },
    mutations:{
        // goods的格式如下 {goodsId:88,count:3}
        addGoods(state,goods){
            state.buyCount = addLocalGoods(goods)
        }
    }
})

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