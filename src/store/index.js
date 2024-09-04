import { createStore } from 'vuex';

const store = createStore({
  state() {
    return {
      
      tasks: JSON.parse(localStorage.getItem('tasks')) || [],
      namestore: JSON.parse(localStorage.getItem('namestore')) || [],
      locale:'EN',
      book:JSON.parse(localStorage.getItem('book')) || [],
      
    };
  },
  mutations: {
    // Mutations for managing name tasks
    ADD_NAME(state, name) {
      state.namestore.push(name);
      localStorage.setItem('namestore', JSON.stringify(state.namestore));
    },
    ADD_BOOK(state, taskId) {
      const task = state.tasks.find(t => t.id === taskId);
      if (task) {
          // Update the bookMarked state of the task
          task.bookMarked = !task.bookMarked;

          // Update the `book` array based on the updated `bookMarked` status
          if (task.bookMarked) {
              if (!state.book.find(b => b.id === taskId)) {
                  state.book.push(task);
              }
          } else {
              state.book = state.book.filter(b => b.id !== taskId);
          }

          // Persist the updated `book` array to local storage
          localStorage.setItem('book', JSON.stringify(state.book));
      }
  },
    ADD_TASK(state, task) {
      state.tasks.push(task);
      localStorage.setItem('tasks', JSON.stringify(state.tasks));
    },
    UPDATE_TASK(state, updatedTask) {
      const index = state.tasks.findIndex(task => task.id === updatedTask.id);
      if (index !== -1) {
        state.tasks[index] = updatedTask;
        localStorage.setItem('tasks', JSON.stringify(state.tasks));
      }
    },
    DELETE_TASK(state, taskId) {
      state.tasks = state.tasks.filter(task => task.id !== taskId);
      localStorage.setItem('tasks', JSON.stringify(state.tasks));
    },
    setTaskReminder(state, { taskId, reminderDateTime }) {
      const task = state.tasks.find(task => task.id === taskId);
      if (task) {
        console.log(`Setting reminder for task ${taskId}: ${reminderDateTime}`);
        task.reminderDateTime = reminderDateTime;
        localStorage.setItem('tasks', JSON.stringify(state.tasks)); // Update local storage
      } else {
        console.log(`Task with id ${taskId} not found.`);
      }
    }
  },
  actions: {
    updateTaskReminder({ commit }, { taskId, reminderDateTime }) {
      console.log('Updating task reminder:', taskId, reminderDateTime);
      commit('setTaskReminder', { taskId, reminderDateTime });
    },
    async triggerNotification({ state }, { id, dateTime }) {
      const task = state.tasks.find(task => task.id === id);
      if (task) {
        const bellSound = new Audio(require('@/assets/bell.wav'));
        bellSound.play();
    
        // Return data needed for the notification
        return { title: task.title, dateTime: new Date(dateTime).toLocaleString() };
      }
      return null;
    },
    addItem({ commit }, name) {
      commit('ADD_NAME', name);
    },
    async toggleBookmark({ commit }, taskId) {
      commit('ADD_BOOK', taskId);
      // Ensure local storage is updated
      const updatedBook = JSON.parse(localStorage.getItem('book')) || [];
      console.log('Updated localStorage book:', updatedBook);
  },
    addTask({ commit }, task) {
      commit('ADD_TASK', task);
    },
    updateTask({ commit }, updatedTask) {
      commit('UPDATE_TASK', updatedTask);
    },
    deleteTask({ commit }, taskId) {
      commit('DELETE_TASK', taskId);
    },
  },
  getters: {
    items: state => state.namestore,
    bookItems: state => state.book,
    allTasks(state) {
      return state.tasks.map(task => {
          const isBookmarked = state.book.find(b => b.id === task.id);
          return {
              ...task,
              bookMarked: !!isBookmarked
          };
      });
  }

  },
  
});
const tasksFromLocalStorage = JSON.parse(localStorage.getItem('tasks')) || [];
const bookFromLocalStorage = JSON.parse(localStorage.getItem('book')) || [];
console.log('Tasks from local storage:', tasksFromLocalStorage);
console.log('Bookmarks from local storage:', bookFromLocalStorage);
export default store;



// import { createStore } from 'vuex';

// export default createStore({
//   state: {
//     items: []
//   },
//   mutations: {
//     ADD_ITEM(state, item) {
//       state.items.push(item);
//     }
//   },
//   actions: {
//     addItem({ commit }, item) {
//       commit('ADD_ITEM', item);
//     }
//   },
//   getters: {
//     items: (state) => state.items
//   }
// });
