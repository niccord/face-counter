<template>
  <div id="app">
    <h1 class="title is-1 has-text-centered">
      Face counter app
    </h1>
    <!-- if user is logged in: show request form -->
    <RequestsList v-if="userLoggedIn" :username="username" @logout="userLoggedOut"></RequestsList>
    <!-- else show login -->
    <LoginForm v-else @login="checkUserLogin" />

    <footer class="footer">
      <div class="content has-text-centered">
        <p>
          <strong>Face Counter</strong> by <a href="https://github.com/niccord">Nicola Cordioli</a>. 
        </p>
      </div>
    </footer>
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
    checkUserLogin() {
      this.userLoggedIn = !!localStorage.faceCounterToken;
      this.username = localStorage.faceCounterUsername || '';
    },
    userLoggedOut() {
      delete localStorage.faceCounterUsername;
      delete localStorage.faceCounterToken;
      this.userLoggedIn = false;
    }
  },
  created() {
    this.checkUserLogin();
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
.error {
  color: red;
}
#app > h1.title {
  padding-top: 30px;
}
</style>
