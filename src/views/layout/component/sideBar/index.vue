<template>
    <div class="whole" :class="openSide ? '':'closeState'">
        <div class="header">
            <span>{{ openSide ? '通用管理系统' : '系统'}}</span>
        </div>
        <!-- 目录 -->
        <ul class="list" ref="wholeList">
            <div v-for="(item, index) in ableList" :key="index" >
                <!-- 有子目录的一级目录 -->
                <div v-if="item.child && item.child.length !== 0">
                    <li :class="openSide ? '':'listItem'">
                        <div 
                            class="item" 
                            @click="item.child && item.child.length !== 0 && openChildList(index)"
                            @mouseenter="handleToast($event, index)"
                            @mouseleave="offToast()"
                        >
                            <img class="leftImg" src="../../../../assets/首页.png" alt="首页">
                            <span v-show="openSide">{{ item.title }}</span>
                            <img
                                v-show="openSide && item.child && item.child.length !== 0" 
                                class="rightImg" 
                                :class="item.isShow ? 'openChild':''"
                                src="../../../../assets/下拉.png" 
                                alt="更多">
                        </div>
                    </li>
                    <!-- 二级目录 -->
                    <!-- <Transition name="showList"> -->
                    <ul class="childList" v-show="openSide && item.isShow">
                        <!-- <a href=""> -->
                            <div v-for="(i, ind) in item.child" :key="ind">
                                <router-link :to="item.path + i.path">
                                    <li class="childListItem">
                                    <!-- <img class="leftImg" src="../../../../assets/首页.png" alt="首页"> -->
                                            <span>{{ i.title }}</span>
                                    <!-- <img class="rightImg" src="../../../../assets/下拉.png" alt="更多"> -->
                                    </li>
                                </router-link>
                            </div>
                        <!-- </a> -->
                    </ul>
                    <!-- </Transition>  -->
                </div>
                <!-- 无子目录的一级目录 -->
                <div v-else="">
                    <router-link :to="item.path">
                    <!-- <a href=""> -->
                        <li :class="openSide ? '':'listItem'">
                            <div 
                                class="item"
                                @mouseenter="showTextToast($event, index)"
                                @mouseleave="offTextToast()"
                            >
                                <img class="leftImg" src="../../../../assets/首页.png" alt="首页">
                                <span v-show="openSide">{{ item.title }}</span>
                            </div>
                        </li>
                    <!-- </a> -->
                    </router-link>
                </div>
            </div>
        </ul>
        <!-- 二级目录弹窗 -->
        <div
            v-show="!openSide && isShowToast"
            class="childList-toast"
            ref="childListToast"
            @mouseenter="liveToast()"
            @mouseleave="liveToastOff()"
        >
            <ul>
                <!-- <a href=""> -->
                    <div v-for="(i, ind) in ableList[toastIndex].child" :key="ind">
                        <router-link :to="ableList[toastIndex].path + i.path">    
                            <li  class="childListItem">
                            <!-- <img class="leftImg" src="../../../../assets/首页.png" alt="首页"> -->
                                    <span>{{ i.title }}</span>
                            <!-- <img class="rightImg" src="../../../../assets/下拉.png" alt="更多"> -->
                            </li>
                        </router-link>
                    </div>
                    
                <!-- </a> -->
            </ul>
        </div>
        <!-- 一级目录文字提示 -->
        <div
            v-show="!openSide && isShowTextToast"
            class="textToast"
            ref="textToast"
            @mouseenter="liveTextToast()"
            @mouseleave="liveTextToastOff()"
        >
            <div class="leftArrow"></div>
            <div class="rightText">
                <span>{{ textToast }}</span>
            </div>
            
            
        </div>
    </div>
    <!-- </div> -->
</template>

