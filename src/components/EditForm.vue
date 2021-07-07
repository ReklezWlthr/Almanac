<template>
  <div class="fixed mt-5 ml-16">
    <div class="w-full">
      <div class="mt-10">
        <img
          :src="src"
          class="rounded-3xl w-56 h-56 object-cover object-center"
        />
        <div class="ml-48 -mt-8 relative">
          <div @click="reloadCover" id="spin" class="h-14 w-14 rounded-full flex flex-wrap justify-center content-center border-darkViolet text-paleViolet cursor-pointer" style="border-width: 1.8rem"
          >
            <i class="fas fa-sync-alt text-2xl"></i>
          </div>
        </div>
      </div>
    </div>
    <div class="flex flex-col gap-y-3 mt-2">
      <div class="text-paleViolet text-xl">
        <span class="font-bold mr-2">Name:</span>
        <input v-model="baseHeroInfo.name" class="input" />
      </div>
      <div class="text-paleViolet text-xl">
        <span class="font-bold mr-2">Title:</span>
        <input v-model="baseHeroInfo.title" class="input" />
      </div>
      <div class="text-paleViolet text-xl">
        <span class="font-bold mr-2">Class:</span>
        <select v-model="baseHeroInfo.class" class="input">
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
      </div>
      <div class="text-paleViolet text-xl">
        <span class="font-bold mr-2">Resource:</span>
        <select v-model="baseHeroInfo.resource" class="input">
          <option class="text-darkViolet" value="Mana">Mana</option>
          <option class="text-darkViolet" value="Stamina">Stamina</option>
          <option class="text-darkViolet" value="N/A">N/A</option>
        </select>
      </div>
      <div class="text-paleViolet text-xl">
        <span class="font-bold mr-2">Range Type:</span>
        <select v-model="baseHeroInfo.attackType" class="input">
          <option class="text-darkViolet" value="Melee">Melee</option>
          <option class="text-darkViolet" value="Ranged">Ranged</option>
        </select>
      </div>
          <button
      @click="$emit('save')"
      class="
        font-bold
        bg-darkViolet
        text-paleViolet text-xl
        px-5
        py-2
        focus:outline-none
        rounded-full
        mx-auto
        mt-2
      "
    >
      Save
    </button>
    </div>
  </div>
  <div class="flex justify-center gap-x-12 mt-10">
    <div class="w-1/6"></div>
    <div>
      <div class="text-paleViolet text-2xl font-bold mb-5">Abilities
        <button
              class="ml-2 mb-2 font-bold text-base px-5 py-1 focus:outline-none rounded-full mx-auto hover:bg-lightPB hover:text-darkPB transition duration-100"
              :class="ability.slot != abilDis ? 'bg-PB text-paleViolet' : 'bg-lightPB text-darkPB'"
              @click="abilDis = ability.slot"
              v-for="ability in baseHeroInfo.abilities"
              :key="ability.name"
            >{{ ability.slot }}</button>
      </div>
      <div
        v-for="ability in baseHeroInfo.abilities"
        :key="ability"
      >
      <div v-if="ability.slot == abilDis" class="relative whitespace-pre-wrap text-paleViolet bg-darkViolet p-5 rounded-xl w-ability overflow-visible mb-5">
        <span
          class="absolute z-10 text-8xl font-black opacity-20 italic right-4 -top-3"
          >{{ ability.slot }}</span
        >
        <div class="flex flex-col pb-2">
          <div class="font-bold text-2xl pr-6">
            <div class="mb-4 mr-4 inline-block">Ability Name</div>
            <input type="text" class="input" v-model="ability.name" />
            <div>
            <button
              v-if="ability.slot != 'P'"
              class="ml-2 mb-2 font-bold bg-PB text-paleViolet text-base px-3 py-1 focus:outline-none rounded-full mx-auto hover:bg-lightPB hover:text-darkPB transition duration-100"
              @click="addSubAbility(ability.slot)"
            >
              Add Sub Ability
            </button>
            <button
              v-if="ability.slot != 'P'"
              class="ml-2 mb-2 font-bold bg-PB text-paleViolet text-base px-3 py-1 focus:outline-none rounded-full mx-auto hover:bg-lightPB hover:text-darkPB transition duration-100"
              @click="addSummon(ability.slot)"
            >
              Add Summoned Unit
            </button>
            </div>
          </div>
          <div class="flex flex-wrap">
            <div
              v-for="(desc, head) in ability.header"
              :key="head"
              class="uppercase px-2 text-sm whitespace-nowrap py-1 w-1/2"
              ><div class="font-bold inline-block w-1/2">{{ head }}</div
              ><QuillEditor
              style="font-family: Dosis; font-size: 0.75rem; height: 2.65rem;"
            class="font-normal bg-lightPB bg-opacity-10 rounded-lg"
            v-model:content="ability.header[head]"
            contentType="html"
            theme="bubble"
          /></div>
          </div>
        </div>
        <div class="py-2 border-t-2">
          <QuillEditor
            style="font-family: Dosis; font-size: 1rem"
            class="text-paleViolet bg-lightPB bg-opacity-10 rounded-lg"
            v-model:content="ability.desc"
            contentType="html"
            theme="bubble"
          />
        </div>
        <div class="pt-2 border-t-2" v-if="ability.slot != 'P'">
          <div class="font-bold text-xl pb-4">
            Scaling
            <button
              class="ml-2 font-bold bg-PB text-paleViolet text-lg px-3 py-1 focus:outline-none rounded-full mx-auto hover:bg-lightPB hover:text-darkPB transition duration-100"
              @click="addScaling(ability.slot)"
            >
              Add New Scaling
            </button>
          </div>
          <div class="grid grid-cols-2 gap-x-5">
          <div v-for="(item, index) in ability.scaling" :key="item" class="pb-3">
            <div class="uppercase font-bold pb-2">
              <div class="w-14 inline-block">Key</div>
              <input type="text" class="input w-2/3 text-sm uppercase" v-model="item.key" />
            </div>
            <div class="font-bold">
              <div class="uppercase inline-block mb-1">Value
                <i v-if="index > 0" class="fas fa-caret-left ml-2 cursor-pointer hover:text-lightViolet transition duration-200" @click="shiftLeft(ability.slot, index)"></i>
                <i v-if="index < ability.scaling.length - 1" class="fas fa-caret-right ml-2 cursor-pointer hover:text-lightViolet transition duration-200"  @click="shiftRight(ability.slot, index)"></i>
                <i class="fas fa-times cursor-pointer ml-2 hover:text-lightViolet transition duration-200"  @click="delScale(ability.slot, index)"></i>
              </div>
              <QuillEditor
              style="font-family: Dosis; font-size: 0.875rem"
            class="text-paleViolet font-normal bg-lightPB bg-opacity-10 rounded-lg"
            v-model:content="item.value"
            contentType="html"
            theme="bubble"
          />
            </div>
          </div>
          </div>
        </div>
        <div v-if="ability.slot != 'P'">
        <div v-for="(subAbility, index) in ability.subAbility" :key="index">
        <div class="flex flex-col py-2 border-t-2">
          <div class="font-bold text-2xl pr-6">
            <div class="mb-4 mr-4 inline-block">Sub Ability Name</div>
            <input type="text" class="input" v-model="subAbility.name" />
          </div>
          <div class="flex flex-wrap">
            <div
              v-for="(desc, head) in subAbility.header"
              :key="head"
              class="uppercase px-2 text-sm whitespace-nowrap py-1 w-1/2"
              ><div class="font-bold inline-block w-1/2">{{ head }}</div
              ><QuillEditor
              style="font-family: Dosis; font-size: 0.75rem; height: 2.65rem;"
            class="text-paleViolet bg-lightPB bg-opacity-10 rounded-lg"
            v-model:content="subAbility.header[head]"
            contentType="html"
            theme="bubble"
          /></div>
          </div>
        </div>
        <div class="py-2 border-t-2">
          <QuillEditor
          style="font-family: Dosis; font-size: 1rem"
            class="text-paleViolet bg-lightPB bg-opacity-10 rounded-lg"
            v-model:content="subAbility.desc"
            contentType="html"
            theme="bubble"
          />
        </div>
        <div class="pt-2 border-t-2">
          <div class="font-bold text-xl pb-4">
            Scaling
            <button
              class="ml-2 font-bold bg-PB text-paleViolet text-lg px-3 py-1 focus:outline-none rounded-full mx-auto hover:bg-lightPB hover:text-darkPB transition duration-100"
              @click="addSubAbilityScaling(ability.slot, index)"
            >
              Add New Scaling
            </button>
          </div>
          <div class="grid grid-cols-2 gap-x-5">
          <div v-for="(item, scaleIndex) in subAbility.scaling" :key="item" class="pb-3">
            <div class="font-bold pb-2">
              <div class="uppercase w-14 inline-block">Key</div>
              <input type="text" class="input w-2/3 text-sm uppercase" v-model="item.key" />
            </div>
            <div class="font-bold">
              <div class="inline-block mb-1">Value
                <i v-if="scaleIndex > 0" class="fas fa-caret-left ml-2 cursor-pointer hover:text-lightViolet transition duration-200" @click="shiftLeftSub(ability.slot, index, scaleIndex)"></i>
                <i v-if="scaleIndex < ability.scaling.length - 1" class="fas fa-caret-right ml-2 cursor-pointer hover:text-lightViolet transition duration-200"  @click="shiftRightSub(ability.slot, index, scaleIndex)"></i>
                <i class="fas fa-times cursor-pointer ml-2 hover:text-lightViolet transition duration-200"  @click="delScaleSub(ability.slot, index, scaleIndex)"></i>
              </div>
              <QuillEditor
              style="font-family: Dosis; font-size: 0.875rem"
            class="text-paleViolet font-normal bg-lightPB bg-opacity-10 rounded-lg"
            v-model:content="item.value"
            contentType="html"
            theme="bubble"
          />
            </div>
          </div>
          </div>
        </div>
        </div>
        </div>
        <div v-for="unit in ability.summon" :key="unit">
        <div class="flex flex-col py-2 border-t-2">
          <div class="font-bold text-2xl pr-6">
            <div class="mb-4 mr-4 inline-block">Unit Name</div>
            <input type="text" class="input" v-model="unit.name" />
          </div>
          <div class="flex flex-wrap">
            <div
              v-for="(desc, head) in unit.header"
              :key="head"
              class="px-2 text-sm whitespace-nowrap py-1 w-1/2"
              ><div class="font-bold inline-block w-1/2 uppercase">{{ head }}</div
              ><QuillEditor
              style="font-family: Dosis; font-size: 0.75rem; height: 2.65rem;"
            class="text-paleViolet bg-lightPB bg-opacity-10 rounded-lg"
            v-model:content="unit.header[head]"
            contentType="html"
            theme="bubble"
          /></div>
          </div>
        </div>
        <div class="py-2 border-t-2">
          <QuillEditor
          style="font-family: Dosis; font-size: 1rem"
            class="text-paleViolet bg-lightPB bg-opacity-10 rounded-lg"
            v-model:content="unit.desc"
            contentType="html"
            theme="bubble"
          />
        </div>
        </div>
        </div>
      </div>
    </div>
    <div class="w-stat">
      <div class="text-paleViolet text-2xl font-bold mb-5">Base Statistics</div>
      <div
        class="flex flex-wrap gap-y-1 overflow-auto bg-darkViolet rounded-xl py-3"
      >
        <div v-for="stat in baseHeroInfo.stats" :key="stat" class="text-paleViolet text-sm uppercase" :class="{'w-1/2': !((baseHeroInfo.resource == 'Mana' && (stat.name == 'Stamina' || stat.name == 'Stamina Regen' || stat.name == 'Secondary Bar')) || (baseHeroInfo.resource == 'Stamina' && (stat.name == 'Mana' || stat.name == 'Mana Regen' || stat.name == 'Secondary Bar')) || (baseHeroInfo.resource == 'N/A' && (stat.name == 'Stamina' || stat.name == 'Stamina Regen' || stat.name == 'Mana Regen')))}">
        <div 
        v-if="!((baseHeroInfo.resource == 'Mana' && (stat.name == 'Stamina' || stat.name == 'Stamina Regen' || stat.name == 'Secondary Bar')) || (baseHeroInfo.resource == 'Stamina' && (stat.name == 'Mana' || stat.name == 'Mana Regen' || stat.name == 'Secondary Bar')) || (baseHeroInfo.resource == 'N/A' && (stat.name == 'Stamina' || stat.name == 'Stamina Regen' || stat.name == 'Mana Regen')))"
        class="flex flex-col gap-y-3 px-4 py-2 font-bold">
              <div class="flex"><img :src="getIcon(stat.name)" class="w-4 h-4 mr-2"/>{{ stat.name }}:</div>
              <div class="grid grid-cols-2 gap-x-3">
              <div>Base: <input type="text" v-model="stat.base" class="input" :class="{'w-full': stat.name != 'Range' && stat.name != 'Move Speed' && stat.name != 'Crit Damage' && stat.name != 'Secondary Bar'}" /></div>
              <div v-if="stat.name != 'Range' && stat.name != 'Move Speed' && stat.name != 'Crit Damage' && stat.name != 'Secondary Bar'">Growth: <input type="text" v-model="stat.growth" class="input w-full" /></div>
              </div>
        </div>
        </div>
      </div>
      <div class="text-paleViolet text-2xl font-bold my-5"><img :src="getIcon('Attack Speed')" class="inline w-5 h-5 mr-3 -mt-1"/>Attack Speed</div>
      <div
        class="flex flex-wrap gap-y-1 h-26 overflow-auto bg-darkViolet rounded-xl py-3"
      >
        <div v-for="stat in baseHeroInfo.attackSpeed" :key="stat" class="text-paleViolet text-sm uppercase w-1/2 flex flex-wrap px-4 py-2">
          <div class="font-bold mb-1">{{ stat.name }}</div>: <input type="text" v-model="stat.base" class="input w-full"/>
        </div>
      </div>
      <div class="text-paleViolet text-2xl font-bold my-5">Ratings</div>
      <div
        class="flex flex-wrap gap-y-1 justify-around h-26 overflow-auto bg-darkViolet rounded-xl py-3"
      >
        <div v-for="stat in baseHeroInfo.ratings" :key="stat" class="text-paleViolet w-1/10 font-bold text-sm uppercase -ml-4 py-2">
          <div class="inline-block w-1/6">{{ stat.name }}</div>
          <div>
          <select v-model="stat.base" class="input">
          <option class="text-darkViolet" value="1">1</option>
          <option class="text-darkViolet" value="2">2</option>
          <option class="text-darkViolet" value="3">3</option>
        </select>
        </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["newHeroInfo", "src"],
  data() {
    return {
      baseHeroInfo: this.newHeroInfo,
      abilDis: 'P'
    };
  },
  methods: {
    // reloadCover() {
    //   this.$emit("reload-cover");
    // },
    addScaling(slot){
      for(let ability of this.baseHeroInfo.abilities){
        if(ability.slot == slot){
          ability.scaling.push({key: "", value: ""});
          console.log(ability)
        }
      }
    },
    addSubAbility(slot){
      for(let ability of this.baseHeroInfo.abilities){
        if(ability.slot == slot){
          ability.subAbility.push({
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
            "scaling": []
          });
          console.log(ability)
        }
      }
    },
    addSummon(slot){
      for(let ability of this.baseHeroInfo.abilities){
        if(ability.slot == slot){
          if(!ability.summon){
            ability.summon = [];
          }
          ability.summon.push({
            "header": {
              "health": "<span style=\"color: rgb(76, 175, 80);\">-</span>",
              "attack damage": "<span style=\"color: rgb(255, 189, 0);\">-</span>",
              "attack speed": "<span style=\"color: rgb(244, 67, 54);\">-</span>",
              "critical strike chance": "<span style=\"color: rgb(229, 102, 43);\">-</span>",
              "armor": "<span style=\"color: rgb(255, 235, 59);\">-</span>",
              "magic resistance": "<span style=\"color: rgb(233, 48, 233);\">-</span>",
              "movement speed": "<span style=\"color: rgb(243, 229, 171);\">-</span>",
              "range": "-",
              "lifespan": "-",
            },
            "name": "",
            "desc": ""
          });
          console.log(ability)
        }
      }
    },
    addSubAbilityScaling(slot, index){
      for(let ability of this.baseHeroInfo.abilities){
        if(ability.slot == slot){
          ability.subAbility[index].scaling.push({key: "", value: ""});
          console.log(ability.subAbility)
        }
      }
    },
    getIcon(head){
      return head == 'Secondary Bar' ? require(`../../public/icons/mana regen.png`) : require(`../../public/icons/${head.toLowerCase()}.png`);
    },
    shiftLeft(slot, index) {
      for(let ability of this.baseHeroInfo.abilities){
        if(ability.slot == slot){
          let buffer = ability.scaling[index];
          ability.scaling[index] = ability.scaling[index - 1];
          ability.scaling[index - 1] = buffer;
        }
      }
    },
    shiftRight(slot, index) {
      for(let ability of this.baseHeroInfo.abilities){
        if(ability.slot == slot){
          let buffer = ability.scaling[index];
          ability.scaling[index] = ability.scaling[index + 1];
          ability.scaling[index + 1] = buffer;
        }
      }
    },
    delScale(slot, index){
      for(let ability of this.baseHeroInfo.abilities){
        if(ability.slot == slot){
          ability.scaling.splice(index, 1);
        }
      }
    },
    shiftLeftSub(slot, index, scaleIndex) {
      for(let ability of this.baseHeroInfo.abilities){
        if(ability.slot == slot){
          let buffer = ability.subAbility[index].scaling[scaleIndex];
          ability.subAbility[index].scaling[scaleIndex] = ability.subAbility[index].scaling[scaleIndex - 1];
          ability.subAbility[index].scaling[scaleIndex - 1] = buffer;
        }
      }
    },
    shiftRightSub(slot, index, scaleIndex) {
      for(let ability of this.baseHeroInfo.abilities){
        if(ability.slot == slot){
          let buffer = ability.subAbility[index].scaling[scaleIndex];
          ability.subAbility[index].scaling[scaleIndex] = ability.subAbility[index].scaling[scaleIndex + 1];
          ability.subAbility[index].scaling[scaleIndex + 1] = buffer;
        }
      }
    },
    delScaleSub(slot, index, scaleIndex){
      for(let ability of this.baseHeroInfo.abilities){
        if(ability.slot == slot){
          ability.subAbility[index].scaling.splice(scaleIndex, 1);
        }
      }
    }
  },
  created() {
    for (let ability of this.baseHeroInfo.abilities) {
      ability.desc = decodeURIComponent(ability.desc);
      for (let head in ability.header) {
          ability.header[head] = decodeURIComponent(ability.header[head]);
        }
      if (ability.scaling) {
        for (let item of ability.scaling) {
          item.value = decodeURIComponent(item.value);
        }
      }
      if(ability.slot != 'P'){
        for(let subAbility of ability.subAbility){
          subAbility.desc = decodeURIComponent(subAbility.desc);
          for (let head in subAbility.header) {
          subAbility.header[head] = decodeURIComponent(subAbility.header[head]);
        }
          if (subAbility.scaling) {
          for (let item of subAbility.scaling) {
            item.value = decodeURIComponent(item.value);
          }
      }
        }
      }
      if(ability.summon){
          for (let unit of ability.summon) {
          for (let head in unit.header) {
          unit.header[head] = decodeURIComponent(unit.header[head]);
        }
        unit.desc = decodeURIComponent(unit.desc);
        }
        }
    }
  },
};
</script>

<style scoped>
@keyframes spin {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}

#spin:hover {
  animation: spin 1s;
}
</style>
