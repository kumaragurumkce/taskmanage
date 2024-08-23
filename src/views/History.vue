<template>
    <div id="app">
      <h1>Item List</h1>
      <input v-model="newItem.name" placeholder="Add a new item" />
      <button @click="addNewItem">Add</button>
  
      <ul>
        <li v-for="item in items" :key="item.id">
          {{ item.name }} - {{ item.date }}
        </li>
      </ul>
    </div>
  </template>
  
  <script>
  import { mapGetters, mapActions } from 'vuex';
  
  export default {
    data() {
      return {
        newItem: { id: null, name: '', date: '' } // Include date in newItem
      };
    },
    computed: {
      ...mapGetters(['items'])
    },
    methods: {
      ...mapActions(['addItem']),
  
      addNewItem() {
        if (this.newItem.name.trim()) {
          // Assign a unique ID and set the date
          this.newItem.id = Date.now();
          const now = new Date();
          const date = now.toISOString().split('T')[0];
          this.newItem.date = date;
  
          // Add the item
          this.addItem(this.newItem);
  
          // Reset the input field
          this.newItem = { id: null, name: '', date: '' };
        }
      }
    }
  };
  </script>
  