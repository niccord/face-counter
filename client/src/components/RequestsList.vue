<template>
  <div>
    <h1>Hi {{value}}</h1>
    <div class="container">
      <div class="header">
        <input type="button" value="Logout" id="logout" @click="logout">
      </div>
      <div class="new-request">
        <NewRequest />
      </div>
    </div>
  </div>
</template>

<script>
import NewRequest from './NewRequest.vue';
export default {
  components: {NewRequest},
  props: {
    value: {
      type: String
    }
  },
  methods: {
    logout() {
      delete localStorage.faceCounterUsername;
      this.$emit('input', '');
    }
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
</style>