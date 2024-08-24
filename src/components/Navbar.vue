<template>
  <nav class="navbar navbar-expand-lg sticky-top">
    <div class="container">
      <router-link class="navbar-brand text-white" to="/">{{ $t('TASK') }}</router-link>
      <button @click="langswt" class="langbtn ms-auto  d-block d-lg-none text-white">{{ langbtn }}</button>

      <button class="navbar-toggler ms-5" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse justify-content-center" id="navbarNav">
        <ul class="navbar-nav">
          <li class="nav-item">
            <router-link class="nav-link text-white" to="/" @click="closeNavbar">Home</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link text-white" to="/History" @click="closeNavbar">History</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link text-white" to="/sample" @click="closeNavbar">Sample</router-link>
          </li>  
          <li class="nav-item">
            <router-link class="nav-link d-block d-lg-none" to="/"><i class="fa-solid fa-user user-profile"></i></router-link>
          </li>
        </ul>
      </div>
      <button @click="langswt" class="langbtn me-5 d-none d-lg-block text-white">{{ langbtn }}</button>
      <div class="dropdown" :class="{ 'is-active': isDropdownOpen }">
      
      <i class="fa-regular fa-user user-profile"  @click="toggleDropdown"></i>

      <div class="dropdown-menu mt-3" v-if="isDropdownOpen">
        <router-link class="dropdown-item text-white" @click="closeDropdown" to="/">Profile</router-link>
        <router-link class="dropdown-item text-white" @click="closeDropdown" to="/Profile">Login</router-link>
        <router-link class="dropdown-item text-white" @click="closeDropdown" to="/Profile">Logout</router-link>

      </div>
    </div>

      <!-- <div class="dropdowns">
        
      <i class="fa-regular fa-user user-profile" @mouseleave="isOpen=false"></i>
  
        <div class="dropdown-content mt-2"  v-show="isOpen">
            <router-link to="/Profile" @click="selectItem">Profile</router-link>
            <router-link to="/Profile" @click="selectItem">Login</router-link>
            <router-link to="/Profile" @click="selectItem">Logout</router-link>
          </div>
    </div>
    </div> -->
      <!-- <router-link class="nav-link d-none d-lg-block" to="/"><i class="fa-solid fa-user user-profile"></i></router-link> -->
</div>
</nav>
</template>

<script>
import { nextTick } from 'vue';

export default {
  data() {
    return {
      langbtn: '',
      isDropdownOpen: false,

    };
  },
  mounted() {
    // Check local storage for the saved locale and set it
    const savedLocale = localStorage.getItem('locale');
    if (savedLocale) {
      this.$i18n.locale = savedLocale;
    }

    // Update the button label based on the current locale
    this.updateButtonLabel();
  },
  methods: {
    toggleDropdown() {
      this.isDropdownOpen = !this.isDropdownOpen;
    },
    closeDropdown() {
      this.isDropdownOpen = false;
    },
        langswt() {
      // Toggle between English ('EN') and Japanese ('JP')
      this.$i18n.locale = this.$i18n.locale === 'EN' ? 'JP' : 'EN';

      // Save the new locale to local storage
      localStorage.setItem('locale', this.$i18n.locale);

      // Update the button label after toggling the locale
      this.updateButtonLabel();
    },
    updateButtonLabel() {
      // Set the button label based on the current locale
      this.langbtn = this.$i18n.locale === 'EN' ? '日本語' : 'English';
    },
    closeNavbar(){
nextTick(()=>{
const navbarNav = document.getElementById('navbarNav');
if(navbarNav  && navbarNav.classList.contains('show')){
    navbarNav.classList.remove('show');
}
});
    }
  },
};
</script>
