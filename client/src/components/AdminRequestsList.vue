<template>
    <div>
      <div class="container">
        <section class="section">
          <div class="container">
            <h1 class="title has-text-centered">
              Hi admin {{username}}
            </h1>
            <p class="has-text-centered subtitle">
              Review all the requests
            </p>
          </div>
        </section>
        <div class="columns">
          <div class="column">
            <table class="table is-fullwidth">
              <thead>
                <tr>
                  <th>Username</th>
                  <th># of requests</th>
                  <th>Total # of Face detected</th>
                  <th>
                    <button class="button" @click="loadRequests">Refresh</button>
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="request in requestListPerUser" :key="request.id">
                  <td>{{request.username}}</td>
                  <td>{{request.requestNumber}}</td>
                  <td>{{request.faceDetected}}</td>
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
export default {
  data() {
    return {
      requestListPerUser: []
    }
  },
  props: {
    username: {
      type: String,
      required: true,
    },
    token: {
      type: String,
      required: true,
    },
  },
  methods: {
    async loadRequests() {
      const url = process.env.VUE_APP_BACKEND_ENDPOINT + '/admin-request-list';
      try {
        const data = await fetch(url, {
          headers: {
            Authorization: 'Bearer ' + this.token
          }
        })
        if (data.status === 401) {
          this.logout();
          return;
        }
        if (data.status === 200) {
          this.requestListPerUser = await data.json();
        }
      } 
      catch (ex){
        this.logout();
      }
    },
    logout() {
      this.$emit('logout', '');
    }
  },
  created() {
    this.loadRequests();
  }
}
</script>

<style>

</style>