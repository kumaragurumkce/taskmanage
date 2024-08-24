<template>
    <div class="dropdown" :class="{ 'is-active': isDropdownOpen }">
      <button @click="toggleDropdown" class="dropdown-toggle btn btn-primary">
        Dropdown
      </button>
      <div class="dropdown-menu" v-if="isDropdownOpen">
        <a href="#" class="dropdown-item" @click="closeDropdown">Link 1</a>
        <a href="#" class="dropdown-item" @click="closeDropdown">Link 2</a>
        <a href="#" class="dropdown-item" @click="closeDropdown">Link 3</a>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'Profile',
    data() {
      return {
        isDropdownOpen: false,
      };
    },
    methods: {
      toggleDropdown() {
        this.isDropdownOpen = !this.isDropdownOpen;
      },
      closeDropdown() {
        this.isDropdownOpen = false;
      },
    },
  };
  </script>
  
  
  <style scoped>
  .dropdown {
  position: relative;
}

.dropdown-menu {
  position: absolute;
  top: 100%;
  left: 0;
  z-index: 1000;
  display: block;
  padding: 0.5rem 0;
  margin: 0;
  background-color: #fff;
  border: 1px solid #ccc;
}

.dropdown-item {
  display: block;
  width: 100%;
  padding: 0.5rem 1rem;
  clear: both;
  color: #333;
  text-align: inherit;
  text-decoration: none;
  background-color: transparent;
  border: 0;
  cursor: pointer;
}

.dropdown-item:hover {
  background-color: #f1f1f1;
}

  </style>
  