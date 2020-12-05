import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'lib-flexible/flexible'
import 'normalize.css/normalize.css'
import './assets/global.css'
import Bridge from './plugins/bridge'
// import VConsole from  'vconsole';
// let vConsole = new VConsole();
console.log("start test!");

Vue.config.productionTip = false
Vue.prototype.$bridge = Bridge

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')