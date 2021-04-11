<template>
  <div class="w-full flex justify-center gap-x-20 mt-10">
    <div>
      <img class="rounded-3xl w-56 h-56 mb-7" :src="coverId" />
      <ul v-if="loaded">
        <li class="text-paleViolet text-xl">
          <span class="font-bold">Title:</span> {{ currentSong.title }}
        </li>
        <li class="text-paleViolet text-xl">
          <span class="font-bold">Artist:</span> {{ currentSong.artist }}
        </li>
        <li class="text-paleViolet text-xl">
          <span class="font-bold">Album:</span> {{ currentSong.album }}
        </li>
        <li class="text-paleViolet text-xl">
          <span class="font-bold">Album Artist:</span>
          {{ currentSong.albumArtist }}
        </li>
        <li class="text-paleViolet text-xl">
          <span class="font-bold">Year:</span> {{ currentSong.year }}
        </li>
        <li class="text-paleViolet text-xl">
          <span class="font-bold">Genre:</span> {{ currentSong.genre }}
        </li>
        <li class="flex gap-x-2 mt-2">
          <button
            class="font-bold bg-darkViolet text-paleViolet text-xl px-5 py-2 focus:outline-none rounded-full mx-auto"
            @click="editSong"
          >
            Edit</button
          ><button
            class="font-bold bg-darkViolet text-paleViolet text-xl px-5 py-2 focus:outline-none rounded-full mx-auto"
            @click="deleteSong"
          >
            Delete
          </button>
        </li>
      </ul>
    </div>
    <div v-if="loaded">
      <div class="text-paleViolet text-2xl font-bold mb-5">Lyrics</div>
      <div
        class="whitespace-pre-wrap text-paleViolet bg-darkViolet p-5 rounded-xl w-96 overflow-auto h-showCase"
      >
        {{ `${decodedLyrics}` }}
      </div>
    </div>
    <div>
      <div class="text-paleViolet text-2xl font-bold mb-5">
        More Songs<input
          placeholder="SEARCH FOR SONGS, ARTISTS OR ALBUMS"
          class="input ml-4"
          v-model="search"
        />
      </div>
      <div class="h-showCase overflow-auto bg-darkViolet rounded-xl py-3">
        <div v-for="song in filteredSongs" :key="song.id">
          <song-thumbnail
            :song="song"
            :likeable="false"
            @show-song="showSong"
          />
        </div>
      </div>
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
      coverId: "",
      songId: this.$route.params.id,
      currentSong: null,
      songArray: [],
      urls: "http://localhost:5000/songLists",
      loaded: false,
    };
  },
  methods: {
    async fetchSongs() {
      const res = await fetch(this.urls);
      const data = await res.json();
      return data;
    },
    showSong(id) {
      this.$emit("display-song", id);
    },
    editSong() {
      this.$emit("launch-edit-page", this.songId);
    },
    async deleteSong() {
      const con = confirm("Are you sure that you want to delete this song?");
      if (con) {
        const res = await fetch(`${this.urls}/${this.songId}`, {
          method: "DELETE",
        });
        if (res.status === 200) {
          this.$emit("delete-song", this.songId - 1);
          window.location.replace("/");
        } else {
          alert("Failed to delete song");
        }
      }
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
  async created() {
    this.songArray = await this.fetchSongs();
    for (let song of this.songArray) {
      if (song.id == this.songId) {
        this.currentSong = song;
      }
    }
    this.loaded = true;
    // console.log(this.currentSong);
    // console.log(this.songId);
    this.coverId = `/img/loading.729f0a14.gif`;
    const res = await fetch(
      `http://musicbrainz.org/ws/2/release/?fmt=json&query=${this.currentSong.album}%20AND%20artist:${this.currentSong.artist}%20AND%20(format:digitalmedia%20OR%20format:cd)`
    );
    const data = await res.json();
    if (data.releases[0]) {
      for (let release of data.releases) {
        const albumId = release.id;
        const res2 = await fetch(
          `http://coverartarchive.org/release/${albumId}`
        );
        if (res2.ok) {
          const data2 = await res2.json();
          this.coverId = data2.images[0].thumbnails.small;
          break;
        }
      }
    } else {
      this.coverId = `/img/default.bc1ffa9c.jpg`;
    }
  },
  computed: {
    decodedLyrics() {
      const decoded = decodeURIComponent(this.currentSong.lyrics);
      return decoded === "" ? "No Lyrics Available" : decoded;
    },
    filteredSongs() {
      const listBuffer = JSON.parse(JSON.stringify(this.songArray));
      if (this.search == "") {
        return listBuffer.sort(this.compare);
      } else {
        return listBuffer
          .filter(
            (song) =>
              song.title.toLowerCase().includes(this.search.toLowerCase()) ||
              song.album.toLowerCase().includes(this.search.toLowerCase()) ||
              song.artist.toLowerCase().includes(this.search.toLowerCase())
          )
          .sort(this.compare);
      }
    },
  },
};
</script>