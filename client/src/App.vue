<template>
  <div id="app">
    <!-- if user is logged in: show request form -->
    <RequestsList v-if="userLoggedIn" v-model="username"></RequestsList>
    <!-- else show login -->
    <LoginForm v-else v-model="username" />
  </div>
</template>

<script>
import LoginForm from './components/LoginForm.vue'
import RequestsList from './components/RequestsList.vue'
export default {
  name: 'App',
  data() {
    return {
      userLoggedIn: false,
      username: ''
    }
  },
  components: {
    LoginForm,
    RequestsList
  },
  methods: {
  },
  watch: {
    username(oldval, newval) {
      this.userLoggedIn = !newval;
    }
  },
  created() {
    // read cookies
    this.userLoggedIn = !!localStorage.faceCounterUsername;
    this.username = localStorage.faceCounterUsername || '';
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
