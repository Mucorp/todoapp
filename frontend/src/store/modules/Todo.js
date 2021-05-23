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
    let url = `${process.env.VUE_APP_API_URL}todo/show_all`;

    await axios.get(url)
      .then(res => {
        const todos = res.data.data.data;
        console.log(todos);
        commit('setTodos', todos);
        commit('setTodoIsLoading', false);
      }).catch(err => {
        console.log('error', err);
        commit('setTodoIsLoading', false);
      });
  },

  async fetchDetailTodo({ commit }, id) {
    commit('setTodoIsLoading', true);
    await axios.get(`${process.env.VUE_APP_API_URL}todos/${id}`)
      .then(res => {
        commit('setTodoDetail', res.data.data);
        commit('setTodoIsLoading', false);
      }).catch(err => {
        console.log('error', err);
        commit('setTodoIsLoading', false);
      });
  },

  async storeTodo({ commit }, todo) {
    commit('setTodoIsCreating', true);
    await axios.post(`${process.env.VUE_APP_API_URL}todos`, todo)
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
    await axios.post(`${process.env.VUE_APP_API_URL}todos/${todo.id}?_method=PUT`, todo)
      .then(res => {
        commit('saveUpdatedTodo', res.data.data);
        commit('setTodoIsUpdating', false);
      }).catch(err => {
        console.log('error', err);
        commit('setTodoIsUpdating', false);
      });
  },


  async deleteTodo({ commit }, id) {
    commit('setTodoIsDeleting', true);
    await axios.delete(`${process.env.VUE_APP_API_URL}todos/${id}`)
      .then(res => {
        commit('setDeleteTodo', res.data.data.id);
        commit('setTodoIsDeleting', false);
      }).catch(err => {
        console.log('error', err);
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

  setDeleteTodo: (state, id) => {
    state.todosPaginatedData.data.filter(x => x.id !== id);
  },

  setTodoDetailInput: (state, e) => {
    let todo = state.todo;
    todo[e.target.name] = e.target.value;
    state.todo = todo
  },

  saveNewTodos: (state, todo) => {
    state.todos.unshift(todo)
    state.createdData = todo;
  },

  saveUpdatedTodo: (state, todo) => {
    state.todos.unshift(todo)
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