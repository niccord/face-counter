<template>
  <div id="app">
    <button @click="callBE">Hello</button>
  </div>
</template>

<script>

export default {
  name: 'App',
  components: {
  },
  methods: {
    async callBE() {
      let response = await fetch('http://localhost:3000/');
      response = await response.text();
      console.log('from server: ' + response)
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
