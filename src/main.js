import {createApp} from 'vue'
import App from './App.vue'
import router from './routers'
import EditForm from './components/EditForm.vue'
import './assets/tailwind.css'
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css';

var toolbarOptions = [
    ['bold', 'italic'],
    [{ 'script': 'super' }],
    [{ 'color': ['#FBF8FF', '#ff9800', '#f44336', '#03a9f4', '#4caf50', '#ffeb3b', '#e930e9', '#1d87da', '#ff855f'] }],
    ['clean']
  ];

const globalOptions = {
    debug: 'info',
    modules: {
      toolbar: toolbarOptions
    },
    theme: 'snow'
  }

QuillEditor.props.globalOptions.default = () => globalOptions

createApp(App).use(router).component('QuillEditor', QuillEditor).component('edit-form', EditForm).mount('#app')