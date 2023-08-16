<template>
    <div>
        <!-- 顶部菜单 -->
        <!-- <div class="menu">
            <img src="../../../assets/听书-目录.png" class="cataBtn" @click="openCata()"/>   
            <router-link to="/know/front-end/index" class="reBtn">
                <img src="../../../assets/返回.png"  @click="toNoteMain()"/>
            </router-link>

            <div class="catalog" v-show="showCata">
                <ul>
                    <li  v-for="(item, index) in catalog" :key="index" @click="toContent(index)">
                        <span>{{ item.text }}</span>
                    </li>
                </ul>
            </div>             
        </div> -->
        <div class="noteList">
            <div class="mesBox" v-for="(item, index) in noteMd" :key="index">
                <!-- 笔记标题 -->
                <!-- <div 
                    class="mesTitle"
                    @mouseenter="onAbs(index)"
                    @mouseleave="offAbs(index)"
                    @click="toContent(index, 0)"
                > -->
                <div 
                    class="mesTitle"
                    @click="toContent(index, 0)"
                >                
                    <span>{{ item.noteName }}</span>           
                </div>
                <!-- 笔记目录 -->
                <!-- <div 
                    class="absBox" 
                    @mouseenter="onAbs(index)" 
                    @mouseleave="offAbs(index)"
                > -->
                <div class="absBox">
                    <div class="openList" @click="controlCata(index)">
                        <div :class="controlStyle[index]"></div>
                    </div>
                    <ul class="mesList">
                        <li 
                            v-for="(i ,ind) in item.catalog" 
                            :key="ind"
                            class="mesContent"
                            v-show="item.showflag"
                            @click="cataToContent(index, ind)"
                        >
                            <span>{{ i.text }}</span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
    name:'NoteAbs',
    data(){
        return{
            showCata: false,
            onlyCata: true,
            // 记录上次打开目录的笔记位置
            lastIndex: 0,
        }
    },
    methods:{
        // 鼠标移入目录
        onAbs(index){
            this.noteMd[index].showflag = true
            // this.$props.mesAbs[index].showAbs = true
        },
        // 鼠标移出目录
        offAbs(index){
            this.noteMd[index].showflag = false
            // this.$props.mesAbs[index].showAbs = false
        },
        // 关闭当前打开的note，返回到主菜单
        toNoteMain(){
            console.log('Back to NoteMain.')
        },
        openCata(){
            this.showCata = !this.showCata;
        },
        // 打开对应笔记，同时开启感应模式
        toContent(objIndex, catalogIndex){
            // 更新笔记的下标值，标题的下标值
            this.$store.commit('INCONTENT', [objIndex, catalogIndex])
            // 第一次点击户开启目录
            this.noteMd[objIndex].showflag = true
            // 箭头指向上方
            this.controlStyle[objIndex]= 'moreArrow_top'
            // 关闭非本次目标打开的目录
            for(let i=0; i<this.noteMd.length; i++){
                if(i !== objIndex){
                    this.noteMd[i].showflag = false
                    // 箭头指向下方
                    this.controlStyle[i] = 'moreArrow_bottom'
                }
            }
            // if(this.lastIndex !== objIndex){
            //     this.noteMd[this.lastIndex].showflag = false
            //     // 箭头指向下方
            //     this.controlStyle[this.lastIndex] = 'moreArrow_bottom'
            // }
            // 记录该次点击的目录下标，方便下一次点击时关闭上次打开的目录
            this.lastIndex = objIndex
        },
        cataToContent(objIndex, catalogIndex){
            // 更新笔记的下标值，标题的下标值
            this.$store.commit('CATAINCONTENT', [objIndex, catalogIndex, this.onlyCata])
            // 关闭非本次目标打开的目录
            for(let i=0; i<this.noteMd.length; i++){
                if(i !== objIndex){
                    this.noteMd[i].showflag = false
                    // 箭头指向下方
                    this.controlStyle[i] = 'moreArrow_bottom'
                }
            }
            // 始终保持与state中的onlyCata不同值
            this.onlyCata = !this.onlyCata
        },
        // 控制目录显示
        controlCata(index){
            // 打开/关闭目录
            this.noteMd[index].showflag = !this.noteMd[index].showflag
            if(this.noteMd[index].showflag){
                // 箭头指向上
                this.controlStyle[index] = 'moreArrow_top'
            }else{
                // 箭头指向下
                this.controlStyle[index] = 'moreArrow_bottom'
            }
        }
    },
    computed:{
        ...mapState({catalog:'cataArr', noteMd:'noteMd'}),
        controlStyle(){
            let arr = []
            this.noteMd.forEach((value, index)=>{
                arr[index] = 'moreArrow_bottom'
            })
            return arr
        }
    },
}
</script>

