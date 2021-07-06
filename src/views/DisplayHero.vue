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
      <div class="text-paleViolet text-2xl font-bold mb-5">Abilities
        <button
              class="ml-2 mb-2 font-bold text-base px-5 py-1 focus:outline-none rounded-full mx-auto hover:bg-lightPB hover:text-darkPB transition duration-100"
              :class="ability.slot != abilDis ? 'bg-PB text-paleViolet' : 'bg-lightPB text-darkPB'"
              @click="abilDis = ability.slot"
              v-for="ability in currentHero.abilities"
              :key="ability.name"
            >{{ ability.slot }}</button>
      </div>
      <div v-for="ability in currentHero.abilities" :key="ability.name">
        <div v-if="ability.slot == abilDis" class="relative whitespace-pre-wrap text-paleViolet bg-darkViolet p-5 rounded-xl w-ability overflow-auto mb-5" >
        <span class="absolute z-10 text-8xl font-black opacity-20 italic right-4 -top-3">{{ ability.slot }}</span>
        <div class="flex pb-2">
          <div class="font-bold text-2xl pr-6 whitespace-nowrap">{{ ability.name }}</div>
          <div class="flex flex-wrap"><span v-for="(desc, head) in ability.header" :key="head" class="uppercase text-sm"><span class="px-2" v-if="decodeURIComponent(desc).slice(3, -4).toLowerCase() !== '<br>' && desc"><span class="font-bold">{{ head }}</span>: <span v-html="decodeURIComponent(desc).slice(3, -4)"></span></span></span></div>
        </div>
        <div class="py-2 border-t-2" v-html="decodeURIComponent(ability.desc)"></div>
        <div class="py-2 border-t-2 flex flex-wrap text-sm gap-y-3" v-if="ability.slot != 'P' && ability.scaling.length">
          <div v-for="item in ability.scaling" :key="item" class="w-1/2 px-1">
            <div class="uppercase font-bold">{{ item.key }}</div>
            <div v-html="decodeURIComponent(item.value)"></div>
          </div>
        </div>
        <div v-if="ability.slot != 'P'">
        <div v-for="subAbility in ability.subAbility" :key="subAbility">
        <div class="flex pb-2 pt-5">
          <div class="font-bold text-2xl pr-6 whitespace-nowrap">{{ subAbility.name }}</div>
          <div class="flex flex-wrap"><span v-for="(desc, head) in subAbility.header" :key="head" class="uppercase text-sm whitespace-nowrap"><span class="px-2" v-if="decodeURIComponent(desc).slice(3, -4).toLowerCase() !== '<br>' && desc"><span class="font-bold">{{ head }}</span>: <span v-html="decodeURIComponent(desc).slice(3, -4)"></span></span></span></div>
        </div>
        <div class="py-2 border-t-2" v-html="decodeURIComponent(subAbility.desc)"></div>
        <div class="pt-2 border-t-2 flex flex-wrap text-sm gap-y-3" v-if="subAbility.scaling.length">
          <div v-for="item in subAbility.scaling" :key="item" class="w-1/2 px-1">
            <div class="uppercase font-bold">{{ item.key }}</div>
            <div v-html="decodeURIComponent(item.value)"></div>
          </div>
        </div>
        </div>
        </div>
        </div>
      </div>
    </div>
    <div v-if="loaded" class="w-stat">
      <div class="text-paleViolet text-2xl font-bold mb-3">Base Statistics
        <button
              v-if="view"
              class="ml-2 mb-2 font-bold bg-PB text-paleViolet text-base px-3 py-1 focus:outline-none rounded-full mx-auto hover:bg-lightPB hover:text-darkPB transition duration-100"
              @click="toggleView"
            >Level 1 - 18</button>
            <button
              v-if="!view"
              class="ml-2 mb-2 font-bold bg-PB text-paleViolet text-base px-3 py-1 focus:outline-none rounded-full mx-auto hover:bg-lightPB hover:text-darkPB transition duration-100"
              @click="toggleView"
            >Base + Growth</button>
      </div>
      <div
        class="flex flex-wrap gap-y-1 overflow-auto bg-darkViolet rounded-xl py-3"
      >
        <div v-for="stat in currentHero.stats" :key="stat" class="text-paleViolet text-sm uppercase" :class="{'w-1/2': stat.base}">
        <div v-if="stat.base && view" class="flex px-4 py-2">
        <img :src="getIcon(stat.name)" class="w-4 h-4 mr-2"/>
              <div class="preventOverflow w-1/2 font-bold">{{ stat.name }}</div>: {{ stat.name == 'Crit Damage' || stat.name == 'Secondary Bar' || (stat.name == 'Mana' && currentHero.resource == 'N/A') ? stat.base : parseFloat(stat.base) }} {{ parseFloat(stat.growth) ? ' - ' + (Math.round((parseFloat(stat.base) + (parseFloat(stat.growth) * 17)) * 100 ) / 100) : '' }}
        </div>
        <div v-if="stat.base && !view" class="flex px-4 py-2">
        <img :src="getIcon(stat.name)" class="w-4 h-4 mr-2"/>
              <div class="preventOverflow w-1/2 font-bold">{{ stat.name }}</div>: {{ stat.name == 'Crit Damage' || stat.name == 'Secondary Bar' || (stat.name == 'Mana' && currentHero.resource == 'N/A') ? stat.base : parseFloat(stat.base) }} {{ parseFloat(stat.growth) ? ' (+' + parseFloat(stat.growth) + ')' : '' }}
        </div>
        </div>
      </div>
      <div class="text-paleViolet text-2xl font-bold my-3"><img :src="getIcon('Attack Speed')" class="inline w-5 h-5 mr-3 -mt-1"/>Attack Speed</div>
      <div
        class="flex flex-wrap gap-y-1 h-26 overflow-auto bg-darkViolet rounded-xl py-3"
      >
        <div v-for="stat in currentHero.attackSpeed" :key="stat" class="text-paleViolet text-sm uppercase w-1/2 flex flex-wrap px-4 py-2">
          <div class="font-bold">{{ stat.name }}</div>: {{ stat.name == 'Bonus Attack Speed' ? (view ? '0% - ' + (Math.round((parseFloat(stat.base) * 17) * 100) / 100) + '%' : stat.base + '%' ) : stat.base }}
        </div>
      </div>
      <div class="text-paleViolet text-2xl font-bold my-3">Ratings</div>
      <div
        class="flex flex-wrap gap-y-1 h-26 overflow-auto bg-darkViolet rounded-xl py-3"
      >
        <div v-for="stat in currentHero.ratings" :key="stat" class="text-paleViolet w-1/2 font-bold text-sm uppercase px-4 py-2">
          <div class="inline-block w-1/5 ml-2 mr-8">{{ stat.name }}</div><div class="bg-lightViolet w-2/5 inline-block rounded mx-3"><div class="bg-PB rounded text-right pr-2" :class="`w-${stat.base}/3`">{{ stat.base }}</div></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  emits: ["edit-hero",
    "upload-hero",
    "display-hero",
    "launch-edit-page",
    "delete-hero",],
    props: ['url'],
  data() {
    return {
      content: '',
      heroId: this.$route.params.id,
      currentHero: null,
      heroes: [],
      loaded: false,
      view: true,
      abilDis: 'P'
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
    toggleView() {
      this.view = !this.view;
    },
    async deleteHero() {
      const con = confirm("Are you sure that you want to delete this hero?");
      if (con) {
        const res = await fetch(`${this.url}/${this.currentHero.id}`, {
          method: "DELETE",
        });
        if (res.status === 200) {
          this.$emit("delete-hero", this.currentHero.id);
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
      return head == 'Secondary Bar' ? require(`../../public/icons/mana regen.png`) : require(`../../public/icons/${head.toLowerCase()}.png`);
    },
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