<script>
export default {
    props:{
        openSide: Boolean,
    },
    // mounted(){
    //     console.log(this.$props.openSide)
    // },
    data(){
        return{
            // openSide: true,
            isShowToast: false,
            isShowTextToast: false,
            textToast: '',
            toastIndex: 0,
            ableList:[
                {
                    title:'备忘录',
                    isShow:false,
                    path:'/remember/index',
                    child:[]
                },{
                    title:'影音录',
                    isShow:false,
                    path:'/media',
                    child:[
                        {
                            title:'视频',
                            path:'/video'
                        },{
                            title:'音频',
                            path:'/audio'
                        },{
                            title:'图片',
                            path:'/picture'
                        }
                    ]
                },{
                    title:'知识',
                    isShow:false,
                    path:'/know',
                    child:[
                        {
                            title:'前端',
                            path:'/front-end'
                        },{
                            title:'后端',
                            path:'/rear-end'
                        },{
                            title:'深度学习',
                            path:'/deep-learn'
                        }
                    ]
                }
            ]
            // isShowChildList: false,
            // ableList:[
            //     {
            //         title:'Documentation',
            //         isShow:false,
            //         path:'/document',
            //         child:[]
            //     },{
            //         title:'Guide',
            //         isShow:false,
            //         path:'/guide',
            //         child:[]
            //     },{
            //         title:'Permission',
            //         isShow:false,
            //         child:[
            //             {
            //                 title:'Page Permission'
            //                 // path:'/page'
            //             },
            //             {
            //                 title:'Directive Permission'
            //             },
            //             {
            //                 title:'Role Permission'
            //             },
            //         ]
            //     },{
            //         title:'Icons',
            //         isShow:false,
            //         path: '/icons',
            //         child:[]
            //     },{
            //         title:'Components',
            //         isShow:false,
            //         child:[
            //             {title:'Tinymce'},
            //             {title:'Markdown'},
            //             {title:'JSON Editor'},
            //             {title:'SplitPane'},
            //             {title:'Upload'},
            //             {title:'Dropzone'},
            //             {title:'Sticky'},
            //             {title:'Count To'},
            //             {title:'Back To Top'},
            //             {title:'Darg Dialog'},
            //             {title:'Drag Select'},
            //             {title:'Dnd List'},
            //             {title:'Drag Kanban'},
            //         ]
            //     },{
            //         title:'Charts',
            //         isShow:false,
            //         child:[
            //             {title:'Keyboard Chart'},
            //             {title:'Line Chart'},
            //             {title:'Mix Chart'},
            //         ]
            //     },{
            //         title:'Nested Routes',
            //         isShow:false,
            //         child:[
            //             {title:'Menu 1'},
            //             {title:'Menu 2'},
            //         ]
            //     },{
            //         title:'Table',
            //         isShow:false,
            //         child:[
            //             {title:'Dynamic Table'},
            //             {title:'Drag Table'},
            //             {title:'Inline Table'},
            //             {title:'Complex Table'},
            //         ]
            //     },{
            //         title:'Example',
            //         isShow:false,
            //         child:[
            //             {title:'Create Article'},
            //             {title:'Article List'},
            //         ]
            //     },{
            //         title:'Tab',
            //         isShow:false,
            //         path: '/tab',
            //         child:[]
            //     },{
            //         title:'Error Pages',
            //         isShow:false,
            //         child:[
            //             {title:'401'},
            //             {title:'402'},
            //         ]
            //     },{
            //         title:'Error Log',
            //         isShow:false,
            //         path: '/error-log',
            //         child:[]
            //     },{
            //         title:'Excel',
            //         isShow:false,
            //         child:[
            //             {title:'Export Excel'},
            //             {title:'Export Selected'},
            //             {title:'Merge Header'},
            //             {title:'Upload Excel'},
            //         ]
            //     },{
            //         title:'Zip',
            //         isShow:false,
            //         child:[
            //             {title:'Export Zip'}
            //         ]
            //     },{
            //         title:'PDF',
            //         isShow:false,
            //         path:'/pdf',
            //         child:[]
            //     },{
            //         title:'Theme',
            //         isShow:false,
            //         child:[]
            //     },{
            //         title:'Clipboard',
            //         isShow:false,
            //         child:[]
            //     },{
            //         title:'External Link',
            //         isShow:false,
            //         child:[]
            //     },
            // ]
        }
    },
    updated(){
        // 当侧边栏收缩时关闭二级菜单
        if(!this.$props.openSide){
            this.ableList.forEach((item)=>{
                item.isShow = false;
            })
        }
    },
    methods:{
        openChildList(index){
            if(this.$props.openSide){
                this.ableList[index].isShow = !this.ableList[index].isShow
            }
        },
        handleToast(e, index){
            this.toastIndex = index;
            let windowHeight = document.documentElement.clientHeight;
            let currentHeight = this.ableList[index].child.length * 56;
            let actualTop = e.target.offsetTop;
            // let actualLeft = e.target.offsetLeft;
            let current = e.target.offsetParent;
            while(current !== null){
                actualTop += current.offsetTop;
                // actualLeft += current.offsetLeft;
                current = current.offsetParent;
            }
            // 获取一级菜单的向下滚动距离
            actualTop -= this.$refs['wholeList'].scrollTop
            // 子菜单高度大于总页面高度
            if(currentHeight >= windowHeight){
                // console.log(0)
                this.$refs['childListToast'].style.height = (windowHeight - 10) + 'px';
                this.$refs['childListToast'].style.overflow = 'auto';
                this.$refs['childListToast'].style.top = '2px';
                this.$refs['childListToast'].style.bottom = '0px';
            }
            // 子菜单位置靠下无法显示完整，所以按照bottom进行定位
            else if(actualTop + currentHeight >= windowHeight){
                // console.log(2)
                this.$refs['childListToast'].style.height = currentHeight + 'px';
                // this.$refs['childListToast'].style.overflow = 'auto';
                this.$refs['childListToast'].style.bottom = '0px';
                this.$refs['childListToast'].style.top = 'auto'
            }
            // 正常情况，子菜单在一级菜单右侧显示
            else{
                // console.log(3)
                this.$refs['childListToast'].style.height = currentHeight + 'px';
                this.$refs['childListToast'].style.top = actualTop + 'px';
            }
            this.isShowToast = true;
            // this.isLive = true;
            // console.log(actualTop)
        },
        offToast(){
            // setTimeout(()=>{
                // if(!this.isLive){
            this.isShowToast = false;
                // }
            // },100)
        },
        liveToast(){
            this.isShowToast = true;
        },
        liveToastOff(){
            this.isShowToast = false;
        },
        showTextToast(e, index){
            // 获取一级菜单下标
            this.toastIndex = index;
            // 确定toast位置
            let actualTop = e.target.offsetTop;
            let current = e.target.offsetParent;
            while(current !== null){
                actualTop += current.offsetTop;
                current = current.offsetParent;
            }
            actualTop -= this.$refs['wholeList'].scrollTop
            this.$refs['textToast'].style.top = (actualTop + 12) + 'px';
            // 确定toast文字内容
            this.textToast = e.target.children[1].innerText;
            // 打开toast
            this.isShowTextToast = true;
            // console.log(e.target.children[1].innerText)
        },
        offTextToast(){
            this.isShowTextToast = false;
            // console.log(e)
        },
        liveTextToast(){
            // this.isShowToast = true;
            this.isShowTextToast = true;
            // this.isLive = true;
        },
        liveTextToastOff(){
            // this.isShowToast = false;
            this.isShowTextToast = false;
            // this.isLive = false;
            // this.offToast();
        },
    },
}
</script>

