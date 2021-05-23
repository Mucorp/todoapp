<template>
  <div class="row border-1 p-2">
    <div class="col-1 text-left">{{ index + 1 }}</div>
    <div class="col-3">{{ todo.title }}</div>
    <div class="col-2">
      <strong class="text-danger">{{ todo.price }} $</strong>
    </div>
    <div class="col-3">
      <span class="badge badge-info">{{ todo.user.name }}</span>
    </div>
    <div class="col-2">
      <router-link
        :to="{ name: 'todoEdit', params: { id: todo.id } }"
        class="btn btn-primary"
        title="Edit todo"
        >
        <i class="fa fa-pencil"></i></router-link
      >
      <button class="btn btn-danger ml-2" @click="deletetodoModal(todo.id)" title="Delete todo">
         <i class="fa fa-trash"></i>
      </button>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "todoDetail",
  props: {
    todo: {
      type: Object,
    },
    index: {
      type: Number,
    },
  },

  computed: { ...mapGetters(["isDeleting", "deletedData"]) },

  methods: {
    ...mapActions(["deletetodo", "fetchAllTodos"]),
    deletetodoModal(id) {
      this.$swal
        .fire({
          text: "Are you sure to delete the todo ?",
          icon: "error",
          cancelButtonText: "Cancel",
          confirmButtonText: "Yes, Confirm Delete",
          showCancelButton: true,
        })
        .then((result) => {
          if (result["isConfirmed"]) {
            // Put delete logic
            this.deletetodo(id);
            this.fetchAllTodos({
              page: 1,
              search: ''
            });
            this.$swal.fire({
              text: "Success, todo has been deleted.",
              icon: "success",
              position: 'top-end',
              timer: 1000,
            });
          }
        });
    },
  },
};
</script>
