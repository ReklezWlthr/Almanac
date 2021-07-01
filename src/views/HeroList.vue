<template>
  <div class="navButton">
    <input
      placeholder="SEARCH"
      class="input mt-3 mr-3 ml-4"
      v-model="search"
    />
    Total Heroes: {{ filteredHeroes.length }}
  </div>
  <div class="flex flex-wrap mb-5">
    <div v-for="hero in filteredHeroes" :key="hero.id">
      <hero-thumbnail
        :hero="hero"
        @show-hero="showHero"
      />
    </div>
  </div>
</template>

<script>
import HeroThumbnail from "../components/HeroThumbnail.vue";

export default {
  components: { HeroThumbnail },
  data() {
    return {
      search: "",
      likeOnly: false,
    };
  },
  emits: [
    "edit-song",
    "upload-song",
    "display-hero",
    "launch-edit-page",
    "delete-song",
  ],
  props: ["heroList", "url"],
  methods: {
    showHero(id) {
      this.$emit("display-hero", id);
    },
    compare(a, b) {
      const titleA = a.name.toUpperCase();
      const titleB = b.name.toUpperCase();

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
    filteredHeroes() {
      let listBuffer = JSON.parse(JSON.stringify(this.heroList));
      if (this.search == "") {
        return listBuffer.sort(this.compare);
      } else {
        return listBuffer
          .filter(
            (hero) =>
              hero.name.toLowerCase().includes(this.search.toLowerCase())
          )
          .sort(this.compare);
      }
    },
  },
};
</script>
