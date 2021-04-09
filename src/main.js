import { createApp } from 'vue'
import App from './App.vue'
import router from './routers'
import InputBox from './components/InputBox.vue'
import './assets/tailwind.css'

createApp(App).use(router).component('input-box', InputBox).mount('#app')
