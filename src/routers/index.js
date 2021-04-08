import {createRouter, createWebHistory} from 'vue-router'
import SongList from '../views/SongList.vue'

const routes = [
    {
        path: '/',
        name: 'SongList',
        component: SongList
    }
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router