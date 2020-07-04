import Vue from 'vue'
import App from './App.vue'
import VueOnsen from 'vue-onsenui';

// Webpack CSS import
import 'onsenui/css/onsenui.css';
import 'onsenui/css/onsen-css-components.css';

Vue.use(VueOnsen);

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
