<template>
  <div class="todo-list">
    <todoListComponent />
  </div>
</template>

<script>
import todoListComponent from './../../components/todos/list/TodoListComponent';
export default {
  components: {
    todoListComponent
  }
}
</script>
