<template>
  <div class="w-full flex justify-center gap-x-20 mt-10">
    <div>
      <img class="rounded-3xl w-56 h-56 mb-7" :src="coverId" />
      <ul v-if="loaded">
        <li class="text-paleViolet text-xl">Title: {{ currentSong.title }}</li>
        <li class="text-paleViolet text-xl">
          Artist: {{ currentSong.artist }}
        </li>
        <li class="text-paleViolet text-xl">Album: {{ currentSong.album }}</li>
        <li class="text-paleViolet text-xl">
          Album Artist: {{ currentSong.albumArtist }}
        </li>
        <li class="text-paleViolet text-xl">Year: {{ currentSong.year }}</li>
        <li class="text-paleViolet text-xl">Genre: {{ currentSong.genre }}</li>
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
      <div class="text-paleViolet text-2xl font-bold mb-5">More Songs</div>
      <div class="h-showCase overflow-auto bg-darkViolet rounded-xl">
        <div v-for="song in sortedSongs" :key="song.id">
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
    this.currentSong = await this.songArray[this.songId - 1];
    this.loaded = true;
    // console.log(this.currentSong);
    // console.log(this.songId);
    this.coverId = `/img/loading.729f0a14.gif`;
    const res = await fetch(
      `http://musicbrainz.org/ws/2/release/?fmt=json&query=${this.currentSong.album}%20AND%20artist:${this.currentSong.artist}`
    );
    const data = await res.json();
    const albumId = data.releases[0].id;
    const res2 = await fetch(`http://coverartarchive.org/release/${albumId}`);
    const data2 = await res2.json();
    this.coverId = data2.images[0].thumbnails.small;
  },
  computed: {
    decodedLyrics() {
      return decodeURIComponent(this.currentSong.lyrics);
    },
    sortedSongs() {
      const listBuffer = JSON.parse(JSON.stringify(this.songArray));
      return listBuffer.sort(this.compare);
    },
  },
};
</script>