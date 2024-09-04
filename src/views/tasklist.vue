<template>
    <div class="container-fluid my-5 tasklist-position" >
      <div class="row">
        <div class="col-md-6 col-sm-6 col-12 col-lg-3" :class="{'mt-lg-3' : index >=4 }"
           v-for="(task,index) in allTasks.slice().reverse()" :key="task.id">
          <div class="card card-main task-card position-relative border-none mt-2" :style="{backgroundColor:task.backgroundColor,color:task.fontColor}">
            <div class="task-content mt-3 mx-2">
              {{ task.title }}
            </div>
            <div class="position-absolute bottom-0 start-0 card-date ms-1 ">
              {{ task.date }}
              </div>
            <div class="position-absolute top-0 end-0 opacity-1">
              <i class="fa-regular fa-bell taskreminder me-3" @click="showReminderForm(task.id)"></i>
           
              <!-- <i class="fa-regular fa-bookmark me-1 bookMark" @click="bookTask(task)" :class="{open: bookShow}"></i> -->
              <!-- <i class="fa-solid fa-bookmark"></i> -->
              <i :class="['fa-bookmark', task.bookMarked ? 'fa-solid' : 'fa-regular', 'me-1', 'bookMark']"
                 @click="toggleBookTask(task.id)">
              </i>
            </div>
            <div class="position-absolute bottom-0 end-0 me-1 opacity-1">
              <i class="fa-regular fa-copy me-4 copyIcon col-2" @click="copyTask(task)"></i>
              <i class="fa-regular fa-pen-to-square editIcon col-2 me-4" @click="editTask(task)"></i>
              <i class="fa-regular fa-trash-can deleteIcon" @click="handleDelete(task.id)"></i>
            </div>
          </div>
        </div>
      </div>
      <div v-if="selectedTaskId" class="reminder-form">
      <input v-model="reminderDateTime" class="datepicker" type="datetime-local" step="1" />
      <button class="setReminder" @click="setReminder">Set</button>
    </div>
    <div class="container-fluid my-5 tasklist-position">
    <!-- Your task list goes here -->
    
    <!-- Notification -->
    <div v-if="notification.visible" class="custom-notification">
      <p>Reminder: {{ notification.title }} is due now!</p>
      <span>{{ notification.dateTime }}</span>
    </div>
  </div>
    </div>
  </template>
  
  <script>
  import { mapActions, mapGetters } from 'vuex';
  
  export default {
    data() {
    return {
      selectedTaskId: null,
      reminderDateTime: '',
      notification: {
      visible: false,
      title: '',
      dateTime: '',
    }

    };
  },
    computed: {
      ...mapGetters(['allTasks']),
      tasks() {
        return this.allTasks;
      },
    },
    methods: {
      ...mapActions(['deleteTask','addTask','toggleBookmark','updateTaskReminder']),
      handleDelete(taskIy) {
        this.deleteTask(taskIy);
      },
      editTask(task) {
        this.$emit('edit-task', task);
      },
      copyTask(task){
        const copytask={...task,id:Date.now()}
        this.addTask(copytask)
      },
      async setReminder() {
      if (this.selectedTaskId && this.reminderDateTime) {
        await this.$store.dispatch('updateTaskReminder', {
          taskId: this.selectedTaskId,
          reminderDateTime: this.reminderDateTime
        });

        // Optionally handle the notification
        // Notification is now handled within Vuex
        this.selectedTaskId = null; // Hide form after setting reminder
      }
    },
    async handleReminderNotification(taskId, dateTime) {
      const notificationData = await this.$store.dispatch('triggerNotification', { id: taskId, dateTime });
      
      if (notificationData) {
        this.notification.visible = true;
        this.notification.title = notificationData.title;
        this.notification.dateTime = notificationData.dateTime;
  
        setTimeout(() => {
          this.notification.visible = false;
        }, 5000);
      } else {
        console.error('Notification data not received.');
      }
    },
    showReminderForm(taskId) {
      this.selectedTaskId = taskId;
    },
      async toggleBookTask(taskId) {
        console.log('Before toggle - Task ID:', taskId);
        const task = this.allTasks.find(t => t.id === taskId);
        console.log('Current task state:', task);
        await this.toggleBookmark(taskId);
        this.$nextTick(() => {
            const updatedTask = this.allTasks.find(t => t.id === taskId);
            console.log('After toggle - Task ID:', taskId);
            console.log('Updated task state:', updatedTask);
        });
    }
    },
    mounted() {
        const tasksFromLocalStorage = JSON.parse(localStorage.getItem('tasks')) || [];
        const bookFromLocalStorage = JSON.parse(localStorage.getItem('book')) || [];
        console.log('Tasks from local storage:', tasksFromLocalStorage);
        console.log('Bookmarks from local storage:', bookFromLocalStorage);
    },
    watch: {
    // Watch for changes in tasks and set up reminders
    async allTasks(tasks) {
      for (const task of tasks) {
        if (task.reminderDateTime) {
          const reminderDate = new Date(task.reminderDateTime);
          const now = new Date();
          const delay = reminderDate - now;

          if (delay > 0) {
            setTimeout(() => {
              this.handleReminderNotification(task.id, task.reminderDateTime);
            }, delay);
          }
        }
      }
    }
  }

  };
  </script>
  
  <style scoped>
@import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.6.0/css/all.min.css');

.tasklist-position{
  position:relative;
}
.reminder-form {
  position: fixed;
  bottom: 20px;
  right: 20px;
  background-color: #8cc1f5;
  padding: 10px;
  border: 1px solid #ced4da;
  border-radius: 5px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

  </style>
  