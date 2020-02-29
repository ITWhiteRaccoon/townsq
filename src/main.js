import Vue from 'vue';
import Vuesax from 'vuesax';
import 'vuesax/dist/vuesax.css';
import 'material-icons/iconfont/material-icons.css';
import App from './App.vue';

Vue.config.productionTip = false;
Vue.use(Vuesax, {
    rtl: false,
    theme: {
        colors: {
            primary: '#8ccc0b',
            success: '#17c964',
            danger: '#f2135d',
            warning: '#ff8200',
            dark: '#242145'
        }
    }
});

new Vue({
    render: h => h(App)
}).$mount('#app');
