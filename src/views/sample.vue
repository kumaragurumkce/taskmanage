<template>
  <div class="dropdown" @click="toggleDropdown">
    <button class="dropdown-button">
      Dropdown button
    </button>
    <ul v-if="isOpen" class="dropdown-menu">
      <li><a href="#" @click="selectItem">Action 1</a></li>
      <li><a href="#" @click="selectItem">Action 2</a></li>
      <li><a href="#" @click="selectItem">Action 3</a></li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isOpen: false,
    };
  },
  methods: {
    toggleDropdown() {
      this.isOpen = !this.isOpen;
    },
    selectItem() {
      this.isOpen = false; // Close dropdown after selection
    },
  },
};
</script>

<style scoped>
/* Dropdown container */
.dropdown {
  position: relative;
  display: inline-block;
}

/* Dropdown button styling */
.dropdown-button {
  background-color: #3498db;
  color: white;
  padding: 10px 15px;
  border: none;
  cursor: pointer;
}

/* Dropdown menu styling */
.dropdown-menu {
  position: absolute;
  top: 100%;
  left: 0;
  background-color: white;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  margin: 0;
  padding: 0;
  list-style: none;
  width: 150px;
}

/* Dropdown items */
.dropdown-menu li {
  margin: 0;
}

.dropdown-menu a {
  display: block;
  padding: 10px;
  color: #333;
  text-decoration: none;
}

/* Hover effect for items */
.dropdown-menu a:hover {
  background-color: #f1f1f1;
}
</style>
