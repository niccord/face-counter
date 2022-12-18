<template>
  <div>
    <h1>Add image</h1>
    <input type="file" id="file" accept="image/jpeg, image/jpg" @change="previewFile">
    <img id="imgPreview" :src="imgSrc">
    <p class="error" v-if="missingImage">
      Please, insert an image
    </p>
    <input type="text" name="name" id="name" placeholder="insert an identifier" v-model="name">
    <p class="error" v-if="missingName">
      Please, insert an identifier
    </p>
    <input type="button" value="Add image" @click="addImage">
  </div>
</template>

<script>
export default {
  data() {
    return {
      imgSrc: '',
      file: '',
      fileReader: new FileReader(),
      name: '',
      missingName: false,
      missingImage: false,
    }
  },
  methods: {
    previewFile(e) {
      const file = e.target.files[0];

      if (file) {
        this.file = file;
        this.fileReader.readAsDataURL(file);
      }
    },
    async addImage() {
      this.missingName = false;
      this.missingImage = false;
      if (!this.name) {
        this.missingName = true;
      }
      if (!this.imgSrc) {
        this.missingImage = true;
      }
      if (this.missingName || this.missingImage) return;

      const url = process.env.VUE_APP_BACKEND_ENDPOINT + '/newRequest';
      const formData = new FormData();
      formData.append('file', this.file, this.file.name);
      formData.append('name', this.name);
      await fetch(url, {
        method: 'POST',
        headers: {
          Authorization: 'Bearer ' + localStorage.faceCounterToken,
        },
        body: formData,
        redirect: 'follow'
      });
      this.$emit('new-request-added')
      this.reset();
    },
    reset() {
      this.file = '';
      this.name = '';
      this.missingName = false;
      this.missingImage = false;
    }
  },
  created() {
    this.fileReader.addEventListener("load", () => {
      // convert image file to base64 string
      this.imgSrc = this.fileReader.result;
    }, false);
  }
}
</script>

<style>
#imgPreview {
  max-width: 500px;
  max-height: 500px;
}
</style>