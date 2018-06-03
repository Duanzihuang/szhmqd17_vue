import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex) //Vue.prototype.$store

//和Vuex相关
//按需导入localStorage中的方法【按需导入必须要有{}】
import {
    addLocalGoods,
    updateLocalGoods,
    deleteLocalGoodsById,
    getTotalLocalCount
} from '../common/localStorageHelper'
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

export {store}