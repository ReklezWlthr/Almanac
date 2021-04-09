<template>
  <div class="flex flex-wrap content-center w-full h-16 bg-darkViolet px-4">
    <div class="font-bold text-3xl px-2 py-1 text-white">
      <router-link to="/"> Kashigami </router-link>
    </div>
    <div class="navButton">
      <router-link to="/upload"> Upload </router-link>
    </div>
    <div>
      <input
        placeholder="SEARCH FOR SONGS, ARTISTS OR ALBUMS"
        class="input"
        v-model="search"
      />
    </div>
  </div>
  <router-view :forwardSearch="search"></router-view>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      search: "",
    };
  },
};
</script>

<style>
#app {
  font-family: "Dosis", sans-serif;
}
</style>
