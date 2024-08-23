<template>
    <div class="container-fluid mt-5">
      <div class="row">
        <div class="col-md-3" :class="{'mt-3' : index >=4 }"
           v-for="(task,index) in allTasks" :key="task.id">
          <div class="card card-main task-card position-relative">
            <div class="task-content">
              {{ task.title }}
            </div>
            <div class="position-absolute bottom-0 end-0">
              <i class="fa-regular fa-pen-to-square editIcon col-2 me-4" @click="editTask(task)"></i>
              <i class="fa-regular fa-trash-can deleteIcon" @click="handleDelete(task.id)"></i>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { mapActions, mapGetters } from 'vuex';
  
  export default {
    computed: {
      ...mapGetters(['allTasks']),
      tasks() {
        return this.allTasks;
      },
    },
    methods: {
      ...mapActions(['deleteTask']),
      handleDelete(taskIy) {
        this.deleteTask(taskIy);
      },
      editTask(task) {
        this.$emit('edit-task', task);
      },
    },
  };
  </script>
  
  <style scoped>
  /* Add your styles here 
  .row > .col-md-3:nth-child(n + 5) {
  margin-top: 1rem; 
}*/

  </style>
  