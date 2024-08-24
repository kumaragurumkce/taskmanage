import { createApp } from 'vue';
import { createI18n } from 'vue-i18n';
import App from './App.vue';
import store from './store';
import router from './router';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './assets/style.css';
// import { locale } from 'core-js/shim';
import EN from './locale/en.json';
import JP from './locale/jp.json';
import { createStore } from 'vuex';
const store_lg = createStore()
const i18n = createI18n({
// locale: document.cookie.split('=')[0] || 'EN',
locale: store_lg.locale,

messages: {
    EN:EN,
    JP:JP,
}
})
  

createApp(App).use(store).use(i18n).use(router).mount('#app');
