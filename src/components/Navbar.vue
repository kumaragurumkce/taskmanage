<template>
  <nav>
    <div class="navbar-1">
      <div class="logo text-white">{{ $t('TASK') }}</div>
      <ul class="links">
        <li>
          <router-link class="navList" to="/" @click="closeNavbar">{{ $t('Home') }}</router-link>
        </li>
        <li>
          <router-link class="navList" to="/History" @click="closeNavbar">
            {{ $t('History') }}
          </router-link>
        </li>
        <li>
          <router-link class="navList" to="/sample" @click="closeNavbar">
            {{ $t('Sample') }}
          </router-link>
        </li>
      </ul>
      <div class="d-flex ms-lg-0 ms-auto">
        <button @click="langswt" class="langbtn me-4 text-white">{{ langbtn }}</button>
        <div class="dropdown" :class="{ 'is-active': isDropdownOpen }">
        <i class="fa-regular fa-user user-profile mt-2 d-none d-lg-block"  @click="toggleDropdown"></i>
      <div class="dropdown-menu mt-3" v-if="isDropdownOpen">
        <router-link class="dropdown-item text-white" @click="closeDropdown" to="/">{{ $t('Profile') }}</router-link>
        <router-link class="dropdown-item text-white" @click="closeDropdown" to="/Profile">{{ $t('Login') }}</router-link>
        <router-link class="dropdown-item text-white" @click="closeDropdown" to="/Profile">{{ $t('Logout') }}</router-link>
   </div>
   </div>
      </div>
      <div class="toggle-nav" @click="toggleMenu">
        <i :class="toggleIcon"></i>
      </div>
    </div>
    <div class="dropdown-menu-1" :class="{ open: isOpen }">
      <ul>
        <li>
          <router-link class="nav-drop" to="/" @click="closeNavbar">{{ $t('Home') }}</router-link>
        </li>
        <li>
          <router-link class="nav-drop" to="/History" @click="closeNavbar">
            {{ $t('History') }}
          </router-link>
        </li>
        <li>
          <router-link class="nav-drop" to="/sample" @click="closeNavbar">
            {{ $t('Sample') }}
          </router-link>
        </li>
        <li>
           <router-link class="nav-drop" @click="closeDropdown" to="/">{{ $t('Profile') }}</router-link>
        </li>

        <li>
           <router-link class="nav-drop" @click="closeDropdown" to="/Profile">
            {{ $t('Login') }}
          </router-link>
        </li>
        <li>
            <router-link class="nav-drop" @click="closeDropdown" to="/Profile">
              {{ $t('Logout') }}
            </router-link>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
export default {
  data() {
    return {
      isOpen: false,
      langbtn: '',
      isDropdownOpen: false,
    };
  }, mounted() {
    // Check local storage for the saved locale and set it
    const savedLocale = localStorage.getItem('locale');
    if (savedLocale) {
      this.$i18n.locale = savedLocale;
    }

    // Update the button label based on the current locale
    this.updateButtonLabel();
  },
  computed: {
    toggleIcon() {
      return this.isOpen ? 'fas fa-xmark' : 'fas fa-bars';
    }
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
      toggleMenu() {
      this.isOpen = !this.isOpen;
    },
    closeNavbar() {
      this.isOpen = false;
    }

  }
};
</script>

<style scoped>
/* Include your custom styles or import an external stylesheet here */
@import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.6.0/css/all.min.css');

ul li{
    list-style: none;
}
body{
    background: #645d5d;
}

nav{
    position: relative;
    padding: 0 2rem;
}
.navbar-1{
width: 100%;
height: 60px;
max-width: 1200px;
margin: 0 auto;
display: flex;
align-items: center;
justify-content: space-between;
}

.links{
    display: flex;
    gap: 2rem;
    margin-top: 10px;
}
.toggle-nav {
    color: rgba(105,120,218,1);
    font-size: 1.5rem;
    cursor: pointer;
    display: none;
}

.dropdown-menu-1{
    display: none;
    background-color: rgba(255, 255, 255, 0.1);
    width:100%;
    backdrop-filter: blur(15px);
    border-radius: 5px;
    transition: opacity 0.3s ease, visibility 0.3s ease;
    
}

.dropdown-menu-1.open {
    display: block;
}

.dropdown-menu-1 ul {
    padding: 0;
    margin: 0;
    list-style: none;
}

.dropdown-menu-1 li {
    padding: 0.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
  }
    
/* .router-link-active {
    color: orange; 
    font-weight: bold; 
    border-bottom: 2px solid orange; 
} */

.router-link-exact-active {

} 
.navList{
  position: relative;
  display: block;
  padding: 10px 0;
  text-decoration: none;
  color: #ffffff;
  font-size: 16px;
  font-weight: 600;
}

.navList::after{
  content: '';
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 2px;
  background-color: #ffffff;
  transform: scaleX(0);
  transform-origin: bottom center;
  transition: transform 0.3s ease-out;
}
.navList:hover::after{
  transform: scaleX(1);
  transform-origin: bottom center;
}
.nav-drop{
  color: #ffffff;
  text-decoration: none;
  font-size: 15px;
  font-weight: 600;
}
.logo{
font-weight: 700;
font-size: 20px;
}
/* Responsive */
@media (max-width: 992px) {
    .navbar-1 .links {
        display: none;
    }
    .navbar-1 .toggle-nav {
        display: block;
    }
}

@media (max-width: 576px) {
    .dropdown-menu-1{
        width:unset;
    left: 2rem;
    }
}

</style>
