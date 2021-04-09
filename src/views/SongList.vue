<template>
  <div class="navButton">Total Songs: {{ filteredSongs.length }}</div>
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
        return this.songList.filter(
          (song) =>
            song.title
              .toLowerCase()
              .includes(this.forwardSearch.toLowerCase()) ||
            song.album
              .toLowerCase()
              .includes(this.forwardSearch.toLowerCase()) ||
            song.artist.toLowerCase().includes(this.forwardSearch.toLowerCase())
        );
      }
    },
  },
  async created() {
    this.songList = await this.fetchSongs();
  },
};
</script>
