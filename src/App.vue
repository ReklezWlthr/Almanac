<template>
  <div class="flex flex-wrap content-center w-full h-16 bg-darkViolet px-4">
    <div class="font-bold text-3xl px-2 py-1 text-white">
      <router-link to="/"> Kashigami </router-link>
    </div>
    <div class="navButton">
      <router-link to="/upload"> Upload </router-link>
      <router-link :to="`/show/${id}`" id="routerShow">AAA</router-link>
    </div>
  </div>
  <router-view
    :song-list="songList"
    :url="url"
    @edit-song="editSong"
    @upload-song="uploadSong"
    @display-song="displaySong"
  ></router-view>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      songList: [],
      url: "http://localhost:5000/songLists",
      id: ''
    };
  },
  methods: {
    async fetchSongs() {
      const res = await fetch(this.url);
      const data = await res.json();
      return data;
    },
    editSong(data) {
      this.songList = this.songList.map((song) =>
        song.id == data.id ? data : song
      );
    },
    uploadSong(data){
      this.songList.push(data);
    },
    displaySong(id){
      this.setPath(id);
      setTimeout(function(){document.getElementById("routerShow").click();},1);
    },
    setPath(id){
      this.id = id;
    },
  },
  async created() {
    this.songList = await this.fetchSongs();
  },
};
</script>

<style>
#app {
  font-family: "Dosis", sans-serif;
}
</style>
