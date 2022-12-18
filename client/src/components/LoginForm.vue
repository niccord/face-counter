<template>
  <div id="login">
    <h2>Login</h2>
    <label for="username">Username</label>
    <input type="text" name="username" id="username" placeholder="Insert username" v-model="username">
    <input type="button" value="Login" @click="login">
    <div v-if="isMissingUsername">
      <p class="error">Please, insert a username</p>
    </div>
    <div v-if="loginError">
      <p class="error">An error happened during login, please try again</p>
    </div>
</div>
</template>

<script>
export default {
  data() {
    return {
      username: '',
      isMissingUsername: false,
      loginError: false,
    }
  },
  methods: {
    async login() {
      this.isMissingUsername = false;
      this.loginError = false;
      if (!this.username) {
        this.isMissingUsername = true;
        return;
      }
      const url = process.env.VUE_APP_BACKEND_ENDPOINT + '/login';
      const post = await fetch(url, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({username: this.username}),
      })
      if (post.status >= 200 && post.status < 400) {
        // save session JWT
        const response = await post.json();
        localStorage.faceCounterUsername = this.username;
        localStorage.faceCounterToken = response.token;
        this.$emit('login');
      } else {
        this.loginError = true;
      }
    }
  },
}
</script>
<style>

</style>