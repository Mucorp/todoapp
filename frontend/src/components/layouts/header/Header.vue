<template>
  <nav class="navbar navbar-expand navbar-light bg-light">
    <div class="container">
      <router-link to="/" class="navbar-brand">Todolist</router-link>
      <div class="navbar-nav mr-auto">
        <!-- <li class="nav-item" v-if="loggedIn">
          <router-link to="/todos" class="nav-link">
            <i class="fa fa-shopping-cart"></i>
            Todos
          </router-link>
        </li> -->
        <li class="nav-item" v-if="loggedIn">
          <router-link to="/todos/create" class="nav-link">
            <i class="fa fa-plus-circle"></i> Add Todo
          </router-link>
        </li>
        <li class="nav-item" v-if="!loggedIn"> 
          <router-link to="/register" class="nav-link">
          <i class="fa fa-info-circle"></i>
          Register</router-link>
        </li>
        <li class="nav-item" v-if="!loggedIn">
          <router-link to="/login" class="nav-link">
          <i class="fa fa-question-circle"></i>
          Login</router-link>
        </li>
        <li class="nav-item" v-if="loggedIn">
          <a class="nav-link" @click.prevent="logOut">
            <i class="fa fa-sign-out"></i> LogOut
          </a>
        </li>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: "Header",
  computed: {
    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    },
  },
  methods: {
    logOut() {
      this.$store.dispatch('auth/logout');
      this.$router.push('/login');
    }
  }
};

</script>

<style lang="scss" scoped>
nav{
  background: #000;
}
</style>
