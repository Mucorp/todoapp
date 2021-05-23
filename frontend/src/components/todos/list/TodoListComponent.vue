<template>
  <div class="container">
    <div class="row justify-content-center mt-2 mb-2">
      <div class="col-8">
        <h4 class="text-left mb-2">All todos</h4>
      </div>
      <div class="col-4">
        <input
          type="text"
          class="form-control"
          placeholder="Search todos..."
          @input="searchtodos"
          v-model="query.search"
        />
      </div>
    </div>
    <div class="">
      <div class="" v-if="!isLoading">
        <div class="row border-bottom border-top p-2 bg-light">
          <div class="col-1">Sl</div>
          <div class="col-3">todo Name</div>
          <div class="col-2">Actions</div>
        </div>

        <div v-for="(item, index) in todosPaginatedData.data" :key="item.id">
          <todo-detail :index="index" :todo="item" />
        </div>
      </div>

      <div v-if="isLoading" class="text-center mt-5 mb-5">
        Loading todos...
        <div class="spinner-grow" role="status">
          <span class="sr-only">Loading...</span>
        </div>
      </div>
    </div>

    <!-- Insert Pagination Part -->
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import todoDetail from "./TodoDetail";
// import VPagination from "vue3-pagination";

export default {
  data() {
    return {
      query: {
        page: 1,
        search: "",
      },
    };
  },
  components: {
    todoDetail,
  },
  computed: { ...mapGetters(["todoList", "todosPaginatedData", "isLoading"]) },

  methods: {
    ...mapActions(["fetchAllTodos"]),

    getResults() {
      this.fetchAllTodos(this.query);
    },
    searchtodos() {
      this.fetchAllTodos(this.query);
    },
  },

  created() {
    this.fetchAllTodos(this.query);
  },
};
</script>
