<template>
  <div class="navButton">
    <input
      placeholder="SEARCH"
      class="input mt-3 mr-3 ml-4"
      v-model="search"
    />
    <select v-model="filterClass" class="input mr-3">
          <option class="text-darkViolet" value="">Class</option>
          <option class="text-darkViolet" value="Assassin">Assassin</option>
          <option class="text-darkViolet" value="Duelist">Duelist</option>
          <option class="text-darkViolet" value="Berserker">Berserker</option>
          <option class="text-darkViolet" value="Bruiser">Bruiser</option>
          <option class="text-darkViolet" value="Burst">Burst</option>
          <option class="text-darkViolet" value="Battlemage">Battlemage</option>
          <option class="text-darkViolet" value="Arcanist">Arcanist</option>
          <option class="text-darkViolet" value="Guardian">Guardian</option>
          <option class="text-darkViolet" value="Warlord">Warlord</option>
          <option class="text-darkViolet" value="Enchanter">Enchanter</option>
          <option class="text-darkViolet" value="Controller">Controller</option>
          <option class="text-darkViolet" value="Marksman">Marksman</option>
          <option class="text-darkViolet" value="Specialist">Specialist</option>
    </select>
    <select v-model="filterType" class="input mr-3">
          <option class="text-darkViolet" value="">Attack Type</option>
          <option class="text-darkViolet" value="Melee">Melee</option>
          <option class="text-darkViolet" value="Range">Range</option>
    </select>
    <button class="mr-3 font-bold bg-PB text-paleViolet text-base px-3 py-1 focus:outline-none rounded-full mx-auto hover:bg-lightPB hover:text-darkPB transition duration-100" @click="clear">Clear</button>
    Total Heroes: {{ filteredHeroes.length }}
  </div>
  <div class="grid grid-cols-5 mb-5">
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
      filterClass: "",
      filterType: "",
    };
  },
  emits: [
    "edit-hero",
    "upload-hero",
    "display-hero",
    "launch-edit-page",
    "delete-hero",
  ],
  props: ["url"],
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
    clear() {
      this.search = "";
      this.filterClass = "";
      this.filterType = "";
    }
  },
  computed: {
    filteredHeroes() {
      let listBuffer = JSON.parse(JSON.stringify(this.heroList));
      if (this.search && this.filterClass && this.filterType) {
        return listBuffer.sort(this.compare);
      } else {
        return listBuffer.filter((hero) => hero.name.toLowerCase().includes(this.search.toLowerCase()) && hero.class.toLowerCase().includes(this.filterClass.toLowerCase()) && hero.attackType.toLowerCase().includes(this.filterType.toLowerCase())).sort(this.compare);
      }
    },
  },
};
</script>
