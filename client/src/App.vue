<template>
  <div id="app">
    <h1 class="title is-1 has-text-centered">
      Face counter app
    </h1>
    
<section class="hero is-primary">
  <div class="hero-body">
    <AdminRequestsList v-if="userIsAdmin" :username="username" :token="token" @logout="userLoggedOut"></AdminRequestsList>
    <!-- if user is logged in: show request form -->
    <RequestsList v-else-if="userLoggedIn" :username="username" :token="token" @logout="userLoggedOut"></RequestsList>
    <!-- else show login -->
    <LoginForm v-else @login="checkUserLogin" />
  </div>
</section>
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
import AdminRequestsList from './components/AdminRequestsList.vue'
import LoginForm from './components/LoginForm.vue'
import RequestsList from './components/RequestsList.vue'
export default {
  name: 'App',
  data() {
    return {
      userLoggedIn: false,
      token: '',
      username: '',
      userIsAdmin: false,
    }
  },
  components: {
    AdminRequestsList,
    LoginForm,
    RequestsList,
  },
  methods: {
    checkUserLogin(loginData) {
      this.userLoggedIn = !!loginData.token;
      this.token = loginData.token;
      this.username = loginData.username;
      this.userIsAdmin = loginData.isAdmin;
    },
    userLoggedOut() {
      this.userLoggedIn = false;
      this.token = '';
      this.username = '';
      this.userIsAdmin = false;
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
