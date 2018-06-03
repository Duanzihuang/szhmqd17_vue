import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter) //Vue.prototype.$route Vue.prototype.$router

import axios from 'axios'
axios.defaults.withCredentials = true
axios.defaults.baseURL = "http://47.106.148.205:8899/" //设置axios的基路径
//模仿vue-resource
Vue.prototype.$axios = axios

//路由相关
//导入定义好的组件
import goodslist from '../components/goods/goodslist'
import goodsinfo from '../components/goods/goodsinfo'
import shopcart from '../components/shopcart/shopcart'
import order from '../components/order/order'
import login from '../components/account/login'
import payOrder from '../components/pay/payOrder'
import paySuccess from '../components/pay/paySuccess'
import vipCenter from '../components/vip/vipCenter'
import myOrders from '../components/vip/myOrders'
import orderInfo from '../components/vip/orderInfo'
const router = new VueRouter({
    routes:[
        {path:'/',redirect:'/site/goodslist'},
        {path:'/site/goodslist',component:goodslist},
        {path:'/site/goodsinfo/:goodsId',component:goodsinfo},
        {path:'/site/shopcart',component:shopcart},
        {path:'/site/login',component:login},
        {path:'/site/order/:ids',component:order,meta:{needLogin:true}},
        {path:'/site/payOrder/:orderId',component:payOrder,meta:{needLogin:true}},
        {path:'/site/paySuccess',component:paySuccess,meta:{needLogin:true}},
        {path:'/site/vipCenter',component:vipCenter,meta:{needLogin:true}},
        {path:'/site/myOrders',component:myOrders,meta:{needLogin:true}},
        {path:'/site/orderInfo/:orderId',component:orderInfo,meta:{needLogin:true}}
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

export default router