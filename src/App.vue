<template>
  <div class="flex flex-wrap content-center w-full h-16 bg-darkViolet px-4 sticky top-0 z-50">
    <div class="font-bold text-3xl px-2 py-1 text-white">
      <router-link to="/"> Kashigami </router-link>
    </div>
    <div class="navButton">
      <router-link to="/upload"> Upload </router-link>
      <router-link :to="`/show/${id ? id : '1'}`" id="routerShow"></router-link>
      <router-link :to="`/edit/${id ? id : '1'}`" id="routerEdit"></router-link>
    </div>
  </div>
  <router-view
    :hero-list="heroList"
    :url="url"
    @edit-song="editSong"
    @launch-edit-page="launchEditPage"
    @upload-song="uploadSong"
    @display-hero="displayHero"
    @delete-song="deleteSong"
  ></router-view>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      heroList: [],
      url: "http://localhost:5000/heroes",
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
      this.heroList = this.heroList.map((song) =>
        song.id == data.id ? data : song
      );
    },
    uploadSong(data){
      this.heroList.push(data);
    },
    deleteSong(id){
      this.heroList = this.heroList.filter(song => song.id != id);
    },
    displayHero(id){
      this.setPath(id);
      setTimeout(function(){document.getElementById("routerShow").click();},1);
    },
    launchEditPage(id){
      this.setPath(id);
      setTimeout(function(){document.getElementById("routerEdit").click();},1);
    },
    setPath(id){
      this.id = id;
    },
  },
  async created() {
    this.heroList = await this.fetchSongs();
  },
};
</script>

<style>
#app {
  font-family: "Dosis", "Athiti", "M PLUS Rounded 1c";
}
</style>
