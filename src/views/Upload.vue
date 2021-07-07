<template>
  <edit-form
    :new-hero-info="newHero"
    :src="src"
    @reload-cover="reloadCover"
    @save="upload"
  />
</template>

<script>
export default {
  data() {
    return {
      newHero:     {
      "name": "",
      "title": "",
      "resource": "Mana",
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
          "name": "Health Regen",
          "base": "",
          "growth": ""
        },
        {
          "name": "Mana Regen",
          "base": "",
          "growth": ""
        },
        {
          "name": "Stamina Regen",
          "base": "",
          "growth": ""
        },
        {
          "name": "Secondary Bar",
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
          "name": "Magic Resist",
          "base": "",
          "growth": ""
        },
        {
          "name": "Crit Damage",
          "base": "175%"
        },
        {
          "name": "Move Speed",
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
            "collision radius": "",
            "effect radius": "",
            "tether radius": "",
            "width": "",
            "angle": "",
            "speed": "",
            "cast time": "",
            "cost": "",
            "cooldown": "",
            "static cooldown": "",
            "recharge": "",
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
            "collision radius": "",
            "effect radius": "",
            "tether radius": "",
            "width": "",
            "angle": "",
            "speed": "",
            "cast time": "",
            "cost": "",
            "cooldown": "",
            "static cooldown": "",
            "recharge": "",
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
            "collision radius": "",
            "effect radius": "",
            "tether radius": "",
            "width": "",
            "angle": "",
            "speed": "",
            "cast time": "",
            "cost": "",
            "cooldown": "",
            "static cooldown": "",
            "recharge": "",
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
            "collision radius": "",
            "effect radius": "",
            "tether radius": "",
            "width": "",
            "angle": "",
            "speed": "",
            "cast time": "",
            "cost": "",
            "cooldown": "",
            "static cooldown": "",
            "recharge": "",
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
            "collision radius": "",
            "effect radius": "",
            "tether radius": "",
            "width": "",
            "angle": "",
            "speed": "",
            "cast time": "",
            "cost": "",
            "cooldown": "",
            "static cooldown": "",
            "recharge": "",
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
  emits: ["edit-hero",
    "upload-hero",
    "display-hero",
    "launch-edit-page",
    "delete-hero",],
    props: ['url'],
  methods: {
    async upload() {
        const newHeroBuffer = JSON.parse(JSON.stringify(this.newHero));
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
        if(ability.summon){
          for (let unit of ability.summon) {
          for (let head in unit.header) {
          unit.header[head] = encodeURIComponent(unit.header[head]);
        }
        unit.desc = encodeURIComponent(unit.desc);
        }
        }
      }
      if(newHeroBuffer.resource == 'Mana'){
        for(let stat of newHeroBuffer.stats){
          if(stat.name == 'Stamina' || stat.name == 'Stamina Regen' || stat.name == 'Secondary Bar'){
            stat.base = "";
            stat.growth = "";
          }
        }
      } else if(newHeroBuffer.resource == 'Stamina'){
        for(let stat of newHeroBuffer.stats){
          if(stat.name == 'Mana' || stat.name == 'Mana Regen' || stat.name == 'Secondary Bar'){
            stat.base = "";
            stat.growth = "";
          }
        }
      } else if(newHeroBuffer.resource == 'N/A'){
        for(let stat of newHeroBuffer.stats){
          if(stat.name == 'Stamina Regen' || stat.name == 'Mana Regen' || stat.name == 'Stamina'){
            stat.base = "";
            stat.growth = "";
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
