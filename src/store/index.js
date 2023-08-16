import Vuex from 'vuex'
import Vue from 'vue'
import axios from 'axios'
import { marked } from 'marked'

Vue.use(Vuex)

class noteObj{
    constructor(noteDOM, noteName, catalog, showflag){
        // DOM对象传入noteMain组件，控制目录的定位
        this.noteDOM = noteDOM
        // this,noteString = noteString
        // 传入noteAbs组件，生成目录
        this.noteName = noteName
        this.catalog = catalog
        // 传入noteAbs组件，控制目录的显示
        this.showflag = showflag
        
    }
}

function parseDOM(mdString){
    // md字符串->html字符串，清除警告内容
    let contentHTML = marked.parse(mdString, {mangle:false, headerIds:false})
    // html字符串->DOM对象
    let parsedDOM = new DOMParser().parseFromString(contentHTML, 'text/html')
    return parsedDOM
}

const state = {
    // 前端md文件信息
    noteMd:[],
    // 点击目录的index值，控制页面内定位，默认设置为第一个标题处
    // 定位文章位置
    mdIndex:0,
    // 定位文章内标题
    contentIndex:0,
    // 判断是否只是点击了目录标题
    onlyCata:false
}
const actions = {
    // 请求并解析md文件
    async getFrontend(context){
        context.commit('CLEARARR')
        const baseUrl = 'note/frontend'
        // 暂存md文件名，为后续封装成对象做准备
        let fileNameArr = []
        // let htmlString = []
        // 暂存md文件内容（解析为DOM对象），为后续封装成对象做准备
        let fileDOMArr = []
        // 暂存md文件目录（根据DOM对象所得），为后续封装成对象做准备
        let catalogArr = []
        // 暂存文件路径，方便后续请求文件内容
        let filePathArr = []
        // 请求本地文件，执行对应操作
        await axios.get(baseUrl)
            // 请求成功
            .then(response => {
                response.data.forEach((noteName)=>{
                    // 获取当前文件夹下的所有md文件名，并去掉md后缀
                    fileNameArr.push(noteName.split('.')[0])
                    filePathArr.push(baseUrl + '/' + noteName)
                })
                // return filePathArr
            }).catch(err=>{
                console.log('请求文件名出错: ', err)
            })
            // 请求到所有的md文件路径后，遍历所有文件路径获取对应md文件内容
            // .then(filePathArr => {
                for(let item of filePathArr){
                // for(let ind=0; ind<filePathArr.length; ind++){
                //     let item = filePathArr[ind]
                    // console.log(item)
                    // 再次请求获取md文件内容
                    await axios.get(item)
                        .then(mdString => {
                            // htmlString.push(mdString.data)
                            let mdDOM = parseDOM(mdString.data)
                            fileDOMArr.push(mdDOM)
                            // 解析DOM对象，生成目录
                            let mostNode = mdDOM.children[0].children[1].children
                            let catalog = []
                            for(let i=0; i<mostNode.length; i++){
                                // 匹配目录
                                if(mostNode[i].localName === 'h2'){
                                    // // 修改对应目录名的class,方便后续的跳转
                                    // mostNode[i].id = 'h_' + i
                                    // // 添加目录名以及对应的class名
                                    catalog.push({
                                        nodeTop: 0,
                                        text:mostNode[i].innerText,
                                    })
                                }
                            }
                            catalogArr.push(catalog)
                        })
                        .catch(err=>{
                            console.log('请求文件内容出错: ', err)
                        })
                }
                // 仅当所有数组准备就绪后进行对象的封装
                if(fileNameArr.length === fileDOMArr.length &&  fileDOMArr.length === catalogArr.length && catalogArr.length !== 0){
                    // console.log(fileNameArr.length === fileDOMArr.length &&  fileDOMArr.length === catalogArr.length && catalogArr.length !== 0)
                    let noteMd = []
                    // // 初始化时就加入控制页面显示的控制位，默认显示第一个笔记
                    // let noteMd = [new controlInd(1, 0)]                             
                    // 封装为组件可用对象，并commit出去
                    for(let i=0; i<fileNameArr.length; i++){
                        noteMd.push(new noteObj(fileDOMArr[i], fileNameArr[i], catalogArr[i], false, 0, 0))
                    }
                    context.commit('GETFRONTENDMD',noteMd)
                }
                // filePathArr.forEach((item, index)=>{
                //     // 再次请求获取md文件内容
                //     axios.get(item)
                //         .then(mdString => {
                //             // htmlString.push(mdString.data)
                //             let mdDOM = parseDOM(mdString.data)
                //             fileDOMArr.push(mdDOM)
                //             // 解析DOM对象，生成目录
                //             let mostNode = mdDOM.children[0].children[1].children
                //             let catalog = []
                //             for(let i=0; i<mostNode.length; i++){
                //                 // 匹配目录
                //                 if(mostNode[i].localName === 'h2'){
                //                     // // 修改对应目录名的class,方便后续的跳转
                //                     // mostNode[i].id = 'h_' + i
                //                     // // 添加目录名以及对应的class名
                //                     catalog.push({
                //                         node:mostNode[i],
                //                         text:mostNode[i].innerText,
                //                     })
                //                 }
                //             }
                //             catalogArr.push(catalog)
                //             // 仅当所有数组准备就绪后进行对象的封装
                //             if(fileNameArr.length === fileDOMArr.length &&  fileDOMArr.length === catalogArr.length && catalogArr.length !== 0){
                //                 // console.log(fileNameArr.length === fileDOMArr.length &&  fileDOMArr.length === catalogArr.length && catalogArr.length !== 0)
                //                 // console.log('00')
                //                 let noteMd = []                             
                                
                //                 // // 初始化时就加入控制页面显示的控制位，默认显示第一个笔记
                //                 // let noteMd = [new controlInd(1, 0)]                             
                //                 // 封装为组件可用对象，并commit出去
                //                 for(let i=0; i<fileNameArr.length; i++){
                //                     noteMd.push(new noteObj(fileDOMArr[i], fileNameArr[i], catalogArr[i], false, 0, 0))
                //                 }
                //                 console.log(noteMd)
                //                 context.commit('GETFRONTENDMD',noteMd)
                //             }
                //         }).then(()=>{

                //         })
                //         .catch(err=>{
                //             console.log('请求文件内容出错: ', err)
                //         })
                // })
            // }).then(()=>{
            //     console.log(fileNameArr)
            //     console.log(fileDOMArr)
            //     console.log(catalogArr)
            // })     
    },

    // 请求并解析md文件
    async getRearend(context){
        context.commit('CLEARARR')
        const baseUrl = 'note/rearend'
        // 暂存md文件名，为后续封装成对象做准备
        let fileNameArr = []
        // let htmlString = []
        // 暂存md文件内容（解析为DOM对象），为后续封装成对象做准备
        let fileDOMArr = []
        // 暂存md文件目录（根据DOM对象所得），为后续封装成对象做准备
        let catalogArr = []
        // 暂存文件路径，方便后续请求文件内容
        let filePathArr = []
        // 请求本地文件，执行对应操作
        await axios.get(baseUrl)
            // 请求成功
            .then(response => {
                response.data.forEach((noteName)=>{
                    // 获取当前文件夹下的所有md文件名，并去掉md后缀
                    fileNameArr.push(noteName.split('.')[0])
                    filePathArr.push(baseUrl + '/' + noteName)
                })
                // return filePathArr
            }).catch(err=>{
                console.log('请求文件名出错: ', err)
            })
            // 请求到所有的md文件路径后，遍历所有文件路径获取对应md文件内容
            // .then(filePathArr => {
                for(let item of filePathArr){
                // for(let ind=0; ind<filePathArr.length; ind++){
                //     let item = filePathArr[ind]
                    // console.log(item)
                    // 再次请求获取md文件内容
                    await axios.get(item)
                        .then(mdString => {
                            // htmlString.push(mdString.data)
                            let mdDOM = parseDOM(mdString.data)
                            fileDOMArr.push(mdDOM)
                            // 解析DOM对象，生成目录
                            let mostNode = mdDOM.children[0].children[1].children
                            let catalog = []
                            for(let i=0; i<mostNode.length; i++){
                                // 匹配目录
                                if(mostNode[i].localName === 'h2'){
                                    // // 修改对应目录名的class,方便后续的跳转
                                    // mostNode[i].id = 'h_' + i
                                    // // 添加目录名以及对应的class名
                                    catalog.push({
                                        nodeTop: 0,
                                        text:mostNode[i].innerText,
                                    })
                                }
                            }
                            catalogArr.push(catalog)
                        })
                        .catch(err=>{
                            console.log('请求文件内容出错: ', err)
                        })
                }
                // 仅当所有数组准备就绪后进行对象的封装
                if(fileNameArr.length === fileDOMArr.length &&  fileDOMArr.length === catalogArr.length && catalogArr.length !== 0){
                    // console.log(fileNameArr.length === fileDOMArr.length &&  fileDOMArr.length === catalogArr.length && catalogArr.length !== 0)
                    let noteMd = []
                    // // 初始化时就加入控制页面显示的控制位，默认显示第一个笔记
                    // let noteMd = [new controlInd(1, 0)]                             
                    // 封装为组件可用对象，并commit出去
                    for(let i=0; i<fileNameArr.length; i++){
                        noteMd.push(new noteObj(fileDOMArr[i], fileNameArr[i], catalogArr[i], false, 0, 0))
                    }
                    context.commit('GETFRONTENDMD',noteMd)
                } 
    },

    // 请求并解析md文件
    async getDeeplearn(context){
        context.commit('CLEARARR')
        const baseUrl = 'note/rearend'
        // 暂存md文件名，为后续封装成对象做准备
        let fileNameArr = []
        // let htmlString = []
        // 暂存md文件内容（解析为DOM对象），为后续封装成对象做准备
        let fileDOMArr = []
        // 暂存md文件目录（根据DOM对象所得），为后续封装成对象做准备
        let catalogArr = []
        // 暂存文件路径，方便后续请求文件内容
        let filePathArr = []
        // 请求本地文件，执行对应操作
        await axios.get(baseUrl)
            // 请求成功
            .then(response => {
                response.data.forEach((noteName)=>{
                    // 获取当前文件夹下的所有md文件名，并去掉md后缀
                    fileNameArr.push(noteName.split('.')[0])
                    filePathArr.push(baseUrl + '/' + noteName)
                })
                // return filePathArr
            }).catch(err=>{
                console.log('请求文件名出错: ', err)
            })
            // 请求到所有的md文件路径后，遍历所有文件路径获取对应md文件内容
            // .then(filePathArr => {
                for(let item of filePathArr){
                // for(let ind=0; ind<filePathArr.length; ind++){
                //     let item = filePathArr[ind]
                    // console.log(item)
                    // 再次请求获取md文件内容
                    await axios.get(item)
                        .then(mdString => {
                            // htmlString.push(mdString.data)
                            let mdDOM = parseDOM(mdString.data)
                            fileDOMArr.push(mdDOM)
                            // 解析DOM对象，生成目录
                            let mostNode = mdDOM.children[0].children[1].children
                            let catalog = []
                            for(let i=0; i<mostNode.length; i++){
                                // 匹配目录
                                if(mostNode[i].localName === 'h2'){
                                    // // 修改对应目录名的class,方便后续的跳转
                                    // mostNode[i].id = 'h_' + i
                                    // // 添加目录名以及对应的class名
                                    catalog.push({
                                        nodeTop: 0,
                                        text:mostNode[i].innerText,
                                    })
                                }
                            }
                            catalogArr.push(catalog)
                        })
                        .catch(err=>{
                            console.log('请求文件内容出错: ', err)
                        })
                }
                // 仅当所有数组准备就绪后进行对象的封装
                if(fileNameArr.length === fileDOMArr.length &&  fileDOMArr.length === catalogArr.length && catalogArr.length !== 0){
                    // console.log(fileNameArr.length === fileDOMArr.length &&  fileDOMArr.length === catalogArr.length && catalogArr.length !== 0)
                    let noteMd = []
                    // // 初始化时就加入控制页面显示的控制位，默认显示第一个笔记
                    // let noteMd = [new controlInd(1, 0)]                             
                    // 封装为组件可用对象，并commit出去
                    for(let i=0; i<fileNameArr.length; i++){
                        noteMd.push(new noteObj(fileDOMArr[i], fileNameArr[i], catalogArr[i], false, 0, 0))
                    }
                    context.commit('GETFRONTENDMD',noteMd)
                } 
    }
}
const mutations = {
    // 初始化state内与笔记更新相关的内容
    CLEARARR(state){
        state.noteMd = []
        state.mdIndex=0
        state.contentIndex=0
        // state.onlyCata=false
    },
    // 获取md文件信息
    GETFRONTENDMD(state, value){
        state.noteMd = value
    },
    // 点击笔记标题更新对应的索引值
    INCONTENT(state, [noteIndex, catalogIndex]){
        // console.log(noteIndex, catalogIndex)
        // state.noteMd[0].mdIndex = noteIndex
        // state.noteMd[0].contentIndex = catalogIndex
        state.mdIndex = noteIndex
        state.contentIndex = catalogIndex
    },
    // 点击笔记目录进行更新
    CATAINCONTENT(state, [noteIndex, catalogIndex, onlyCata]){
        // console.log(noteIndex, catalogIndex)
        // state.noteMd[0].mdIndex = noteIndex
        // state.noteMd[0].contentIndex = catalogIndex
        state.mdIndex = noteIndex
        state.contentIndex = catalogIndex
        state.onlyCata = onlyCata
    }
}

export default new Vuex.Store({
    state,
    actions,
    mutations,
})