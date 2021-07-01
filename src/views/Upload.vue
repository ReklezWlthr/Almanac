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
          "base": null,
          "growth": null
        },
        {
          "name": "Mana",
          "base": null,
          "growth": null
        },
        {
          "name": "Stamina",
          "base": null,
          "growth": null
        },
        {
          "name": "Health Regeneration",
          "base": null,
          "growth": null
        },
        {
          "name": "Mana Regeneration",
          "base": null,
          "growth": null
        },
        {
          "name": "Stamina Regeneration",
          "base": null,
          "growth": null
        },
        {
          "name": "Secondary Resource",
          "base": null,
          "growth": null
        },
        {
          "name": "Armor",
          "base": null,
          "growth": null
        },
        {
          "name": "Attack Damage",
          "base": null,
          "growth": null
        },
        {
          "name": "Magic Resistance",
          "base": null,
          "growth": null
        },
        {
          "name": "Critical Strike Damage",
          "base": "175%"
        },
        {
          "name": "Movement Speed",
          "base": null
        },
        {
          "name": "Range",
          "base": null
        }
      ],
      "attackSpeed": [
        {
          "name": "Base Attack Speed",
          "base": null
        },
        {
          "name": "Missile Speed",
          "base": ""
        },
        {
          "name": "Attack Speed Ratio",
          "base": ""
        },
        {
          "name": "Bonus Attack Speed",
          "base": null
        }
      ],
      "ratings": [
        {
          "name": "Damage",
          "base": null
        },
        {
          "name": "Toughness",
          "base": null
        },
        {
          "name": "Control",
          "base": null
        },
        {
          "name": "Mobility",
          "base": null
        },
        {
          "name": "Utility",
          "base": null
        },
        {
          "name": "Difficulty",
          "base": null
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
