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
axios.defaults.withCredentials = true
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
import order from './components/order/order'
import login from './components/account/login'
import payOrder from './components/pay/payOrder'
import paySuccess from './components/pay/paySuccess'
const router = new VueRouter({
    routes:[
        {path:'/',redirect:'/site/goodslist'},
        {path:'/site/goodslist',component:goodslist},
        {path:'/site/goodsinfo/:goodsId',component:goodsinfo},
        {path:'/site/shopcart',component:shopcart},
        {path:'/site/login',component:login},
        {path:'/site/order/:ids',component:order,meta:{needLogin:true}},
        {path:'/site/payOrder/:orderId',component:payOrder,meta:{needLogin:true}},
        {path:'/site/paySuccess',component:paySuccess,meta:{needLogin:true}}
    ]
})

/**
 * 这个导航守卫的方法，可以拦截到所有的路由跳转
 * 接下来就可以进行判断
 *  如果是不要权限的路径，直接放过 next()
 *  如果需要权限的路径，先判断是否登录过，如果登录过 next()，如果没有登录跳转登录页
 */
router.beforeEach((to, from, next) => {
    if(to.path!='/site/login'){//你登陆之后要跳转到的组件
        localStorage.setItem('lastVisitPath',to.path)
    }

    if(to.meta.needLogin){//需要先判断是否登录的路径
        //使用axios发送请求，如果有登陆，直接过，没有登录，去登录页面
        axios.get('site/account/islogin').then(response=>{
            if(response.data.code == 'nologin'){//未登录
                router.push({path:'/site/login'})
            }else{
                next()
            }
        })
    }else{
        next()
    }
})

//和Vuex相关
//按需导入localStorage中的方法【按需导入必须要有{}】
import {
    addLocalGoods,
    updateLocalGoods,
    deleteLocalGoodsById,
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
        },
        // 修改商品数量 goods的格式如下 {goodsId:87,count:3}
        updateGoods(state,goods){
            state.buyCount = updateLocalGoods(goods)
        },
        // 根据id删除对应的商品信息
        deleteGoodsById(state,goodsId){
            state.buyCount = deleteLocalGoodsById(goodsId)
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