<template>
  <div class="text-5xl font-bold ml-10 mt-8 text-paleViolet">Edit Song</div>
  <div v-if="loaded" class="flex justify-center gap-x-12">
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
      <div class="w-60 text-paleViolet italic text-sm mt-2 text-center">
        CLICK TO FIND COVER IMAGE FROM ARCHIVE<br />
        BY MUSICBRAINZ &amp; COVER ART ARCHIVE
      </div>
    </div>
    <div class="w-1/4 mt-5 ml-12">
      <input-box
        v-for="(value, key) in newSongInfo"
        :key="key"
        :valueIn="value"
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
        v-model="lyrics"
        class="rounded-3xl w-96 bg-paleViolet focus:outline-none text-base text-darkViolet font-semibold px-5 h-lyrics resize-none py-4"
      ></textarea>
    </div>
  </div>
  <div v-if="loaded" class="w-full flex mt-4">
    <button
      @click="editSong"
      class="font-bold bg-darkViolet text-paleViolet text-xl px-5 py-3 focus:outline-none rounded-full mx-auto"
    >
      Save
    </button>
  </div>
</template>

<script>
import InputBox from "../components/InputBox.vue";
export default {
  components: { InputBox },
  emits: ["edit-song", "upload-song", "display-song", "launch-edit-page", 'delete-song'],
  data() {
    return {
      songId: this.$route.params.id,
      currentSong: {},
      newSongInfo: {},
      lyrics: "",
      src: "/img/default.bc1ffa9c.jpg",
      loaded: false,
    };
  },
  props: ["forwardSearch", "songList", "url"],
  methods: {
    updateValue(value, key) {
      eval(`this.newSongInfo.${key}='${value}';`);
    },
    async editSong() {
      const newSongBuffer = JSON.parse(JSON.stringify(this.newSongInfo));
      console.log(newSongBuffer);
      newSongBuffer.liked = false;
      newSongBuffer.lyrics = encodeURIComponent(this.lyrics);
      const res = await fetch(`${this.url}/${this.songId}`, {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(newSongBuffer),
      });
      const data = await res.json();
      this.$emit("edit-song", data);
      window.location.replace("/");
    },
    async fetchCurrentSong() {
      const res = await fetch(`${this.url}/${this.songId}`);
      const data = await res.json();
      return data;
    },
    async reloadCover() {
      this.src = `/img/loading.729f0a14.gif`;
      try {
        const res = await fetch(
          `http://musicbrainz.org/ws/2/release/?fmt=json&query=${this.newSongInfo.album}%20AND%20artist:${this.newSongInfo.artist}%20AND%20(format:digitalmedia%20OR%20format:cd)`
        );
        const data = await res.json();
        if (data.releases[0]) {
          const albumId = data.releases[0].id;
          //   this.newSongInfo.artist = data.releases[0]["artist-credit"][0].name;
          //   this.newSongInfo.album = data.releases[0].title;
          //   this.newSongInfo.year = data.releases[0].date.slice(0,4);
          //   console.log(this.newSongInfo)
          const res2 = await fetch(
            `http://coverartarchive.org/release/${albumId}`
          );
          const data2 = await res2.json();
          this.src = data2.images[0].thumbnails.small;
        } else {
          this.src = `/img/default.bc1ffa9c.jpg`;
          alert("Album Cover Not Found");
        }
      } catch {
        this.src = `/img/default.bc1ffa9c.jpg`;
      }
    },
  },
  async created() {
    this.currentSong = await this.fetchCurrentSong();
    this.newSongInfo.title = this.currentSong.title;
    this.newSongInfo.artist = this.currentSong.artist;
    this.newSongInfo.album = this.currentSong.album;
    this.newSongInfo.albumArtist = this.currentSong.albumArtist;
    this.newSongInfo.year = this.currentSong.year;
    this.newSongInfo.genre = this.currentSong.genre;
    this.lyrics = decodeURIComponent(this.currentSong.lyrics);
    console.log(this.newSongInfo);
    this.reloadCover();
    this.loaded = true;
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
