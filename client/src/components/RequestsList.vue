<template>
  <div>
    <h2>Hi {{username}}</h2>
    <div class="container">
      <div class="header">
        <input type="button" value="Logout" id="logout" @click="logout">
      </div>
      <div class="new-request">
        <NewRequest @new-request-added="loadRequests" />
      </div>
      <div class="requests-list">
        <table>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Status</th>
            <th># Face detected</th>
          </tr>
          <tr v-for="request in requestsList" :key="request.id">
            <td>{{request.id}}</td>
            <td>{{request.name}}</td>
            <td>{{request.status}}</td>
            <td>{{request.faceDetected}}</td>
          </tr>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import NewRequest from './NewRequest.vue';
export default {
  components: {NewRequest},
  data() {
    return {
      requestsList: []
    }
  },
  props: {
    username: {
      type: String
    }
  },
  methods: {
    logout() {
      this.$emit('logout', '');
    },
    async loadRequests() {
      const url = process.env.VUE_APP_BACKEND_ENDPOINT + '/requests';
      const data = await fetch(url, {
        headers: {
          Authorization: 'Bearer ' + localStorage.faceCounterToken
        }
      });
      this.requestsList = await data.json();
      }
  },
  created() {
    this.loadRequests();
    setInterval(this.loadRequests, 5_000)
  }
}
</script>

<style>
.new-request {
  border: 5px solid;
  width: 300px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
}
table {
  text-align: center;
}
</style>