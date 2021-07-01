<template>
  <edit-form
    :new-hero-info="newHero"
    :src="src"
    @reload-cover="reloadCover"
  />
  <div class="w-full flex mt-4">
    <button
      @click="upload"
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
      Upload
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
      newHero:     {
      "name": "",
      "title": "",
      "resource": "",
      "attackType": "",
      "class": "",
      "stats": [
        {
          "name": "Health",
          "base": "",
          "growth": ""
        },
        {
          "name": "Mana",
          "base": "",
          "growth": ""
        },
        {
          "name": "Stamina",
          "base": "",
          "growth": ""
        },
        {
          "name": "Health Regeneration",
          "base": "",
          "growth": ""
        },
        {
          "name": "Mana Regeneration",
          "base": "",
          "growth": ""
        },
        {
          "name": "Stamina Regeneration",
          "base": "",
          "growth": ""
        },
        {
          "name": "Secondary Resource",
          "base": ""
        },
        {
          "name": "Armor",
          "base": "",
          "growth": ""
        },
        {
          "name": "Attack Damage",
          "base": "",
          "growth": ""
        },
        {
          "name": "Magic Resistance",
          "base": "",
          "growth": ""
        },
        {
          "name": "Critical Strike Damage",
          "base": "175%"
        },
        {
          "name": "Movement Speed",
          "base": ""
        },
        {
          "name": "Range",
          "base": ""
        }
      ],
      "attackSpeed": [
        {
          "name": "Base Attack Speed",
          "base": ""
        },
        {
          "name": "Missile Speed",
          "base": "N/A"
        },
        {
          "name": "Attack Speed Ratio",
          "base": "N/A"
        },
        {
          "name": "Bonus Attack Speed",
          "base": ""
        }
      ],
      "ratings": [
        {
          "name": "Damage",
          "base": ""
        },
        {
          "name": "Toughness",
          "base": ""
        },
        {
          "name": "Control",
          "base": ""
        },
        {
          "name": "Mobility",
          "base": ""
        },
        {
          "name": "Utility",
          "base": ""
        },
        {
          "name": "Difficulty",
          "base": ""
        }
      ],
      "abilities": [
        {
          "slot": "P",
          "header": {
            "range": "",
            "target range": "",
            "effect radius": "",
            "tether radius": "",
            "width": "",
            "angle": "",
            "speed": "",
            "cast time": "",
            "cost": "",
            "cooldown": "",
            "static cooldown": "",
            "target immunity": ""
          },
          "name": "",
          "desc": ""
        },
        {
          "slot": "Q",
          "header": {
            "range": "",
            "target range": "",
            "effect radius": "",
            "tether radius": "",
            "width": "",
            "angle": "",
            "speed": "",
            "cast time": "",
            "cost": "",
            "cooldown": "",
            "static cooldown": "",
            "target immunity": ""
          },
          "name": "",
          "desc": "",
          "scaling": [],
          "subAbility": []
        },
        {
          "slot": "W",
          "header": {
            "range": "",
            "target range": "",
            "effect radius": "",
            "tether radius": "",
            "width": "",
            "angle": "",
            "speed": "",
            "cast time": "",
            "cost": "",
            "cooldown": "",
            "static cooldown": "",
            "target immunity": ""
          },
          "name": "",
          "desc": "",
          "scaling": [],
          "subAbility": []
        },
        {
          "slot": "E",
          "header": {
            "range": "",
            "target range": "",
            "effect radius": "",
            "tether radius": "",
            "width": "",
            "angle": "",
            "speed": "",
            "cast time": "",
            "cost": "",
            "cooldown": "",
            "static cooldown": "",
            "target immunity": ""
          },
          "name": "",
          "desc": "",
          "scaling": [],
          "subAbility": []
        },
        {
          "slot": "R",
          "header": {
            "range": "",
            "target range": "",
            "effect radius": "",
            "tether radius": "",
            "width": "",
            "angle": "",
            "speed": "",
            "cast time": "",
            "cost": "",
            "cooldown": "",
            "static cooldown": "",
            "target immunity": ""
          },
          "name": "",
          "desc": "",
          "scaling": [],
          "subAbility": []
        }
      ]
    },
      src: require(`../assets/default.jpg`),
    };
  },
  props: ["songList", "url"],
  methods: {
    async upload() {
        const newHeroBuffer = JSON.parse(JSON.stringify(this.newHero));
        for (let ability of newHeroBuffer.abilities) {
        ability.desc = encodeURIComponent(ability.desc);
        for (let head in ability.header) {
          ability.header[head] = ability.header[head].toUpperCase();
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
        subAbility.desc = encodeURIComponent(ability.subAbility.desc);
        for (let head in subAbility.header) {
          subAbility.header[head] = subAbility.header[head].toUpperCase();
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
          if(stat.name == 'Stamina' || stat.name == 'Stamina Regeneration' || stat.name == 'Secondary Resource'){
            stat.base = null;
            stat.growth = null;
          }
        }
      } else if(newHeroBuffer.resource == 'Stamina'){
        for(let stat in newHeroBuffer.stats){
          if(stat.name == 'Mana' || stat.name == 'Mana Regeneration' || stat.name == 'Secondary Resource'){
            stat.base = null;
            stat.growth = null;
          }
        }
      } else if(newHeroBuffer.resource == 'Secondary Resource'){
        for(let stat in newHeroBuffer.stats){
          if(stat.name == 'Stamina Regeneration' || stat.name == 'Mana Regeneration' || stat.name == 'Stamina'){
            stat.base = null;
            stat.growth = null;
          }
        }
      }
        const res = await fetch(this.url, {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify(newHeroBuffer),
        });
        const data = res.json();
        this.$emit("upload-hero", data);
        window.location.href = "/";
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
    //           console.log(this.coverCode);
    //           break;
    //         }
    //       }
    //     } else {
    //       this.src = require(`../assets/default.jpg`);
    //       alert("Album Cover Not Found");
    //     }
    //   } catch {
    //     this.src = require(`../assets/default.jpg`);
    //     alert("Album Cover Fetch Error!");
    //   }
    // },
  },
};
</script>
