<template>
  <div class="container">
    <div class="card">
      <div class="card-header">
        <h6>Edit todo</h6>
      </div>
      <div class="card-body">
        <Form @submit="onSubmit" :validation-schema="schema">
          <div v-if="isLoading">
            <div class="text-center">
              <div class="spinner-border text-primary" role="status">
                <span class="sr-only">Loading...</span>
              </div>
              <br />
              Loading todo Details
            </div>
          </div>
          <div v-if="todo !== null && !isLoading">
            <div class="form-group row">
              <div class="col-6">
                <label>todo Name:</label>
                <Field
                  id="title"
                  name="title"
                  type="text"
                  class="form-control"
                  :value="todo.title"
                  @input="updatetodoInputAction"
                />
                <ErrorMessage name="title" class="text-danger" />
              </div>
              <div class="col-6">
                <label>todo Price:</label>
                <Field
                  name="price"
                  type="number"
                  class="form-control"
                  :value="todo.price"
                  @input="updatetodoInputAction"
                />
                <ErrorMessage name="price" class="text-danger" />
              </div>
            </div>
            <div class="form-group row">
              <div class="col-12">
                <label>todo Details:</label>
                <Field
                  name="description"
                  as="textarea"
                  class="form-control"
                  :value="todo.description"
                  @input="updatetodoInputAction"
                />
                <ErrorMessage name="description" class="text-danger" />
              </div>
            </div>
            <div class="form-group">
              <router-link to="/todos" class="btn btn-secondary mr-2"
                >Cancel</router-link
              >
              <input
                type="submit"
                class="btn btn-primary"
                value="Save Update"
                v-if="!isUpdating"
              />
              <button class="btn btn-primary" type="button" disabled v-if="isUpdating">
                <span
                  class="spinner-border spinner-border-sm"
                  role="status"
                  aria-hidden="true"
                ></span>
                Saving...
              </button>
            </div>
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
      id: null,
    };
  },
  components: {
    Field,
    Form,
    ErrorMessage,
  },

  created: function () {
    this.id = this.$route.params.id;
    this.fetchDetailtodo(this.id);
  },

  computed: { ...mapGetters(["isUpdating", "updatedData", "todo", "isLoading"]) },

  methods: {
    ...mapActions(["updatetodo", "updatetodoInput", "fetchDetailtodo"]),
    onSubmit() {
      const { title, price, description } = this.todo;
      // return false;
      this.updatetodo({
        id: this.id,
        title: title,
        price: price,
        image: null,
        description: description,
        user_id: 1,
      });
    },
    updatetodoInputAction(e) {
      this.updatetodoInput(e);
    },
  },

  watch: {
    updatedData: function () {
      if (this.updatedData !== null && !this.isUpdating) {
        this.$swal.fire({
          text: "Success, todo has been updated successfully !",
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
      schema,
    };
  },
};
</script>
