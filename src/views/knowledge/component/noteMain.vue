<template>
    <div class="noteWhole">
        <div class="mainContent" ref="whole-html"></div>
    </div>
</template>

<script>
// import TestMd from '../test.md'
// import { TestMd } from '../frontend/note'
import { mapState } from 'vuex'

export default {
    name:'NoteMain',
    components:{
        // TestMd
    },
    data(){
        return{
            dataString:'noteMd'
        }
    },
    methods:{

    },
    mounted(){
        // 发送axios请求，获取前端md文件信息
        // this.$store.dispatch('getFrontend')

        // console.log(this.$refs['whole-html'].children[0])
        // // 借助ref获取渲染后的html结构
        // // 浅拷贝正文部分的node结构 
        // const mostNode = this.$refs['whole-html'].children[0].children[0].children[1].children
        // for(let i=0; i<mostNode.length; i++){
        //     // 匹配目录
        //     if(mostNode[i].localName === 'h2'){
        //         // 修改对应目录名的class,方便后续的跳转
        //         mostNode[i].id = 'h_' + i
        //         // 添加目录名以及对应的class名
        //         this.catalog.push({
        //             node:mostNode[i],
        //             text:mostNode[i].innerText,
        //             id:'h_'+i
        //         })
        //     }
        // }
        // this.$store.commit('GETCATA', this.catalog);
    },
    computed:{
        // actualIndex(){
        //     // newValue = this.$store.state.contentIndex
        //     // this.$refs['whole-html'].children[0].children[0].scrollTop = this.catalog[newValue].node.offsetTop
        //     return this.$store.state.contentIndex
        // }
        // this.$store
        ...mapState({noteIndex:'mdIndex', actualIndex:'contentIndex', onlyCata:'onlyCata', noteMd:'noteMd'}),
        // ...mapState({noteMd:'noteMd'})
    },
    watch:{
        // immediate: true,
        // 定位某个标题及具体标题位置
        noteIndex(newIndex){
            console.log(this.noteMd)
            if(this.noteMd.length !== 0 && this.noteMd[newIndex].catalog.length !== 0 ){
                // 先深拷贝一个元素节点，否则浅拷贝会导致原本的元素节点丢失
                const cloneNode = this.noteMd[newIndex].noteDOM.children[0].cloneNode(true)
                // const oldNode = this.noteMd[oldIndex].noteDOM
                // console.log('old', oldNode.children)
                // console.log('笔记改变', newIndex, this.noteMd[newIndex].noteDOM.children)
                
                // 先清空原有笔记内容，也会清空frontend数组中保留的DOM节点
                // this.$refs['whole-html'].removeChild()
                this.$refs['whole-html'].innerHTML = ''
                // 加载新的笔记内容
                this.$refs['whole-html'].appendChild(cloneNode)


                // 如果top值已经存在，就不用就行，先判断是否只有一个标题
                if(this.noteMd[newIndex].catalog.length > 1 && this.noteMd[newIndex].catalog[1].nodeTop===0){
                    // 解析DOM对象，生成有效Top值
                    let mostNode = this.$refs['whole-html'].children[0].children[1].children
                    // console.log(mostNode)
                    // 标记catalog数组的下标位置
                    let j=0;
                    for(let i=0; i<mostNode.length; i++){
                        // 匹配目录
                        if(mostNode[i].localName === 'h2'){
                            // // 修改对应目录名的class,方便后续的跳转
                            // mostNode[i].id = 'h_' + i
                            // // 添加目录名以及对应的class名
                            this.noteMd[newIndex].catalog[j++].nodeTop=mostNode[i].offsetTop
                        }
                    }
                }
                // // 定位到对应位置
                // this.$refs['whole-html'].children[0].scrollTop = this.noteMd[newIndex].catalog[this.actualIndex].nodeTop
                console.log('笔记改变')
            }else if(this.noteMd.length !== 0 && this.noteMd[newIndex].catalog.length === 0){
                // console.log('22',this.noteMd[newIndex].noteDOM.children)
                const cloneNode = this.noteMd[newIndex].noteDOM.children[0].cloneNode(true)
                this.$refs['whole-html'].innerHTML = ''
                this.$refs['whole-html'].appendChild(cloneNode)
            }
            // console.log('r1', this.noteMd[oldIndex].noteDOM.children)
            // console.log(this.$refs['whole-html'].children)
            
        },
        // 定位一个笔记的某个标题
        actualIndex(newValue){
            // 防止改变笔记大方向重新请求资源前出现空数组报错
            if(this.noteMd.length !== 0){
                console.log('定位标题')
                // console.log(this.$refs['whole-html'].children)
                // console.log(this.noteMd[this.noteIndex].catalog[newValue])
                // newValue = this.$store.state.contentIndex
                this.$refs['whole-html'].children[0].scrollTop = this.noteMd[this.noteIndex].catalog[newValue].nodeTop
                // return index
            }
        },
        // 随时定位到笔记的某个标题
        onlyCata(){
            console.log('随时定位')
            this.$refs['whole-html'].children[0].scrollTop = this.noteMd[this.noteIndex].catalog[this.actualIndex].nodeTop

        },
        noteMd:{
            // deep:true,
            handler(){
                // console.log(oldValue)
                // console.log(newValue)
                // let noteIndex = newValue[0].mdIndex
                // // 初次渲染
                // if(oldValue.length === 0){
                //     this.$refs['whole-html'].appendChild(this.noteMd[noteIndex].noteDOM.children[0])
                // }else if(newValue[0].mdIndex !== oldValue[0].mdIndex){
                //     // 笔记改变时
                //     console.log('change md')
                //     this.$refs['whole-html'].appendChild(this.noteMd[newValue[0].mdIndex].noteDOM.children[0])
                // }

                // let contentIndex = this.noteMd[0].contentIndex
                // console.log(this.$refs['whole-html'].children)
                // console.log('1',this.noteMd[0].noteDOM.children)
                
                // 当请求到资源时开始页面加载
                if(this.noteMd[this.noteIndex] !== undefined){
                    // 初次默认加载第一个笔记
                    // 先深拷贝一个元素节点，否则浅拷贝会导致原本的元素节点丢失
                    const clonedNode = this.noteMd[this.noteIndex].noteDOM.children[0].cloneNode(true)
                    this.$refs['whole-html'].appendChild(clonedNode)
                    // 解析DOM对象，生成有效Top值
                    let mostNode = this.$refs['whole-html'].children[0].children[1].children
                    // 标记catalog数组的下标位置
                    let j=0;
                    for(let i=0; i<mostNode.length; i++){
                        // 匹配目录
                        if(mostNode[i].localName === 'h2'){
                            // 更新有效top值
                            this.noteMd[this.noteIndex].catalog[j++].nodeTop=mostNode[i].offsetTop
                        }
                    }
                }
            }
        },
    }
}
</script>

