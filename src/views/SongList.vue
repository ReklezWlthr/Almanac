<template>
  <div class="navButton">Total Songs: {{ songList.length }}</div>
  <div class="flex flex-wrap">
    <div v-for="song in filteredSongs" :key="song.id">
      <song-thumbnail :song="song" @like-song="editSong" />
    </div>
  </div>
</template>

<script>
import SongThumbnail from "../components/SongThumbnail.vue";

export default {
  components: { SongThumbnail },
  data() {
    return {
      url: "http://localhost:5000/songLists",
      songList: [],
    };
  },
  props: ["forwardSearch"],
  methods: {
    async fetchSongs() {
      const res = await fetch(this.url);
      const data = await res.json();
      // parses JSON response into native JavaScript objects
      return data;
    },
    async editSong(newSong) {
      const res = await fetch(`${this.url}/${newSong.id}`, {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(newSong),
      });
      const data = await res.json();
      this.songList = this.songList.map((song) =>
        song.id == data.id ? data : song
      );
    },
  },
  computed: {
    filteredSongs() {
      if (this.forwardSearch == "") {
        return this.songList;
      } else {
        const fs = this.songList.filter(
          (song) =>
            song.name.toLowerCase().includes(this.forwardSearch.toLowerCase()) ||
            song.album.toLowerCase().includes(this.forwardSearch.toLowerCase()) ||
            song.artist.toLowerCase().includes(this.forwardSearch.toLowerCase())
        );
        if (fs.length == 0) {
          return null;
        } else {
          return fs;
        }
      }
    },
  },
  async created() {
    this.songList = await this.fetchSongs();
    for (const song in this.$songList) {
      console.log(song.name);
    }
  },
};
</script>
