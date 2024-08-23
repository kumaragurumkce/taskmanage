import { createStore } from 'vuex';

const store = createStore({
  state() {
    return {
      
      tasks: JSON.parse(localStorage.getItem('tasks')) || [],
      namestore: JSON.parse(localStorage.getItem('namestore')) || [],
    };
  },
  mutations: {
    // Mutations for managing name tasks
    ADD_NAME(state, name) {
      state.namestore.push(name);
      localStorage.setItem('namestore', JSON.stringify(state.namestore));
    },

    // Mutations for managing general tasks
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
  },
  actions: {
    // Actions for managing name tasks
    addItem({ commit }, name) {
      commit('ADD_NAME', name);
    },

    // Actions for managing general tasks
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
    // Getters for accessing name tasks
    items: state => state.namestore,

    // Getters for accessing general tasks
    allTasks: state => state.tasks,
  },
});

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
