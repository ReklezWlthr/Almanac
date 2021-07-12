import {createApp} from 'vue'
import App from './App.vue'
import router from './routers'
import EditForm from './components/EditForm.vue'
import './assets/tailwind.css'
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css';
import '@vueup/vue-quill/dist/vue-quill.bubble.css';

var toolbarOptions = [
    [{ 'script': 'super' }],
    [{ 'color': ['#ff9800', '#ffbd00', '#f44336', '#03a9f4', '#4caf50', '#ffeb3b', '#e930e9', '#1d87da', '#ff855f', '#687fff', '#e5662b', '#ff5119', '#F3E5AB', '#BE98D4', '#7fd3f8', '#A19BDA', '#72a483'] }],
    ['clean']
  ];

const globalOptions = {
    debug: 'info',
    modules: {
      toolbar: toolbarOptions
    },
    theme: 'bubble',
    clipboard: {
        matchVisual: false
    }
  }

QuillEditor.props.globalOptions.default = () => globalOptions

createApp(App).use(router).component('QuillEditor', QuillEditor).component('edit-form', EditForm).mount('#app')