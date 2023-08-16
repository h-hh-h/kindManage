import axios from 'axios'
import { marked } from 'marked'
// import require

// const mdFile = require.context('./', false, /\.md$/).keys()
// console.log(mdFile)
// mdFile.forEach(mdPath => {
//     console.log(mdPath)
//     // import md_1 from mdPath
// });
import TestMd from './test.md'
export {
    TestMd
}



// 不同对应方向下的所有md文件名
let frontendName = []
let rearendName = []
let deeplearnName = []
// 对应的路径名
let frontendPath = []
let rearendPath = []
let deeplearnPath = []
// 不同md文件对应的解析结果（字符串）
let frontendCon = []
let rearendCon = []
let deeplearnCon = []


let fileNameArr = []
let filePathArr = []
let contentArr = []
let contentArrH = []
let catalog = []
// 获取所有md文件名
const baseUrl = 'note/frontend'
axios.get(baseUrl)
    // 请求成功
    .then(response => {
        console.log(response)
        fileNameArr = response.data
        console.log(fileNameArr)
        // let filePathArr = []
        fileNameArr.forEach((noteName)=>{
            filePathArr.push(baseUrl + '/' + noteName)
        })
        console.log(filePathArr)
        return filePathArr
    }).then(filePathArr => {    
        filePathArr.forEach((item)=>{
            // 再次请求获取md文件内容
            axios.get(item)
                .then(res => {
                    contentArr.push(res.data)
                    // md字符串->html字符串
                    let contentHTML = marked.parse(res.data)
                    // html字符串->DOM对象
                    let parsedHTML = new DOMParser().parseFromString(contentHTML, 'text/html')
                    contentArrH.push(contentHTML, parsedHTML)
                    return parsedHTML
                })
                .then(parsedDOM => {
                    let mostNode = parsedDOM.children[0].children[1].children
                    console.log(mostNode)
                    for(let i=0; i<mostNode.length; i++){
                        // 匹配目录
                        if(mostNode[i].localName === 'h2'){
                            // 修改对应目录名的class,方便后续的跳转
                            mostNode[i].id = 'h_' + i
                            // 添加目录名以及对应的class名
                            catalog.push({
                                node:mostNode[i],
                                text:mostNode[i].innerText,
                                id:'h_'+i
                            })
                        }
                    }
                    console.log(mostNode)
                    console.log(catalog)
                })
                .catch(err=>{
                    console.log('请求文件内容出错: ', err)
                })
        })
    })
    .catch(err=>{
        console.log('请求文件名出错: ', err)
    })
// 将所有的 md文件名、对应目录、对应控制项 封装为一个对象数组

// 根据md文件名

