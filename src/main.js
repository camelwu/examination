import Vue from 'vue'
import Bridge from './plugins/bridge'
import JsBridge from 'js-native-bridge'
import App from './App.vue'
import router from './router'
import store from './store'
import 'normalize.css/normalize.css'
import './assets/global.css'
import 'lib-flexible/flexible'

Vue.config.productionTip = false
Vue.prototype.$bridge = Bridge
Vue.prototype.$jsbridge = JsBridge

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')