<template>
  <div>
    <input type="file" id="file" accept="image/jpeg, image/png, image/jpg" @change="previewFile">
    <img id="imgPreview" :src="imgSrc">
    <input type="text" name="name" id="name" placeholder="insert an identifier">
  </div>
</template>

<script>
export default {
  data() {
    return {
      imgSrc: '',
      fileReader: new FileReader(),
    }
  },
  methods: {
    previewFile() {
      const file = document.querySelector('input[type=file]').files[0];

      if (file) {
        this.fileReader.readAsDataURL(file);
      }
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
  max-width: 300px;
  max-height: 300px;
}
</style>