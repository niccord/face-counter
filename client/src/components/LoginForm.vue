<template>
  <div>
    <label for="username">Username</label>
    <input  type="text" name="username" id="username" placeholder="Insert username" v-model="username">
    <input type="button" value="Login" @click="login()">
</div>
</template>

<script>
export default {
  data() {
    return {
      username: '',
    }
  },
  methods: {
    async login() {
      const url = process.env.VUE_APP_BACKEND_ENDPOINT + '/login';
      const post = await fetch(url, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({username: this.username}),
      })

      const response = await post.json();
      console.log('from server: ' + JSON.stringify(response))
    }
  },
}
</script>

<style>

</style>