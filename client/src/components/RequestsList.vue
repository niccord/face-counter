<template>
  <div>
    <div class="container">
      <section class="section">
        <div class="container">
          <h1 class="title has-text-centered">
            Hi {{username}}
          </h1>
          <p class="has-text-centered subtitle">
            Add a new image to process and review your list
          </p>
        </div>
      </section>
      <div class="columns">
        <div class="column">
          <NewRequest @new-request-added="loadRequests" />
        </div>
        <div class="column">
          <table class="table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Status</th>
                <th># Face detected</th>
                <th>Detection result</th>
                <th>
                  <button class="button" @click="loadRequests">Refresh</button>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="request in requestsList" :key="request.id">
                <td>{{request.id}}</td>
                <td>{{request.name}}</td>
                <td>{{request.status}}</td>
                <td>{{request.faceDetected}}</td>
                <td>
                  <a :href="request.thumbnail" target="_blank" rel="noopener noreferrer">
                    <img :src="request.thumbnail">
                  </a>
                </td>
                <td></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <section class="section">
        <div class="container">
          <p class="has-text-centered subtitle">
            <button class="button" @click="logout">Logout</button>
          </p>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import NewRequest from './NewRequest.vue';
export default {
  components: {NewRequest},
  data() {
    return {
      requestsList: [],
      refreshInterval: null
    }
  },
  props: {
    username: {
      type: String
    }
  },
  methods: {
    logout() {
      if (this.refreshInterval) {
        clearInterval(this.refreshInterval);
      }
      this.$emit('logout', '');
    },
    async loadRequests() {
      const url = process.env.VUE_APP_BACKEND_ENDPOINT + '/requests';
      try {
        const data = await fetch(url, {
          headers: {
            Authorization: 'Bearer ' + localStorage.faceCounterToken
          }
        })
        if (data.status === 401) {
          this.logout();
          return;
        }
        if (data.status === 200) {
          this.requestsList = await data.json();
        }
      } 
      catch (ex){
        this.logout();
      }
    }
  },
  created() {
    this.loadRequests();
    const interval = parseInt(process.env.VUE_APP_REFRESH_INTERVAL);
    this.refreshInterval = setInterval(this.loadRequests, interval)
  }
}
</script>

<style>

</style>