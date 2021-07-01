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
        <select v-model="baseHeroInfo.class" class="text-darkViolet focus:outline-none rounded-3xl px-2 py-2 font-semibold text-base">
          <option value="Assassin">Assassin</option>
          <option value="Duelist">Duelist</option>
          <option value="Berserker">Berserker</option>
          <option value="Bruiser">Bruiser</option>
          <option value="Burst">Burst</option>
          <option value="Battlemage">Battlemage</option>
          <option value="Arcanist">Arcanist</option>
          <option value="Guardian">Guardian</option>
          <option value="Warlord">Warlord</option>
          <option value="Enchanter">Enchanter</option>
          <option value="Controller">Controller</option>
          <option value="Marksman">Marksman</option>
          <option value="Specialist">Specialist</option>
        </select>
      </div>
      <div class="text-paleViolet text-xl">
        <span class="font-bold mr-2">Resource:</span>
        <select v-model="baseHeroInfo.resource" class="text-darkViolet focus:outline-none rounded-3xl px-2 py-2 font-semibold text-base">
          <option value="Mana">Mana</option>
          <option value="Stamina">Stamina</option>
          <option value="N/A">N/A</option>
        </select>
      </div>
      <div class="text-paleViolet text-xl">
        <span class="font-bold mr-2">Range Type:</span>
        <select v-model="baseHeroInfo.attackType" class="text-darkViolet focus:outline-none rounded-3xl px-2 py-2 font-semibold text-base">
          <option value="Melee">Melee</option>
          <option value="Range">Range</option>
        </select>
      </div>
    </div>
  </div>
  <div class="flex justify-center gap-x-12">
    <div class="w-1/4 mt-5 ml-12">
      <div class="text-paleViolet text-2xl font-bold mb-5">Abilities</div>
      <div
        class="relative text-paleViolet bg-darkViolet p-5 rounded-xl w-ability overflow-visible mb-5"
        v-for="ability in baseHeroInfo.abilities"
        :key="ability"
      >
        <span
          class="absolute z-10 text-8xl font-black opacity-20 italic right-4 -top-3"
          >{{ ability.slot }}</span
        >
        <div class="flex flex-col pb-2">
          <div class="font-bold text-2xl pr-6">
            <div class="mb-4 mr-4 inline-block">Ability Name</div>
            <input type="text" class="input" v-model="ability.name" />
            <button
              v-if="ability.slot != 'P'"
              class="ml-2 mb-2 font-bold bg-PB text-paleViolet text-base px-3 py-1 focus:outline-none rounded-full mx-auto hover:bg-lightPB hover:text-darkPB transition duration-100"
              @click="addSubAbility(ability.slot)"
            >
              Add Sub Ability
            </button>
          </div>
          <div class="flex flex-wrap">
            <div
              v-for="(desc, head) in ability.header"
              :key="head"
              class="uppercase px-2 text-sm whitespace-nowrap py-1 w-1/2"
              ><div class="font-bold inline-block w-1/2">{{ head }}</div
              ><QuillEditor
              style="font-family: Dosis; font-size: 0.75rem; height: 2.65rem;"
            class="text-paleViolet font-normal bg-lightPB bg-opacity-10 rounded-lg"
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
          <div v-for="item in ability.scaling" :key="item" class="pb-3">
            <div class="uppercase font-bold pb-2">
              <div class="w-14 inline-block">Key</div>
              <input type="text" class="input w-2/3 text-sm" v-model="item.key" />
            </div>
            <div class="font-bold">
              <div class="uppercase w-14 inline-block mb-1">Value</div>
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
            class="text-paleViolet font-normal bg-lightPB bg-opacity-10 rounded-lg"
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
          <div v-for="item in subAbility.scaling" :key="item" class="pb-3">
            <div class="font-bold pb-2">
              <div class="uppercase w-14 inline-block">Key</div>
              <input type="text" class="input w-2/3 text-sm" v-model="item.key" />
            </div>
            <div class="uppercase font-bold">
              <div class="w-14 inline-block mb-1">Value</div>
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
      </div>
    </div>
    <div class="mt-4">
    </div>
  </div>
</template>

<script>
export default {
  props: ["newHeroInfo", "src"],
  data() {
    return {
      baseHeroInfo: this.newHeroInfo,
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
            "scaling": []
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
    }
  },
  created() {
    for (let ability of this.baseHeroInfo.abilities) {
      ability.desc = decodeURIComponent(ability.desc);
      for (let head in ability.header) {
        console.log(ability.header[head])
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
            console.log(item)
          }
      }
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
