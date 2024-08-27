<template>
  <div class="container-fluid">
    <h1 class="text-center">Task Management</h1>
    <div class="row justify-content-center">
      <div class="col-6 ">
        <form @submit.prevent="submitForm">
          <div class="d-flex justify-content-between align-item-center">
            <textarea class="form-control task-title-input me-2 " id="expandableInput"
            v-model="newTaskTitle" :class="{'border-success-custom': isValid, 'border-danger-custom': titleError}"
             :style="{ height: textareaHeight, overflowY: overflow }"
             @input="handleInput"
              @blur="validateinputAdd"
              ref="textarea"
             placeholder="Task Title" />
            <button type="submit" class="Addtask">
              Add Task
            </button>
          </div>
        </form>
        <div v-show="titleError" class="text-danger error-message blinking-message">
            {{ titleError }}
          </div>
      </div>
    </div>
    <TaskList @edit-task="editTask" />
    <!-- Custom Modal -->
    <div v-if="showModal" class="modal-overlay" @click.self="closeModal">
      <div class="modal-content"  :style="{background: task.backgroundColor}">
        <div class="modal-header">
          <button class="model-close border-none" @click="closeModal">&times;</button>
        </div>
        <div class="modal-body">
          <textarea
          class="modal-textarea" :style="{background: task.backgroundColor}"
            v-model="updateTitle"
            @input="adjustTextareaHeight"
            @blur="updateTask"
            ref="textarea"
            autofocus
            placeholder="Edit Task Title"
          ></textarea>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapActions } from 'vuex';
import TaskList from '../views/tasklist.vue';

export default {
  components: {
    TaskList,
  },
  data() {
  return {
    task: { id: null, title: '', date: '', backgroundColor: '', fontColor: '' },
    newTaskTitle: '', // Initialize as an empty string
    modalTitle: '', // Initialize as an empty string
    showModal: false,
    titleError: '',
    isValid: false,
    textareaHeight: '50px',
    maxHeight: '200px',
    overflow: 'hidden',
  };
},

  methods: {
    ...mapActions(['addTask', 'updateTask']),
    handleInput() {
      this.titleError = '';
      this.isValid = false;
      this.adjustTextareaHeight(); // Adjust the textarea height as needed
    },
    validateInputAdd() {
  if (!this.newTaskTitle || this.newTaskTitle.trim() === '') { // Safely check if newTaskTitle is not undefined or empty
    this.titleError = 'Task cannot be empty. Please enter a task before adding it.';
    this.isValid = false;
  } else {
    this.titleError = '';
    this.isValid = true;
  }
},

    adjustTextareaHeight() {
      this.$nextTick(() => {
        const textarea = this.$refs.textarea;
        textarea.style.height = '50px';
        const scrollHeight = textarea.scrollHeight;

        if (scrollHeight > parseInt(this.maxHeight)) {
          textarea.style.height = this.maxHeight;
          textarea.style.overflowY = 'auto';
        } else {
          textarea.style.height = `${scrollHeight}px`;
          textarea.style.overflowY = 'hidden';
        }
      });
    },
    submitForm() {
      this.validateInputAdd();
      if (this.isValid) {
        if (this.showModal) {
        this.task.title= this.updateTitle;

          this.updateTask(this.task);
          this.closeModal();
        } else {
          this.task.id = Date.now();
          const now = new Date();
          const date = now.toISOString().split('T')[0];
          this.task.title=this.newTaskTitle
          this.task.date = date;
          this.task.backgroundColor = this.getLightBackgroundColor();
          this.task.fontColor = this.getDarkFontColor();
          this.addTask(this.task);
        }
        this.resetForm();
      }
    },
    resetForm() {
      this.task = { id: null, title: '', date: '', backgroundColor: '', fontColor: '' };
      this.newTaskTitle = ''; // Reset add task input
      this.modalTitle = ''; // Reset modal title
      this.titleError = '';
      this.isValid = false;
      this.textareaHeight = '50px';
      this.overflow = 'hidden';
      this.adjustTextareaHeight(); // Adjust height on form reset
    },
    editTask(task) {
      this.task = { ...task };
      this.updateTitle=task.title;
      console.log(this.updateTitle,'............');
    
      
      this.showModal = true;
      this.$nextTick(() => {
        this.adjustTextareaHeight(); // Adjust height when the modal is shown
      });
    },
    updateTask() {
      this.task.title=this.updateTitle;
      this.$store.dispatch('updateTask', this.task);
      this.resetForm();
      this.closeModal();
    },
    closeModal() {
      this.showModal = false;
    },
    getLightBackgroundColor() {
      const hue = Math.floor(Math.random() * 360); // Random hue
      const saturation = 60 + Math.random() * 20; // Saturation between 60% and 80%
      const lightness = 80 + Math.random() * 10; // Lightness between 80% and 90%
      return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
    },
    getDarkFontColor() {
      const hue = Math.floor(Math.random() * 360); // Random hue
      const saturation = 40 + Math.random() * 20; // Saturation between 40% and 60%
      const lightness = 20 + Math.random() * 10; // Lightness between 20% and 30%
      return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
    },
  },
  mounted() {
    this.adjustTextareaHeight();
  },
};
</script>

<style scoped>
.task-title-input{
}
textarea {
    max-height: 200px;
  resize: none;
  box-sizing: border-box;
  padding: 10px;
  font-size: 16px;
  height: 50px;
}
.Addtask{
  height: 40px; /* Fixed button height */
  padding: 0 15px;
  font-size: 16px;
  white-space: nowrap;
}
.task-title-input {
  flex: 1; /* Allow the textarea to take up remaining space */
}

/* Modal Styles */
.modal-overlay {
  /* visibility: visible; */
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}
.modal-content {
  /* background: rgb(226, 12, 12); */
  border-radius: 8px;
  padding: 10px;
  max-width: 700px;
  width: 100%;
  position: relative;
  max-height: 80vh; /* Set a max-height to limit the modal size */
  overflow-y: auto; /* Enable scrolling if content exceeds the max-height */
  transition: height 0.3s ease; /* Smooth transition for height changes */
}
.modal-header {
  display: flex;
  justify-content: end;
}

.model-close {
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
}
.model-close:active{
  border: none;
  outline: none;
}
.modal-body {
  margin-top: 10px;
  max-height: calc(80vh - 60px); /* Adjust this based on modal header/footer */
  overflow-y: auto; /* Make the modal body scrollable if needed */
}
.modal-textarea {
  width: 100%;
  min-height: 100px;
  padding: 10px;
  font-size: 16px;
  border: 0px solid #ddd;
   border-radius: 4px; 
  border: none;
  box-sizing: border-box;
  resize: none; /* Disable manual resizing */
  overflow-y: hidden; /* Hide vertical scrollbar */
}
.modal-textarea:focus{
  outline: black;
  border:1px solid rgba(0, 0, 0, 0.5) 
}
::-webkit-scrollbar {
  width: 10px;
}
/* Track */
::-webkit-scrollbar-track {
  background: #f1f1f1; 
}
 
/* Handle */
::-webkit-scrollbar-thumb {
  background: #888; 
}
</style>