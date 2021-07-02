<template>
  <edit-form
    v-if="loaded"
    :new-hero-info="currentHero"
    :src="src"
    @reload-cover="reloadCover"
    @save="edit"
  />
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
      heroId: this.$route.params.id,
      currentHero: {},
      src: require(`../assets/default.jpg`),
      loaded: false,
    };
  },
  methods: {
    async edit() {
      const newHeroBuffer = JSON.parse(JSON.stringify(this.currentHero));
      for (let ability of newHeroBuffer.abilities) {
        ability.desc = encodeURIComponent(ability.desc);
        for (let head in ability.header) {
          ability.header[head] = encodeURIComponent(ability.header[head]);
        }
        if (ability.scaling) {
          for (let item of ability.scaling) {
            item.key = item.key.toUpperCase();
            item.value = encodeURIComponent(item.value);
          }
        }
        if(ability.slot != 'P'){
        for(let subAbility of ability.subAbility){
        subAbility.desc = encodeURIComponent(subAbility.desc);
        for (let head in subAbility.header) {
          subAbility.header[head] = encodeURIComponent(subAbility.header[head]);
        }
        if (subAbility.scaling) {
          for (let item of subAbility.scaling) {
            item.key = item.key.toUpperCase();
            item.value = encodeURIComponent(item.value);
          }
        }
        }
        }
      }
      if(newHeroBuffer.resource == 'Mana'){
        for(let stat in newHeroBuffer.stats){
          if(stat.name == 'Stamina' || stat.name == 'Stamina Regen' || stat.name == 'Secondary Bar'){
            stat.base = "";
            stat.growth = "";
          }
        }
      } else if(newHeroBuffer.resource == 'Stamina'){
        for(let stat in newHeroBuffer.stats){
          if(stat.name == 'Mana' || stat.name == 'Mana Regen' || stat.name == 'Secondary Bar'){
            stat.base = "";
            stat.growth = "";
          }
        }
      } else if(newHeroBuffer.resource == 'Secondary Resource'){
        for(let stat in newHeroBuffer.stats){
          if(stat.name == 'Stamina Regen' || stat.name == 'Mana Regen' || stat.name == 'Stamina'){
            stat.base = "";
            stat.growth = "";
          }
        }
      }
      const res = await fetch(`${this.url}/${this.heroId}`, {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(newHeroBuffer),
      });
      const data = await res.json();
      this.$emit("edit-hero", data);
      window.location.href = `/show/${this.heroId}`;
    },
    async fetchCurrentHero() {
      const res = await fetch(`${this.url}/${this.heroId}`);
      const data = await res.json();
      return data;
    },
    // async reloadCover() {
    //   this.src = require(`../assets/loading.gif`);
    //   try {
    //     const res = await fetch(
    //       `http://musicbrainz.org/ws/2/release/?fmt=json&query=${this.newSongInfo.album}%20AND%20artist:${this.newSongInfo.artist}%20AND%20(format:digitalmedia%20OR%20format:cd)`
    //     );
    //     const data = await res.json();
    //     if (data.releases[0]) {
    //       for (let release of data.releases) {
    //         const albumId = release.id;
    //         const res2 = await fetch(
    //           `http://coverartarchive.org/release/${albumId}`
    //         );
    //         if (res2.ok) {
    //           const data2 = await res2.json();
    //           this.coverCode = release.id;
    //           this.src = data2.images[0].thumbnails.large;
    //           break;
    //         }
    //       }
    //     } else {
    //       this.src = require(`../assets/default.jpg`);
    //       alert("Album Cover Not Found");
    //     }
    //   } catch {
    //     this.src = require(`../assets/default.jpg`);
    //   }
    // },
  },
  async created() {
    this.currentHero = await this.fetchCurrentHero();
    console.log(this.newHeroInfo);
    this.loaded = true;
  },
};
</script>