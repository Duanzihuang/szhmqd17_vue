<template>
    <div>
        <div @click="substrict" class="left">-</div>
        <div class="middle">{{count}}</div>
        <div @click="add" class="right">+</div>
    </div>
</template>

<style scoped>
    .left,.middle,.right{
        display: inline-block;
        border: 1px solid rgba(92,92,92,0.3);
        width: 30px;
        height: 30px;
        text-align: center;
        line-height: 30px;
    }
</style>

<script>
    export default {
        props:['goodsCount','goodsId'],
        data(){
            return {
                count:1
            }
        },
        created(){
            this.count = this.goodsCount
        },
        methods:{
            substrict(){
                if(this.count<=1) return

                this.count--

                this.notify()
            },
            add(){
                this.count++

                this.notify()
            },
            notify(){
                const goods = {
                    goodsId:this.goodsId,
                    count:this.count
                }

                this.$emit('goodsCountChange',goods)
            }
        }
    }
</script>