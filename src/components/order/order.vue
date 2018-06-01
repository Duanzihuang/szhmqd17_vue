<template>
    <dir>
        <div class="section">
            <div class="location">
                <span>当前位置：</span>
                <a href="/index.html">首页</a> &gt;
                <a href="/cart.html">购物车</a>
            </div>
        </div>

        <div class="section">
            <div class="wrapper">
                <div class="bg-wrap">
                    <!--购物车头部-->
                    <div class="cart-head clearfix">
                        <h2>
                            <i class="iconfont icon-cart"></i>我的购物车</h2>
                        <div class="cart-setp">
                            <ul>
                                <li class="first active">
                                    <div class="progress">
                                        <span>1</span>
                                        放进购物车
                                    </div>
                                </li>
                                <li class="active">
                                    <div class="progress">
                                        <span>2</span>
                                        填写订单信息
                                    </div>
                                </li>
                                <li class="last">
                                    <div class="progress">
                                        <span>3</span>
                                        支付/确认订单
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <!--购物车头部-->
                    <div class="cart-box">
                        <h2 class="slide-tit">
                            <span>1、收货地址</span>
                        </h2>
                        <el-form :model="order" status-icon :rules="rules" ref="orderForm" label-width="150px">
                            <div class="form-box address-info">
                                <el-form-item label="收货人姓名：" prop="accept_name">
                                    <el-input style="width:600px;" v-model="order.accept_name"></el-input>
                                </el-form-item>
                                <el-form-item label="所属地区：" prop="area">
                                    <v-distpicker @selected="onSelected" :province="order.area.province.value" :city="order.area.city.value" :area="order.area.area.value"></v-distpicker>
                                </el-form-item>
                                <el-form-item label="详细地址：" prop="address">
                                    <el-input style="width:600px;" v-model="order.address"></el-input>
                                </el-form-item>
                                <el-form-item label="手机号码：" prop="mobile">
                                    <el-input style="width:600px;" v-model="order.mobile"></el-input>
                                </el-form-item>
                                <el-form-item label="电子邮箱：">
                                    <el-input style="width:600px;" v-model="order.email"></el-input>
                                </el-form-item>
                                <el-form-item label="邮政编码：">
                                    <el-input style="width:250px;" v-model="order.post_code"></el-input>
                                </el-form-item>
                            </div>
                            <h2 class="slide-tit">
                                <span>2、支付方式</span>
                            </h2>
                            <ul class="item-box clearfix">
                                <!--取得一个DataTable-->
                                <el-radio v-model="order.payment_id" label="6">在线支付</el-radio>&nbsp;手续费：0.00元
                            </ul>
                            <h2 class="slide-tit">
                                <span>3、配送方式</span>
                            </h2>
                            <ul class="item-box clearfix">
                                <!--取得一个DataTable-->
                                <el-radio-group @change="switchExpress" v-model="order.express_id">
                                    <el-radio label="1">顺丰快递(20元)</el-radio>
                                    <el-radio label="2">圆通快递(10元)</el-radio>
                                    <el-radio label="3">韵达快递(8元)</el-radio>
                                </el-radio-group>
                            </ul>
                            <h2 class="slide-tit">
                                <span>4、商品清单</span>
                            </h2>
                            <div class="line15"></div>
                            <table width="100%" border="0" align="center" cellpadding="8" cellspacing="0" class="cart-table">
                                <tbody>
                                    <tr>
                                        <th colspan="2" align="left">商品信息</th>
                                        <th width="84" align="left">单价</th>
                                        <th width="84" align="center">购买数量</th>
                                        <th width="104" align="left">金额(元)</th>
                                    </tr>
                                    <tr v-for="item in goodsList" :key="item.id">
                                        <td width="68">
                                            <a target="_blank" href="/goods/show-89.html">
                                                <img :src="item.img_url" class="img">
                                            </a>
                                        </td>
                                        <td>
                                            <a target="_blank" href="/goods/show-89.html">{{item.title}}</a>
                                        </td>
                                        <td>
                                            <span class="red">
                                                ￥{{item.sell_price}}
                                            </span>
                                        </td>
                                        <td align="center">{{item.buycount}}</td>
                                        <td>
                                            <span class="red">
                                                ￥{{item.buycount * item.sell_price}}
                                            </span>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                            <div class="line15"></div>
                            <h2 class="slide-tit">
                                <span>5、结算信息</span>
                            </h2>
                            <div class="buy-foot clearfix">
                                <div class="left-box">
                                    <dl>
                                        <dt>订单备注(100字符以内)</dt>
                                        <dd>
                                            <textarea v-model="order.message" name="message" class="input" style="height:35px;"></textarea>
                                        </dd>
                                    </dl>
                                </div>
                                <div class="right-box">
                                    <p>
                                        商品
                                        <label class="price">{{totalCount}}</label> 件&nbsp;&nbsp;&nbsp;&nbsp; 商品金额：￥
                                        <label id="goodsAmount" class="price">{{totalAmount}}</label> 元&nbsp;&nbsp;&nbsp;&nbsp;
                                    </p>
                                    <p>
                                        运费：￥
                                        <label id="expressFee" class="price">{{order.expressMoment}}</label> 元
                                    </p>
                                    <p class="txt-box">
                                        应付总金额：￥
                                        <label id="totalAmount" class="price">{{getSum}}</label>
                                    </p>
                                    <p class="btn-box">
                                        <a class="btn button" href="/cart.html">返回购物车</a>
                                        <a id="btnSubmit" @click="goToOrder" class="btn submit">确认提交</a>
                                    </p>
                                </div>
                            </div>
                        </el-form>
                    </div>
                </div>
            </div>
        </div>
    </dir>
