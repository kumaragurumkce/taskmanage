<template>
    <div class="container-fluid my-5">
      <div class="row">
        <div class="col-md-6 col-sm-6 col-12 col-lg-3" :class="{'mt-lg-3' : index >=4 }"
           v-for="(task,index) in allTasks.slice().reverse()" :key="task.id">
          <div class="card card-main task-card position-relative border-none mt-2" :style="{backgroundColor:task.backgroundColor,color:task.fontColor}">
            <div class="task-content mt-3 mx-2">
              {{ task.title }}
            </div>
            <div class="position-absolute bottom-0 start-0 card-date ms-1">
              {{ task.date }}
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
  