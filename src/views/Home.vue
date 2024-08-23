<template>
  <div class="container-fluid">
    <h1 class="text-center">Task Management</h1>
    <div class="row justify-content-center">
      <div class="col-6">
        <form @submit.prevent="submitForm">
          <div class="d-flex justify-content-between">
            <input class="form-control task-title-input me-2" v-model="task.title" placeholder="Task Title" required />
            <button type="submit" class="Addtask">
              {{ isEditing ? 'Update Task' : 'Add Task' }}
            </button>
          </div>
        </form>
      </div>
    </div>

    <TaskList @edit-task="editTask" />
    <!-- Custom Modal -->
    <div v-if="showModal" class="modal-overlay" @click.self="closeModal">
      <div class="modal-content"  :style="{background: task.backgroundColor}">
        <div class="modal-header">
          <button class="btn-close border-none" @click="closeModal">&times;</button>
        </div>
        <div class="modal-body">
          <textarea
            class="modal-textarea"
            v-model="task.title"
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
      isEditing: false,
      showModal: false, // State to control the modal visibility
    };
  },
  methods: {
    ...mapActions(['addTask', 'updateTask']),
    
    submitForm() {
      if (this.isEditing) {
        this.updateTask(this.task);
      } else {
        this.task.id = Date.now();
        const now = new Date();
        const date = now.toISOString().split('T')[0];
        this.task.date = date;
        this.task.backgroundColor = this.getLightBackgroundColor();
        this.task.fontColor = this.getDarkFontColor();
        console.log(this.task.id);
        this.addTask(this.task);
      }
      this.resetForm();
    },

    resetForm() {
      this.task = { id: null, title: '', date: '', backgroundColor: '', fontColor: '' };
      this.isEditing = false;
    },

    editTask(task) {
      this.task = { ...task };
      this.isEditing = true;
      this.showModal = true;
      this.$nextTick(() => {
        this.adjustTextareaHeight(); // Adjust height when the modal is shown
      });
    },

    updateTask() {
      if (this.isEditing) {
        this.$store.dispatch('updateTask', this.task);
        this.resetForm();
        this.closeModal();
      }
    },

    closeModal() {
      this.showModal = false;
    },

    adjustTextareaHeight() {
      const textarea = this.$refs.textarea;
      textarea.style.height = 'auto'; // Reset height
      textarea.style.height = textarea.scrollHeight + 'px'; // Adjust based on scroll height
    },

    getLightBackgroundColor() {
      // Generate a light background color
          // Generate soft pastel-like colors for a classic light theme
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
};
</script>

<style scoped>
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

.btn-close {
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
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
  border: 1px solid #ddd;
  border-radius: 4px;
  box-sizing: border-box;
  resize: none; /* Disable manual resizing */
  overflow-y: hidden; /* Hide vertical scrollbar */
}
</style>
