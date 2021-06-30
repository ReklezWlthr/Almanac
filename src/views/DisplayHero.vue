<template>
    <div class="fixed mt-14 ml-16">
      <div class="w-full">
        <img class="rounded-3xl w-56 h-56 mb-7 object-cover object-center" :src="heroId" />
      </div>
      <ul v-if="loaded">
        <li class="text-paleViolet text-3xl font-bold uppercase">
          {{ currentHero.name }}
        </li>
        <li class="text-paleViolet text-lg">
          {{ currentHero.title }}
        </li>
        <li class="text-paleViolet text-xl">
          <span class="font-bold">Class:</span> {{ currentHero.class }}
        </li>
        <li class="text-paleViolet text-xl">
          <span class="font-bold">Resource:</span> {{ currentHero.resource }}
        </li>
        <li class="text-paleViolet text-xl">
          <span class="font-bold">Range Type:</span> {{ currentHero.attackType }}
        </li>
      </ul>
      <div class="w-56 mx-auto flex justify-center mt-5">
          <button class="displayButton" @click="editHero">Edit</button
          ><button class="displayButton" @click="deleteHero">Delete</button>
      </div>
    </div>
  <div class="w-full flex justify-center gap-x-16 mt-5">
    <div class="w-1/6"></div>
    <div v-if="loaded">
      <div class="text-paleViolet text-2xl font-bold mb-5">Abilities</div>
      <div class="relative whitespace-pre-wrap text-paleViolet bg-darkViolet p-5 rounded-xl w-ability overflow-auto mb-5" v-for="ability in currentHero.abilities" :key="ability.name">
        <span class="absolute z-10 text-8xl font-black opacity-20 italic right-4 -top-3">{{ ability.slot }}</span>
        <div class="flex pb-2">
          <div class="font-bold text-2xl pr-6">{{ ability.name }}</div>
          <div class="flex flex-wrap"><span v-for="(desc, head) in ability.header" :key="head" class="uppercase text-sm whitespace-nowrap"><span class="px-2" v-if="desc"><span class="font-bold">{{ head }}</span>: {{ desc }}</span></span></div>
        </div>
        <div class="py-2 border-t-2" v-html="decodeURIComponent(ability.desc)"></div>
        <div class="pt-2 border-t-2" v-if="ability.scaling">
          <div v-for="(desc, head) in ability.scaling" :key="head">
            <div class="uppercase font-bold">{{ head }}</div>
            <div v-html="decodeURIComponent(desc)"></div>
          </div>
        </div>
      </div>
    </div>
    <div v-if="loaded" class="w-stat">
      <div class="text-paleViolet text-2xl font-bold mb-5">Base Statistics</div>
      <div
        class="flex flex-wrap gap-y-1 h-56 overflow-auto bg-darkViolet rounded-xl py-3"
      >
        <div v-for="stat in currentHero.stats" :key="stat" class="text-paleViolet text-sm uppercase w-1/2 flex flex-wrap px-4 py-2">
        <img :src="getIcon(stat.name)" class="w-4 h-4 mr-2"/>
              <div class="preventOverflow w-1/2 font-bold">{{ stat.name }}</div>: {{ stat.base }} {{ stat.growth ? ' - ' + (stat.base + (stat.growth * 17)) : '' }}
        </div>
      </div>
      <div class="text-paleViolet text-2xl font-bold my-5"><img :src="getIcon('Attack Speed')" class="inline w-5 h-5 mr-3 -mt-1"/>Attack Speed</div>
      <div
        class="flex flex-wrap gap-y-1 h-26 overflow-auto bg-darkViolet rounded-xl py-3"
      >
        <div v-for="stat in currentHero.attackSpeed" :key="stat" class="text-paleViolet text-sm uppercase w-1/2 flex flex-wrap px-4 py-2">
          <div class="font-bold">{{ stat.name }}</div>: {{ stat.name == 'Bonus Attack Speed' ? '0% - ' + (stat.base * 17) + '%' : stat.base }}
        </div>
      </div>
      <div class="text-paleViolet text-2xl font-bold my-5">Ratings</div>
      <div
        class="flex flex-wrap gap-y-1 h-26 overflow-auto bg-darkViolet rounded-xl py-3"
      >
        <div v-for="stat in currentHero.ratings" :key="stat" class="text-paleViolet w-full font-bold text-sm uppercase px-4 py-2">
          <div class="inline-block w-1/6 ml-2">{{ stat.name }}</div><div class="bg-lightViolet w-4/6 inline-block rounded mx-3"><div class="bg-PB rounded text-right pr-2" :class="`w-${stat.base}/3`">{{ stat.base }}</div></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      content: '',
      heroId: this.$route.params.id,
      currentHero: null,
      heroes: [],
      url: "http://localhost:5000/heroes",
      loaded: false,
    };
  },
  methods: {
    async fetchHeroes() {
      const res = await fetch(this.url);
      const data = await res.json();
      return data;
    },
    editHero() {
      this.$emit("launch-edit-page", this.currentHero.id);
    },
    async deleteHero() {
      const con = confirm("Are you sure that you want to delete this hero?");
      if (con) {
        const res = await fetch(`${this.url}/${this.heroId}`, {
          method: "DELETE",
        });
        if (res.status === 200) {
          this.$emit("delete-hero", this.heroId - 1);
          window.location.href = '/';
        } else {
          alert("Failed to delete hero");
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
    getIcon(head){
      return require(`../../public/icons/${head.toLowerCase()}.png`);
    }
  },
  async created() {
    this.heroes = await this.fetchHeroes();
    for (let hero of this.heroes) {
      if (hero.id == this.heroId) {
        this.currentHero = hero;
      }
    }
    this.loaded = true;
    this.heroId = require(`../assets/default.jpg`);
  },
  computed: {
    filteredHeroes() {
      const listBuffer = JSON.parse(JSON.stringify(this.heroes));
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