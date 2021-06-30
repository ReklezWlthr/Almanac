<template>
  <edit-form
    v-if="loaded"
    :new-hero-info="currentHero"
    :src="src"
    :lyrics="lyrics"
    @reload-cover="reloadCover"
    @forward-value="updateValue"
  />
  <div v-if="loaded" class="w-full flex mt-4">
    <button
      @click="edit"
      class="
        font-bold
        bg-darkViolet
        text-paleViolet text-xl
        px-5
        py-3
        focus:outline-none
        rounded-full
        mx-auto
      "
    >
      Save
    </button>
  </div>
</template>

<script>
export default {
  emits: [
    "edit-song",
    "upload-song",
    "display-song",
    "launch-edit-page",
    "delete-song",
  ],
  data() {
    return {
      heroId: this.$route.params.id,
      currentHero: {},
      src: require(`../assets/default.jpg`),
      loaded: false,
    };
  },
  props: ["songList", "url"],
  methods: {
    updateValue(lyrics) {
      this.lyrics = lyrics;
    },
    async edit() {
      const newHeroBuffer = JSON.parse(JSON.stringify(this.currentHero));
      for (let ability of newHeroBuffer.abilities) {
        ability.desc = encodeURIComponent(ability.desc);
        for (let head in ability.header) {
          ability.header[head] = ability.header[head].toUpperCase();
        }
        if (ability.scaling) {
          for (let item of ability.scaling) {
            item.key = item.key.toUpperCase();
            item.value = encodeURIComponent(item.value);
          }
        }
        if(ability.slot != 'P'){
        ability.subAbility.desc = encodeURIComponent(ability.subAbility.desc);
        for (let head in ability.subAbility.header) {
          ability.subAbility.header[head] = ability.subAbility.header[head].toUpperCase();
        }
        if (ability.subAbility.scaling) {
          for (let item of ability.subAbility.scaling) {
            item.key = item.key.toUpperCase();
            item.value = encodeURIComponent(item.value);
          }
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