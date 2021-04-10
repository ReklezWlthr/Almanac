<template>
  <div class="text-5xl font-bold ml-10 mt-8 text-paleViolet">
    Upload New Song
  </div>
  <div class="flex justify-center gap-x-12">
    <div class="mt-10">
      <img :src="src" class="rounded-3xl w-56 h-56" />
      <div class="ml-48 -mt-8 relative">
        <div
          @click="reloadCover"
          id="spin"
          class="h-14 w-14 rounded-full flex flex-wrap justify-center content-center border-darkViolet text-paleViolet cursor-pointer"
          style="border-width: 1.8rem"
        >
          <i class="fas fa-sync-alt text-2xl"></i>
        </div>
      </div>
      <div class="w-60 text-paleViolet italic text-sm mt-2">
        CLICK TO FIND COVER IMAGE FROM ARCHIVE
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
      <textarea v-model="lyrics"
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
  emits:['edit-song', 'upload-song', 'display-song'],
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
      lyrics: "",
      src: "/img/default.bc1ffa9c.jpg",
    };
  },
  props: ["forwardSearch", 'songList', 'url'],
  methods: {
    updateValue(value, key) {
      eval(`this.newSongInfo.${key}='${value}';`);
    },
    async upload() {
      const newSongBuffer = JSON.parse(JSON.stringify(this.newSongInfo));
      console.log(newSongBuffer)
      newSongBuffer.liked = false;
      newSongBuffer.lyrics = encodeURIComponent(this.lyrics);
      const res = await fetch(this.url, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(newSongBuffer),
      })
      const data = res.json();
      this.$emit("upload-song", data);
    },
    async reloadCover() {
        this.src = `/img/loading.729f0a14.gif`;
      try {
        const res = await fetch(
          `http://musicbrainz.org/ws/2/release/?fmt=json&query=${this.newSongInfo.album}%20AND%20artist:${this.newSongInfo.artist}`
        );
        const data = await res.json();
        if (data.releases[0]) {
          const albumId = data.releases[0].id;
          const res2 = await fetch(
            `http://coverartarchive.org/release/${albumId}`
          );
          const data2 = await res2.json();
          this.src = data2.images[0].thumbnails.small;
        } else {
          this.src = `/img/default.bc1ffa9c.jpg`;
        }
      } catch {
        this.src = `/img/default.bc1ffa9c.jpg`;
        alert("Album Cover Not Found");
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
