import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import History from '../views/History.vue';
// import Sample from '@/views/sample.vue';

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/History', name: 'History', component: History },
  // { path: '/Sample', name: 'Sample', component: Sample },

];

const router = createRouter({

  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
