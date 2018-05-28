/**
 * 这个模块，它的作用就是对商品信息在localStorage中的增删改查
 * 
 * 这里面的所有方法，都按需导出
 */
const KEY = "goods"

/**
 * 返回localStorage中最新的商品总数
 */
export const getTotalLocalCount = () =>{
    // {"90":1,"92":2,"94":3}
    const localGoodsObj = getLocalGoodsObj()

    let totalCount = 0
    for(const key in localGoodsObj){
        totalCount += localGoodsObj[key]
    }

    return totalCount
}

/**
 * 根据KEY获取保存在localStorage中的商品信息，最终把它转成对象
 */
export const getLocalGoodsObj = () => {
    return JSON.parse(localStorage.getItem(KEY) || '{}')
}

 /**
  * 没有加default 就是按需导出，加了default就是默认导出
  * 区别：
  *     一个模块中，可以有多个按需导出，但是只能有一个默认导出
  */
 /**
  *  goods : {goodsId:88,count:3}
  * 
  *  最终存储在localStorage中的数据 {88:3,89:2} 
  */
 export const addLocalGoods = (goods) => {
    /**
     * 把传递进来的商品信息 {goodsId:88,count:3} 保存到localStorage中
     * 但是需要注意一下，如果原先的goodsId存在，把我们count累加
     * 如果不存在添加一个键值对
     */
    const localGoodsObj = getLocalGoodsObj()

    /**
     * localGoodsObj ==> {"90":1,"92":2,"94":3}
     */
    if(localGoodsObj[goods.goodsId]){
        localGoodsObj[goods.goodsId]+=goods.count
    }else{
        localGoodsObj[goods.goodsId] = goods.count
    }

    localStorage.setItem(KEY,JSON.stringify(localGoodsObj))

     //别忘记把最新统计出来的商品总数量返回给Vuex的buyCount，这样我们App.vue中的总数量才会改变
     return getTotalLocalCount()
 }
