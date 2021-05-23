<template>
  <div class="home" >
    <div class="todos" v-if="loggedIn">
      <div class="p-4">
      </div>
    <div>
      <todo-list-component></todo-list-component>
    </div>
    </div>
    <div class="guest-screen" v-if="!loggedIn">
      <div class="container">
        <div class="row">
          <div class="col-12">
            <h1>Welcome Please login or register</h1>

          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import todoListComponent from '@/components/todos/list/TodoListComponent.vue';
export default {
  components: { todoListComponent },
  name: "Home",

  computed: { 
    ...mapGetters(["todosPaginatedData"]),
    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    },
  },

  methods: {
    ...mapActions(["fetchAllTodos"]),
  },

  created() {
    this.fetchAllTodos(1);
  },
};
</script>
