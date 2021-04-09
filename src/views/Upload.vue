<template>
  <div class="text-5xl font-bold ml-10 mt-8 text-paleViolet">
    Upload New Song
  </div>
  <div class="flex justify-center gap-x-12">
    <div class="mt-10">
      <img :src="src" class="rounded-3xl w-56 h-56" />
      <div class="ml-48 -mt-8 relative">
        <input
          @change="uploadCover"
          type="file"
          id="myFile"
          class="inputFile hidden"
        />
        <label
          for="myFile"
          id="spin"
          class="h-14 w-14 rounded-full flex flex-wrap justify-center content-center border-darkViolet text-paleViolet cursor-pointer"
          style="border-width: 1.8rem"
          ><i class="fas fa-sync-alt text-2xl"></i
        ></label>
      </div>
      <div class="w-60 text-paleViolet italic text-sm">
        **The upload feature is still a dummy. Uploaded photo will be shown but
        will NOT be uploaded to the server. Album cover that already existed
        will be automatically used; otherwise, default cover will be used.**
      </div>
    </div>
    <div class="w-1/4 mt-5 ml-12">
      <input-box
        v-for="(value, key) in newSongInfo"
        :key="key"
        :header="
          key
            .replace(/([A-Z])/g, '$1')
            .charAt(0)
            .toUpperCase() + key.slice(1)
        "
        @forward-value="updateValue($event, key)"
      />
    </div>
    <div class="mt-4">
      <div class="text-lg font-bold text-paleViolet">Lyrics</div>
      <textarea
        class="rounded-3xl w-96 bg-paleViolet focus:outline-none text-base text-darkViolet font-semibold px-5 h-lyrics resize-none py-4"
      ></textarea>
    </div>
  </div>
  <div class="w-full flex mt-4">
    <button
      @click="upload"
      class="font-bold bg-darkViolet text-paleViolet text-xl px-5 py-3 focus:outline-none rounded-full mx-auto"
    >
      Upload
    </button>
  </div>
</template>

<script>
import InputBox from "../components/InputBox.vue";
export default {
  components: { InputBox },
  data() {
    return {
      newSongInfo: {
        title: "",
        artist: "",
        album: "",
        albumArtist: "",
        year: null,
        genre: "",
      },
      url: "http://localhost:5000/songLists",
      src: "/img/default.bc1ffa9c.jpg",
    };
  },
  props: ["forwardSearch"],
  methods: {
    updateValue(value, key) {
      eval(`this.newSongInfo.${key}='${value}';`);
    },
    async upload() {
      const newSongBuffer = JSON.parse(JSON.stringify(this.newSongInfo));
      newSongBuffer.liked = false;
      fetch(this.url, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(this.newSongInfo),
      }).then(window.location.replace("/"));
    },
    uploadCover(e) {
      var file = e.target.files[0];
      if (file.type.includes("image")) {
        var reader = new FileReader();
        reader.onload = (e) => {
          this.src = e.target.result;
        };
        reader.readAsDataURL(file);
      } else {
        alert("This file is not an image file.");
      }
    },
  },
};
</script>

<style scoped>
@keyframes spin {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}

#spin:hover {
  animation: spin 1s;
}
</style>