// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

Vue.config.productionTip = false




import ElementUi from 'element-ui';
Vue.use(ElementUi);

// 单独引入样式
import 'element-ui/lib/theme-chalk/index.css';

import axios from 'axios';
Vue.prototype.$axios = axios;


import { Loading } from 'element-ui';


let loadinginstace;

// // 请求拦截
// axios.interceptors.request.use(config=>{
//     if(config.method === 'post'){
//         // get请求为简单请求，默认设置content-type不会生效
//         // 所以做个条件判断
//         // config.data = true
//         config.headers['Content-Type'] = 'application/x/www-form-urlencoded';
//     }
    
//     // element ui Loading方法
//     loadinginstace = Loading.service({fullscreen:true});
//     return config;

// });

// // 响应拦截：关闭loading
// axios.interceptors.response.use(data=>{//响应成功关闭loading
//     loadinginstace.close();

//     // 对数据进行处理
//     // 处理后必须返回数据，才能在then中接收
//     return data;

// });


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})


