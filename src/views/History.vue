<template>
    <div id="app">
      <h1>Item List</h1>
      <input v-model="newItem.name" placeholder="Add a new item" />
      <button @click="addNewItem">Add</button>
      
      <ul>
        <li v-for="item in items" :key="item.id">{{ item.name }}</li>
      </ul>
    </div>
  </template>
  
  <script>
  import { mapGetters, mapActions } from 'vuex';
  
  export default {
    data() {
      return {
        newItem: { id: null, name: '' }
      };
    },
    computed: {
      ...mapGetters(['items'])
    },
    methods: {
      ...mapActions(['addItem']),
      addNewItem() {
        if (this.newItem.name.trim()) {
          this.newItem.id = Date.now(); // Assign a unique ID
          console.log(this.newItem.id);
          (this.newItem.id)
          this.addItem({ ...this.newItem }); // Add the item
          this.newItem.name = ''; // Reset the input field
        }
      }
    }
  };
  </script>
  