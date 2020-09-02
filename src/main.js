import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'
import './assets/css/global.css'
import ElementUI from "element-ui";
import axios from 'axios'
import TreeTable from 'vue-table-with-tree-grid'
//导入富文本编辑器
import VueQuillEditor from 'vue-quill-editor'

//导入富文本样式
import 'quill/dist/quill.core.css' // import styles
import 'quill/dist/quill.snow.css' // for snow theme
import 'quill/dist/quill.bubble.css' // for bubble theme

//使用nprogress  加载进度条样式包
import Nprogress from 'nprogress'
import 'nprogress/nprogress.css'

//配置请求路径
axios.defaults.baseURL = 'http://127.0.0.1:3003/'

//拦截器
axios.interceptors.request.use(config => {
    //显示进度条
    Nprogress.start();
    // config.headers.Authorsization = window.sessionStorage.getItem('token');
    console.log(config)
    return config;
})

axios.interceptors.response.use(config => {
    Nprogress.done();
    return config;
})

Vue.prototype.$http = axios

Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.component('tree-table', TreeTable)
Vue.use(VueQuillEditor)

new Vue({
    router,
    render: h => h(App)
}).$mount('#app')