<style scoped>
.whole{
    --height: 56px;
    --shadow--height: 5px;
    height: 100%;
}
.closeState{
    width: 56px;
}
.header{
    height: var(--height);
    line-height: var(--height);
    text-align: center;
    box-shadow: -10px var(--shadow--height) calc(var(--shadow--height) * 2) rgb(38, 52, 69);
    cursor: default;
    font-size: 14px;
    overflow: hidden;
}
.list{
    padding: 0;
    margin-top: 0;
    height: calc(100% - var(--height));
    overflow: auto;
}
.list::-webkit-scrollbar{
    width: 5px;
}
.list::-webkit-scrollbar-thumb{
    background: rgb(77, 89, 106);
}
.offState{
    position: relative;
}
.listItem{
    width: 50px;
    height: var(--height);
    position: relative;
    /* overflow: hidden; */
}
.item{
    position: relative;
    --padding: 20px;
    /* --height: 56px ; */
    /* border: 1px solid black;
    border-left: none;
    border-right: none; */
    /* width: 100%; */
    /* height: var(--height); */
    height: 100%;
    padding: 0 var(--padding);
    /* margin: auto -16px; */
    /* margin: 0.5em 0; */
    color: rgb(191, 203, 217);
    cursor: pointer;
    overflow: hidden;
}
.item span{
    /* overflow: hidden; */
    /* display: block; */
    /* width: 80%; */
    /* height: 100%; */
    text-align: center;
    margin-left: 30px;
    vertical-align: middle;
    /* padding: 3px 0; */
    line-height: var(--height);
    font-size: 14px;
}
.item:hover{
    background: rgb(38, 52, 69);
}
.listItem:hover{
    background: rgb(38, 52, 69);
}
.leftImg{
    width: 16px;
    height: 16px;
    position: absolute;
    top: 50%;
    left: var(--padding);
    margin-top: -8px;
    /* vertical-align: middle; */
    /* margin-right: 14px; */
    /* float: left; */
    /* margin: 20px 20px; */
}
.rightImg{
    width: 16px;
    height: 16px;
    vertical-align: middle;
    position: absolute;
    top: 50%;
    right: var(--padding);
    margin-top: -8px;
    /* float: right; */
    transition: 0.5s;
}
.childList{
    /* max-height: 100px; */
    /* height: 100px; */
    padding: 0px;
    background: rgb(31, 45, 61);
}
.childListItem{
    height: var(--height);
    list-style: none;
    padding-left: 40px;
    /* vertical-align: middle; */
    line-height: var(--height);
    color: rgb(191, 203, 217);
    font-size: 14px;
}
/* .childListItem:active{
    list-style: none;
} */
.childListItem:hover{
    background: rgb(0, 21, 40);
}
.childList-toast{
    position: fixed;
    top: 0;
    left: 50px;
    z-index: 1000;
    width: 160px;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}
