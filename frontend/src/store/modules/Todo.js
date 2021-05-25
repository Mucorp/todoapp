// import { GET_ALL_PRODUCTS } from "./Types";
import axios from 'axios';




// initial state
const state = () => ({
  todos: [],
  todosPaginatedData: null,
  todo: null,
  isLoading: false,
  isCreating: false,
  createdData: null,
  isUpdating: false,
  updatedData: null,
  isDeleting: false,
  deletedData: null
})

// getters
const getters = {
  todoList: state => state.todos,
  todosPaginatedData: state => state.todosPaginatedData,
  todo: state => state.todo,
  isLoading: state => state.isLoading,
  isCreating: state => state.isCreating,
  isUpdating: state => state.isUpdating,
  createdData: state => state.createdData,
  updatedData: state => state.updatedData,

  isDeleting: state => state.isDeleting,
  deletedData: state => state.deletedData
};

// actions
const actions = {
  async fetchAllTodos({ commit }) {
    // let page = '';
    // let search = '';
    // if(query !== null){
    //   page = query.page;
    //   search = query.search;
    // }

    commit('setTodoIsLoading', true);
    let url = `${process.env.VUE_APP_API_URL}todo/show_all/`;

    await axios.get(url)
      .then(res => {
        const todos =  res.data;
        commit('setTodos', todos);
        commit('setTodoIsLoading', false);
      }).catch(err => {
        console.log('error', err);
        commit('setTodoIsLoading', false);
      });
  },

  async fetchDetailTodo({ commit }, id) {
    commit('setTodoIsLoading', true);
    await axios.get(`${process.env.VUE_APP_API_URL}todo/show_todo/${id}`)
      .then(res => {
        commit('setTodoDetail', res.data[0]);
        commit('setTodoIsLoading', false);
      }).catch(err => {
        console.log('error', err);
        commit('setTodoIsLoading', false);
      });
  },

  async storeTodo({ commit }, todo) {
    commit('setTodoIsCreating', true);
    await axios.post(`${process.env.VUE_APP_API_URL}todo/save_todo/`,todo )
      .then(res => {
        commit('saveNewTodos', res.data.data);
        commit('setTodoIsCreating', false);
      }).catch(err => {
        console.log('error', err);
        commit('setTodoIsCreating', false);
      });
  },

  async updateTodo({ commit }, todo) {
    commit('setTodoIsUpdating', true);
    commit('setTodoIsUpdating', true);
    await axios.put(`${process.env.VUE_APP_API_URL}todo/update_todo/${todo.id}/`, todo)
      .then(res => {
        commit('saveUpdatedTodo', res.data);
        commit('setTodoIsUpdating', false);
      }).catch(err => {
        console.log('error', err);
        commit('setTodoIsUpdating', false);
      });
  },


  async deleteTodo({ commit, dispatch }, id) {
    commit('setTodoIsDeleting', true);
    commit('setTodoIsLoading', true);
    await axios.delete(`${process.env.VUE_APP_API_URL}todo/delete_todo/${id}`)
    .then(
        commit('setTodoIsLoading', false),
        commit('setTodoIsDeleting', false),
        dispatch('fetchDetailTodo') 
      ).catch(err => {
        console.log('error', err);
        commit('setTodoIsLoading', false);
        commit('setTodoIsDeleting', false);
      });
  },

  updateTodoInput({ commit }, e) {
    commit('setTodoDetailInput', e);
  }
}

// mutations
const mutations = {
  setTodos: (state, todos) => {
    state.todos = todos
  },

  setTodosPaginated: (state, todosPaginatedData) => {
    state.todosPaginatedData = todosPaginatedData
  },

  setTodoDetail: (state, todo) => {
    state.todo = todo
  },

 

  setTodoDetailInput: (state, e) => {
    let todo = state.todo;
    todo[e.target.name] = e.target.value;
    state.todo = todo
  },

  saveNewTodos: (state, todo) => {
    // state.todos.unshift(todo)
    state.createdData = todo;
  },

  saveUpdatedTodo: (state, todo) => {
    // state.todos.unshift(todo)
    state.updatedData = todo;
  },

  setTodoIsLoading(state, isLoading) {
    state.isLoading = isLoading
  },

  setTodoIsCreating(state, isCreating) {
    state.isCreating = isCreating
  },

  setTodoIsUpdating(state, isUpdating) {
    state.isUpdating = isUpdating
  },

  setTodoIsDeleting(state, isDeleting) {
    state.isDeleting = isDeleting
  },

}

export default {
  // namespaced: true,
  state,
  getters,
  actions,
  mutations
}