import Vue from 'vue';
import App from './App.vue';
import MuseUI from 'muse-ui';
import 'muse-ui/dist/muse-ui.css'
import 'material-icons/iconfont/material-icons.css';

require('typeface-roboto');

Vue.config.productionTip = false;
Vue.use(MuseUI);

new Vue({
    render: h => h(App)
}).$mount('#app');
