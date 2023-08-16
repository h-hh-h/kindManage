<template>
    <div class="main" :class="openSide ? '':'closeState'">
        <div class="left" > 
            <SideBar :open-side="openSide"></SideBar>
        </div>
        <div class="right">
            <NavBar class="navbar" @openSideFn="openSideFn"></NavBar>
            <AppMain class="appmain">
                <!-- <router-view></router-view>     -->
            </AppMain>  
        </div>
        
    </div>
</template>

<script>
import { AppMain, NavBar, SideBar } from './component'

export default {
    name:'Layout',
    components: {
        AppMain,
        NavBar,
        SideBar
    },
    // props:{
    //     sidebarName: String,
    //     navbarName: String,
    // },
    data(){
        return{
            openSide: false,
        }
    },
    methods:{
        openSideFn(){
            this.openSide = !this.openSide
        }
    },
    mounted(){
        // console.log('1', SideBar)
    }
}
</script>

<style scoped>
/* .main{
    margin: 0;
} */
.main{
    --left--width: 210px;
}
.closeState{
    --left--width: 56px;
}
.left{
    /* opacity: 0; */
    background: rgb(48, 65, 86);
    float: left;
    width: var(--left--width);
    height: 100vh;
}
.left::after{
    content: '';
    overflow: hidden;
}
.right{
    /* background: red; */
    width: auto;
    height: 100vh;
    margin-left: var(--left--width);
    /* float: right; */
}

.navbar{
    /* opacity: 10%; */
    width: 100%;
    height: 65px;
    background: rgb(255, 255, 255);
}
.appmain{
    width: 100%;
    /* margin-top: 65px; */
    height: calc(100vh - 65px);
    background: rgb(239, 241, 244);
    overflow: auto;
}
</style>