<style scoped>
.menu{
    /* width: 12em; */
    /* position: fixed;
    right: 15px; */
    padding: 2px;
    background: skyblue;
}
.cataBtn{
    width: 20px;
    opacity: 30%;
    cursor: pointer;
    margin-right: 8px;
}
.reBtn{
    position: absolute;
    right: 5px;
    width: 20px;
    opacity: 30%;
    /* cursor: pointer; */
}
.catalog{
    padding: 5px 10px;
}
.catalog ul{
    max-height: 10em;
    overflow: auto;
    margin: 0;
    padding: 0;
    list-style: none
}
.catalog li{
    color: white;
    padding: 5px 3px;
    cursor: pointer;
}
.catalog li:hover{
    background: rgb(52, 75, 98);
    /* text-decoration: none; */
}
.noteList{
    width: 165px;
    /* max-width: 140px; */
}
.mesBox{
    width: 140px;
    margin-left: 10px;
    margin-top: 10px;
    /* width: 16em; */
    /* height: 25em; */
    padding: 5px;
    /* border: 1px rgb(239, 241, 244) solid; */
    border-radius: 15px;
}
.mesBox a{
    text-decoration: none;
}
.mesTitle{
    /* background: rgb(208, 223, 245); */
    height: 2.5em;
    line-height: 2.5em;
    text-align: center;
    font-size: 22px;
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
    border-radius: 15px;
    cursor: pointer;
}
.absBox{
    /* background: red; */
    padding: 0 0 8px 0;
}
/* 目录样式 */
.mesList{
    width: 120px;
    /* border: 1px rgb(231, 233, 237) solid; */
    border-top-left-radius: 10px;
    border-bottom-left-radius: 10px;
    background: rgb(231, 233, 237);
    list-style: none;
    padding: 0;
    margin: 3px 0 0 10px;
    max-height: 20em;
    overflow: auto;
    /* margin: 10px 0; */
}
.mesList::-webkit-scrollbar{
    border-radius: 5px;
    width: 5px;
}
.mesList::-webkit-scrollbar-thumb{
    /* border-radius: 5px; */
    background: rgb(77, 89, 106);
}
/* 目录内条目样式 */
.mesContent{
    cursor: pointer;
    border-top-left-radius: 10px;
    border-bottom-left-radius: 10px;
    padding: 5px;
    max-height: 14px;
    overflow: hidden;
    font-size: 14px;
}
.mesContent:hover{
    background: rgb(183, 183, 183);
}
/* 目录开关样式 */
.openList{
    height: 10px;
    width: 120px;
    margin-left: 10px;
    cursor: pointer;
    /* border: 1px black solid; */
}
.moreArrow_top{
    height: 0;
    width: 0;
    border: 5px black solid;
    border-left-color: transparent;
    border-right-color: transparent;
    border-top-color: transparent;
    margin-left: 55px;
    margin-top: -2px;
    /* margin-bottom: 4px; */
}
.moreArrow_bottom{
    height: 0;
    width: 0;
    border: 5px black solid;
    border-left-color: transparent;
    border-right-color: transparent;
    border-bottom-color: transparent;
    margin-left: 55px;
    margin-top: 4px;
}
</style>