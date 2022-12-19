<template>
  <div>
    <h3 class="has-text-centered subtitle">Add image</h3>
    <div class="columns">
      <div class="column is-6">
        <img id="imgPreview" :src="imgSrc">
      </div>
      <div class="column is-6">
        <div class="file">
          <label class="file-label">
            <input class="file-input" type="file" id="file" accept="image/jpeg, image/jpg" @change="previewFile">
            <span class="file-cta">
              <span class="file-icon">
                <i class="fas fa-upload"></i>
              </span>
              <span class="file-label">
                Choose a file…
              </span>
            </span>
          </label>
        </div>
        <p class="error" v-if="missingImage">
          Please, insert an image
        </p>
        <input type="text" name="name" id="name" class="input" placeholder="insert an identifier" v-model="name" required>
        <p class="error" v-if="missingName">
          Please, insert an identifier
        </p>
        <input type="button" class="button" value="Add image" @click="addImage">
      </div>
    </div>

  </div>
</template>

<script>
export default {
  data() {
    return {
      imgSrc: 'https://appsrv1-147a1.kxcdn.com/bulma-css-starter/media/contact.svg',
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
</style>