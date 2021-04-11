<template>
  <div class="text-5xl font-bold ml-10 mt-8 text-paleViolet">Edit Song</div>
  <edit-form v-if="loaded"
    :new-song-info="newSongInfo"
    :src="src"
    :lyrics="lyrics"
    @reload-cover="reloadCover"
    @forward-value="updateValue"
  />
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
export default {
  emits: [
    "edit-song",
    "upload-song",
    "display-song",
    "launch-edit-page",
    "delete-song",
  ],
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
  props: ["songList", "url"],
  methods: {
    updateValue(lyrics) {
      this.lyrics = lyrics;
    },
    async editSong() {
      const newSongBuffer = JSON.parse(JSON.stringify(this.newSongInfo));
      console.log(newSongBuffer);
      newSongBuffer.liked = false;
      console.log(this.lyrics)
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
