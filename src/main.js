import Vue from 'vue';
import App from './App';
import inject from './utils/inject.js';

Vue.config.productionTip = false;
Vue.use(inject);

App.mpType = 'app';

const app = new Vue({
    ...App
});
app.$mount();