.childList-toast ul{
    z-index: 1002;
    /* width: 150px; */
    /* max-height: 1vh; */
    overflow: auto;
    background: rgb(31, 45, 61);
    padding: 0;
    margin: 0 0 0 10px;
}
.childList-toast li{
    padding-left: 7px;
    /* width: 140px; */
}
.childList-toast::-webkit-scrollbar{
    width: 5px;
}
.childList-toast::-webkit-scrollbar-thumb{
    background: rgb(77, 89, 106);
}
.childList-toast a{
    text-decoration: none;
}
.childList-toast a:visited{
    text-decoration: none;
    /* color: rgb(64, 158, 255); */
}
/* .textToast{
    position: fixed;
    left: 50px;
    height: 30px;
    width: 160px;
    background: rgb(77, 89, 106);
    color: rgb(191, 203, 217);
} */
.list a{
    text-decoration: none;
}
.list a:visited{
    text-decoration: none;
    /* color: rgb(64, 158, 255); */
}
.openChild{
    transform: rotate(180deg);
}
/* 文字框toast的height:32px */
.textToast{
    /* --toast--height: 56px; */
    position: fixed;
    /* top: 100px; */
    left: 63px;
    /* border: 1px black solid; */
    /* width: 140px; */
    /* height: var(--toast--height); */
    /* line-height: var(--toast--height); */
    /* overflow: hidden; */
}
.rightText{
    /* width: 100px; */
    /* height: 100%; */
    margin-left: 1px;
    /* vertical-align: middle; */
    /* line-height: var(--toast--height); */
    text-align: center;
    background: #303133;
    color: #FFFFFF;
    /* border: 1px black solid; */
    font-size: 12px;
    padding: 8px;
    border-radius: 4px;
}
.leftArrow{
    position: absolute;
    top: 13px;
    left: -8px;
    height: 0px;
    width: 0px;
    border: 4px solid transparent;
    border-right-color: #303133;
    /* float: left; */
}
/* .showList-enter-active{
    transition: all 5s linear;
} 
.showList-leave-active{
    transition: all 0.5s;
}
.showList-enter-to{
    height: 0;
} 
.showList-leave-to{
    height: 0;
} */
</style>