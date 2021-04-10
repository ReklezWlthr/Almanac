import {createRouter, createWebHistory} from 'vue-router'
import SongList from '../views/SongList.vue'
import Upload from '../views/Upload.vue'
import Show from '../views/DisplaySong.vue'

Show.watch = {$route(to, from) { if(to !== from){ location.reload(); } } }

const routes = [
    {
        path: '/',
        name: 'SongList',
        component: SongList
    },
    {
        path: '/upload',
        name: 'Upload',
        component: Upload
    },
    {
        path: '/show/:id',
        name: 'Show',
        component: Show
    }
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router