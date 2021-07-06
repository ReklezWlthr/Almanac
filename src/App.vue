<template>
  <div class="flex flex-wrap content-center w-full h-16 bg-darkViolet px-4 sticky top-0 z-50">
    <div class="font-bold text-3xl px-2 py-1 text-white">
      <router-link to="/"> Almanac </router-link>
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
    @edit-hero="editHero"
    @launch-edit-page="launchEditPage"
    @upload-hero="uploadHero"
    @display-hero="displayHero"
    @delete-hero="deleteHero"
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
    editHero(data) {
      this.heroList = this.heroList.map((hero) =>
        hero.id == data.id ? data : hero
      );
    },
    uploadHero(data){
      this.heroList.push(data);
    },
    deleteHero(id){
      this.heroList = this.heroList.filter(hero => hero.id != id);
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
html{
  overflow: overlay;
}

#app {
  font-family: "Dosis", "Athiti", "M PLUS Rounded 1c";
}

.ql-bubble .ql-tooltip {
  z-index: 100 !important;
}

/* width */
::-webkit-scrollbar {
  width: 10px;
}
 
/* Handle */
::-webkit-scrollbar-thumb {
  background: #888;
  border-radius: 5px; 
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #555; 
}
</style>
