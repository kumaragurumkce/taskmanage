<template>
  <div>
    <Navbar />
    <router-view />
  </div>
</template>

<script>
import { onMounted } from 'vue';
import Navbar from './components/Navbar.vue';

export default {
  name: 'App',
  components: {
    Navbar,
  },
  setup() {
    onMounted(() => {
      document.cookie = 'locale=JP';
    });
  },
};
</script>