<style scoped>
.noteWhole{
    position: relative;
    height: 100%;
    width: calc(100% - 165px);
    /* margin-right: 120px; */
    /* overflow: auto; */
    /* padding: 0 5px; */
}

/* .catalog a:active{
    text-decoration: none;
} */

/* .noteMenu{
    height: 30px;
    background: rgb(255, 255, 255);
    box-shadow: 0 2px 2px rgb(255, 255, 255);
} */
.mainContent{
    /* margin-top: 2px; */
    /* margin-left: 5px;
    margin-right: 5px; */
    /* padding: 0 2px 10px 2px; */
    height: calc(100% - 3px);
}
.mainContent>>>html{
    /* width: calc(100% - 120px); */
    /* min-width: 800px;
    max-width: calc(100% - 120px); */
    background: rgb(255, 255, 255);
    height: 100%;
    overflow: auto;
    /* overflow-x: hidden; */
    /* width: 1200px; */
    padding: 0 1em;
    /* border-top-left-radius: 15px;
    border-bottom-left-radius: 15px; */
    /* direction: rtl; */
}
.mainContent>>>html::-webkit-scrollbar{
    /* background: skyblue; */
    border-radius: 15px;
    width: 5px;
    height: 10px;
}
.mainContent>>>html::-webkit-scrollbar-thumb{
    background: rgb(200, 226, 236);
    border-radius: 15px;
}
/* .mainContent >>> h1,h2,h3,h4,h5,h6{
    width: 200px;
} */
/* .mainContent >>> h2{
    width: 200px;
}
.mainContent >>> ol,ul{
    color: red;
    width: 200px;
}
.mainContent >>> ul{
    color: red;
    width: 200px;
} */
</style>