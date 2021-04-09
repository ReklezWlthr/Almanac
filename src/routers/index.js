import {createRouter, createWebHistory} from 'vue-router'
import SongList from '../views/SongList.vue'
import Upload from '../views/Upload.vue'

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
    }
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router