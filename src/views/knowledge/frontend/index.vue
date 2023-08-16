<template>
    <div class="note">
        <note-abs class="noteAbs"></note-abs>
        <note-main class="noteMain"></note-main>
    </div>
</template>

<script>
import NoteAbs from '../component/noteAbs.vue'
import NoteMain  from '../component/noteMain.vue'

export default {
    name:'FrontEnd',
    components:{
        NoteAbs,
        NoteMain
    },
    data(){
        return{
            
        }
    },
    mounted(){
        this.$store.dispatch('getFrontend')
        // // 获取某一文件夹下的所有符合规则的文件名，参数：路径、是否读取子文件夹、匹配规则
        // const mdFile = require.context('./note', false, /\.md$/).keys()
        // console.log(mdFile)
    }
}
</script>

<style scoped>
.note{
    height: 100%;
    position: relative;
}
.noteMain{
    /* position: absolute;
    top: 0px; */
    /* left: 100px; */
    height: 100%;
}
.noteAbs{
    float: right;
    height: 100%;
    /* width: 100%; */
    overflow-x: hidden;
    overflow-y: auto;
    /* top: 0; */
}
.noteAbs::-webkit-scrollbar{
    width: 5px;
}
.noteAbs::-webkit-scrollbar-thumb{
    background: black;
}
</style>