<template>
    <div>
        <!-- 导航栏 -->
        <!-- 三栏布局 -->
        <div class="topNav">
            <div @click="handleSide()" class="leftImg">
                <img :class="showSide ? 'openSide' : ''" src="../../../../assets/库存系统.png" alt="导航栏"> 
            </div>
            <div class="middle">
                <span>管理系统</span>
            </div>
            <div class="rightImg">
                <img src="../../../../assets/服务管理.png" alt="个人管理">
                <img src="../../../../assets/三角.png" alt="更多">
            </div>
        </div>
        <!-- 面包屑 -->
    </div>
</template>

<script>
export default {
    data(){
        return{
            showSide: false,
        }
    },
    methods:{
        handleSide(){
            this.$emit('openSideFn')
            this.showSide = !this.showSide
        }
    }
}
</script>

<style scoped>
.topNav{
    --height: 50px;
    position: relative;
    height: var(--height);
    box-shadow: 0 1px 4px rgb(0 21 41 / 8%);
}
.leftImg{
    display: inline-block;
    /* width: 50px; */
    height: var(--height);
    vertical-align: middle;
    /* 微调以达到水平对齐的效果 */
    line-height: 54px;
    padding: 0 15px;
    /* margin-left: 10px; */
    transition: 0.5s;
}
/* .leftImg img{
    transition: 0.5s;
} */
.openSide{
    /* opacity: 0; */
    transform: rotate(180deg);
}
.middle{
    display: inline-block;
    height: var(--height);
    vertical-align: middle;
    line-height: var(--height);
    margin-left: 8px;
    font-size: 14px;
}
.rightImg{
    vertical-align: middle;
    position: absolute;
    top: 50%;
    right: 20px;
    transform: translate(0, -50%);
}
</style>