import Vue from 'vue'
import VueRouter from 'vue-router'

import Layout from '../views/layout'

Vue.use(VueRouter)

export default new VueRouter({
    routes:[
        {
            path: '/',
            component: Layout,
        },{
            path: '/remember',
            component: Layout,
            children:[
                {
                    path:'index',
                    component: ()=>import('../views/remember/index')
                }
            ]
        },{
            path: '/know',
            component: Layout,
            children:[
                {
                    path: 'front-end',
                    component: ()=>import('../views/knowledge/frontend/index.vue')
                },{
                    path: 'rear-end',
                    component: ()=>import('../views/knowledge/rearend/index.vue')
                },{
                    path: 'deep-learn',
                    component: ()=>import('../views/knowledge/deeplearn/index.vue')
                },
            ]
        },{
            path: '/media',
            component: Layout,
            children:[
                {
                    path: 'video',
                    component: ()=>import('../views/media/videocom')
                },{
                    path: 'audio',
                    component: ()=>import('../views/media/audiocom')
                },{
                    path: 'picture',
                    component: ()=>import('../views/media/picturecom')
                },
            ]
        }
    ]
})