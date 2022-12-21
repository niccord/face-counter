<template>
  <div id="login">

    <div class="container">
      <div class="columns is-centered">
        <div class="column is-5-tablet is-4-desktop is-3-widescreen">
          <form action="" class="box">
            <div class="field">
              <label for="" class="label">Username</label>
              <div class="control has-icons-left">
                <input type="text" name="username" id="username" placeholder="Insert username" class="input" v-model="username" required>
                <span class="icon is-small is-left">
                  <i class="fa fa-envelope"></i>
                </span>
              </div>
            </div>
            <div class="field">
              <button class="button is-success" @click.prevent="login">
                Login
              </button>
            </div>
          </form>
          <div v-if="loginError">
            <p class="error">An error happened during login, please try again</p>
          </div>
        </div>
      </div>
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
        this.$emit('login', {
          username: this.username,
          token: response.token,
          isAdmin: response.isAdmin,
        });
      } else {
        this.loginError = true;
      }
    }
  },
}
</script>
<style>

</style>