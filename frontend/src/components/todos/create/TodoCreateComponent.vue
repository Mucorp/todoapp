<template>
  <div class="container">
    <div class="card">
      <div class="card-header">
        <h6>Add todo</h6>
      </div>
      <div class="card-body">
        <!-- <form v-on:submit.prevent="onSavetodo" :validation-schema="schema"> -->
        <Form @submit="onSubmit" :validation-schema="schema">
          <!-- <Form @submit="onSavetodo" :validation-schema="schema"> -->
          <div class="form-group row">
            <div class="col-6">
              <label>todo Name:</label>
              <Field
                id="title"
                name="title"
                type="text"
                class="form-control"
                v-model="todo.title"
              />
              <ErrorMessage name="title" class="text-danger" />
            </div>
          </div>
          <div class="form-group row">
            <div class="col-12">
              <label>todo Details:</label>
              <Field
                name="description"
                as="textarea"
                class="form-control"
                v-model="todo.description"
               />
              <ErrorMessage name="description" class="text-danger" />
            </div>
          </div>
          <div class="form-group mt-3">
            <router-link to="/" class="btn btn-secondary mr-2"
              >Cancel</router-link
            >
            <input
              type="submit"
              class="btn btn-primary"
              value="Add todo"
              v-if="!isCreating"
            />
            <button class="btn btn-primary" type="button" disabled v-if="isCreating">
              <span
                class="spinner-border spinner-border-sm"
                role="status"
                aria-hidden="true"
              ></span>
              Saving...
            </button>
          </div>
        </Form>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { Field, Form, ErrorMessage } from "vee-validate";
import * as yup from "yup";

export default {
  data() {
    return {
      todo: {}
    };
  },

  components: {
    Field,
    Form,
    ErrorMessage,
  },

  computed: { ...mapGetters(["isCreating", "createdData"]) },

  methods: {
    ...mapActions(["storeTodo"]),
    onSubmit() {
      const { title, price, description } = this.todo;
      this.storeTodo({
        title: title,
        price: price,
        image: null,
        description: description,
        user_id: 1,
      });
    }
  },

  watch: {
    createdData: function () {
      if (this.createdData !== null && !this.isCreating) {
        this.$swal.fire({
          text: "Success, todo has been added.",
          icon: "success",
          position: "top-end",
          timer: 1000,
        });

        this.$router.push({ name: "todos" });
      }
    },
  },

  setup() {
    // Define a validation schema
    const schema = yup.object({
      title: yup.string().required().min(5),
      price: yup.string().required(),
      description: yup.string().required().min(5),
    });

    return {
      schema
    };
  },
};
</script>
