import Vue from 'vue'
import JsNativeBridge from 'js-native-bridge'
import App from './App.vue'
import router from './router'
import store from './store'
import 'normalize.css/normalize.css'
import './assets/global.css'
import 'lib-flexible/flexible'

Vue.config.productionTip = false
Vue.prototype.$bridge = JsNativeBridge

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')