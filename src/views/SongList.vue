<template>
  <div class="navButton">
    <input
      placeholder="SEARCH FOR SONGS, ARTISTS OR ALBUMS"
      class="input mt-3 mr-3 ml-4"
      v-model="search"
    />
    Total Songs: {{ filteredSongs.length }}
  </div>
  <div class="flex flex-wrap mb-5">
    <div v-for="song in filteredSongs" :key="song.id">
      <song-thumbnail
        :song="song"
        @like-song="editSong"
        @show-song="showSong"
      />
    </div>
  </div>
</template>

<script>
import SongThumbnail from "../components/SongThumbnail.vue";

export default {
  components: { SongThumbnail },
  data() {
    return {
      search: "",
    };
  },
  emits: ["edit-song", "upload-song", "display-song", "launch-edit-page", "delete-song"],
  props: ["songList", "url"],
  methods: {
    async editSong(newSong) {
      const res = await fetch(`${this.url}/${newSong.id}`, {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(newSong),
      });
      const data = await res.json();
      this.$emit("edit-song", data);
    },
    showSong(id) {
      this.$emit("display-song", id);
    },
    compare(a, b) {
      const titleA = a.title.toUpperCase();
      const titleB = b.title.toUpperCase();

      let comparison = 0;
      if (titleA > titleB) {
        comparison = 1;
      } else if (titleA < titleB) {
        comparison = -1;
      }
      return comparison;
    },
  },
  computed: {
    filteredSongs() {
      const listBuffer = JSON.parse(JSON.stringify(this.songList));
      if (this.search == "") {
        return listBuffer.sort(this.compare);
      } else {
        return listBuffer.filter(
          (song) =>
            song.title.toLowerCase().includes(this.search.toLowerCase()) ||
            song.album.toLowerCase().includes(this.search.toLowerCase()) ||
            song.artist.toLowerCase().includes(this.search.toLowerCase())
        ).sort(this.compare);
      }
    },
  },
};
</script>