</template>

<script>
    import VDistpicker from 'v-distpicker'

    import { getLocalGoodsObj } from '../../common/localStorageHelper'

    export default {
        components: { VDistpicker },
        data() {
            var checkMobile = (rule, value, callback) => {
                if (!value) {
                    return callback(new Error('手机号不能为空'));
                }
                //使用正则表达式校验手机号
                var myreg = /^[1][3,4,5,7,8][0-9]{9}$/;
                if (!myreg.test(value)) {
                    callback(new Error('手机号非法'))
                } else {
                    callback()
                }
            }
            return {
                totalCount: 0,//商品总件数，只是呈现给用户看，不需要提交给后台
                totalAmount: 0,//商品总价格，只是呈现给用户看，不需要提交给后台
                goodsList: [],//因为这个goodsList只需要展示给用户看，不需要提交到后台，所有不需要放在order中
                order: { //最终提交给后台的数据模型
                    accept_name: '何杰', //收货人姓名
                    address: '中粮商务公园3栋1301', //详细地址
                    mobile: '13812345678', //手机号
                    email: 'hejie@163.com',//邮箱
                    post_code: '518000',//邮政编码
                    area: {
                        province: { code: 440000, value: '广东省' },
                        city: { code: 440300, value: '深圳市' },
                        area: { code: 440306, value: '宝安区' }
                    },
                    payment_id: "6", //6代表在线支付
                    express_id: "1", //快递方式：1:顺丰 2:圆通 3:韵达
                    expressMoment: 20,//快递费
                    message: '请快点发货',//留言
                },
                rules: {
                    accept_name: [
                        { required: true, message: '请输入收货人姓名', trigger: 'blur' }
                    ],
                    area: [
                        { required: true, message: '请选择所属地区', trigger: 'blur' }
                    ],
                    address: [
                        { required: true, message: '请输入详细地址', trigger: 'blur' }
                    ],
                    mobile: [
                        { required: true, validator: checkMobile, trigger: 'blur' }
                    ]
                }
            }
        },
        created() {
            //获取将要下单的商品清单
            this.getGoodsListData()
        },
        computed: {
            getSum() {
                return this.order.expressMoment + this.totalAmount
            }
        },
        methods: {
            /** 
             * 选择之后的省市区的值
            */
            onSelected(area) {
                this.order.area = area
            },
            //切换了快递方式
            switchExpress(label) {
                switch (label) {
                    case "1":
                        this.order.expressMoment = 20
                        break;
                    case "2":
                        this.order.expressMoment = 10
                        break;

                    case "3":
                        this.order.expressMoment = 8
                        break;

                    default:
                        break;
                }
            },
            getGoodsListData() {
                //1.获取到购物车传递过来的ids
                const ids = this.$route.params.ids

                //设置后台需要的goodsids
                this.order.goodsids = ids

                const localGoods = getLocalGoodsObj()

                //如果发现goodsId在本地已经没有了，就跳到购物车(通过编程式导航)

                //2.准备好url //{90: 2, 94: 3, 98: 2}
                /**
                const tempObj = {}
                const localGoods = getLocalGoodsObj()
                const idsArray = ids.split(',')
                for(const key in localGoods){
                    if(idsArray.includes(key)){
                        tempObj[key] = localGoods[key]
                    }
                }
                //设置后台需要的cargoodsobj
                this.order.cargoodsobj = tempObj
                **/

                const url = `site/validate/order/getgoodslist/${ids}`
                this.$axios.get(url).then(response => {
                    let tempCount = 0
                    let tempAmount = 0
                    const tempObj = {}
                    response.data.message.forEach(item => {
                        item.buycount = localGoods[item.id]
                        tempCount += item.buycount
                        tempAmount += item.buycount * item.sell_price

                        tempObj[item.id] = item.buycount
                    })

                    this.totalCount = tempCount
                    this.totalAmount = tempAmount
                    //设置后台需要的商品总金额
                    this.order.goodsAmount = tempAmount
                    this.goodsList = response.data.message

                    //设置后台需要的cargoodsobj
                    this.order.cargoodsobj = tempObj
                })
            },
            //提交订单
            goToOrder() {
                this.$refs.orderForm.validate((valid) => {
                    if (valid) {
                        //1、查看order是否满足后台的需求
                        console.log(this.order)
                        
                        //2.准备好url
                        const url = `site/validate/order/setorder`
                        this.$axios.post(url,this.order).then(response=>{
                            if(response.data.status == 1){
                                this.$message.error('提交订单失败!')
                                return
                            }

                            //3 循环删除已经下过单的本地的数据
                            const tempIdArray = this.$route.params.ids.split(',')
                            tempIdArray.forEach(goodsId=>{
                                this.$store.commit('deleteGoodsById',goodsId)
                            })

                            //4 跳转到支付页面
                            this.$router.push({
                                path:`/site/payOrder/${response.data.message.orderid}`
                            })
                        })
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            }
        }
    }
</script>