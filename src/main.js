globalThis.__VUE_PROD_HYDRATION_MISMATCH_DETAILS__ = false;

import { createApp } from 'vue';
import { createI18n } from 'vue-i18n';
import App from './App.vue';
import store from './store'; // Use the store you imported
import router from './router';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './assets/style.css';
import EN from './locale/en.json';
import JP from './locale/jp.json';

const i18n = createI18n({
  // You can either get the locale from the store or a cookie
  locale: store.state.locale || 'EN', // Assuming `locale` is stored in Vuex state
  fallbackLocale: 'EN',
  messages: {
    EN: EN,
    JP: JP,
  },
});

// Mount the app with Vuex, Vue Router, and i18n
createApp(App).use(store).use(i18n).use(router).mount('#app');
