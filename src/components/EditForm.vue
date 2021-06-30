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
        class="relative whitespace-pre-wrap text-paleViolet bg-darkViolet p-5 rounded-xl w-ability overflow-auto mb-5"
        v-for="ability in baseHeroInfo.abilities"
        :key="ability.name"
      >
        <span
          class="absolute z-10 text-8xl font-black opacity-20 italic right-4 -top-3"
          >{{ ability.slot }}</span
        >
        <div class="flex flex-col pb-2">
          <div class="font-bold text-2xl pr-6">
            <div class="mb-4 mr-4 inline-block">Ability Name</div>
            <input class="input" v-model="ability.name" />
          </div>
          <div class="flex flex-wrap">
            <span
              v-for="(desc, head) in ability.header"
              :key="head"
              class="uppercase px-2 text-sm whitespace-nowrap py-1 inline-block w-1/2"
              ><span class="font-bold inline-block w-1/2">{{ head }}</span
              ><input
                type="text"
                class=" rounded-3xl w-2/5 bg-paleViolet focus:outline-none text-sm font-semibold text-darkViolet px-2 py-1"
                v-model="ability.header[head]"
            /></span>
          </div>
        </div>
        <div class="py-2 border-t-2">
          <QuillEditor
            style="font-family: Dosis"
            class="text-paleViolet"
            v-model:content="ability.desc"
            contentType="html"
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
          <div class="flex flex-wrap">
          <div v-for="item in ability.scaling" :key="item" class="w-1/2 pb-3">
            <div class="uppercase font-bold pb-2">
              <div class="w-14 inline-block">Key</div>
              <input type="text" class="rounded-3xl bg-paleViolet focus:outline-none text-sm font-semibold text-darkViolet px-2 py-1" v-model="item.key" />
            </div>
            <div class="uppercase font-bold">
              <div class="w-14 inline-block">Value</div>
              <input type="text" class="rounded-3xl bg-paleViolet focus:outline-none text-sm font-semibold text-darkViolet px-2 py-1" v-model="item.value" />
            </div>
          </div>
          </div>
        </div>
        <div v-if="ability.slot != 'P'" class="flex flex-col py-2 border-t-2">
          <div class="font-bold text-2xl pr-6">
            <div class="mb-4 mr-4 inline-block">Sub Ability Name</div>
            <input type="text" class="input" v-model="ability.subAbility.name" />
          </div>
          <div class="flex flex-wrap">
            <span
              v-for="(desc, head) in ability.subAbility.header"
              :key="head"
              class="uppercase px-2 text-sm whitespace-nowrap py-1 inline-block w-1/2"
              ><span class="font-bold inline-block w-1/2">{{ head }}</span
              ><input
                type="text"
                class=" rounded-3xl w-2/5 bg-paleViolet focus:outline-none text-sm font-semibold text-darkViolet px-2 py-1"
                v-model="ability.subAbility.header[head]"
            /></span>
          </div>
        </div>
        <div v-if="ability.slot != 'P'" class="py-2 border-t-2">
          <QuillEditor
            style="font-family: Dosis"
            class="text-paleViolet"
            v-model:content="ability.subAbility.desc"
            contentType="html"
          />
        </div>
        <div class="pt-2 border-t-2" v-if="ability.slot != 'P'">
          <div class="font-bold text-xl pb-4">
            Scaling
            <button
              class="ml-2 font-bold bg-PB text-paleViolet text-lg px-3 py-1 focus:outline-none rounded-full mx-auto hover:bg-lightPB hover:text-darkPB transition duration-100"
              @click="addSubAbilityScaling(ability.slot)"
            >
              Add New Scaling
            </button>
          </div>
          <div class="flex flex-wrap">
          <div v-for="item in ability.subAbility.scaling" :key="item" class="w-1/2 pb-3">
            <div class="uppercase font-bold pb-2">
              <div class="w-14 inline-block">Key</div>
              <input type="text" class="rounded-3xl bg-paleViolet focus:outline-none text-sm font-semibold text-darkViolet px-2 py-1" v-model="item.key" />
            </div>
            <div class="uppercase font-bold">
              <div class="w-14 inline-block">Value</div>
              <input type="text" class="rounded-3xl bg-paleViolet focus:outline-none text-sm font-semibold text-darkViolet px-2 py-1" v-model="item.value" />
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
    addSubAbilityScaling(slot){
      for(let ability of this.baseHeroInfo.abilities){
        if(ability.slot == slot){
          ability.subAbility.scaling.push({key: "", value: ""});
          console.log(ability.subAbility)
        }
      }
    }
  },
  created() {
    for (let ability of this.baseHeroInfo.abilities) {
      ability.desc = decodeURIComponent(ability.desc);
      if (ability.scaling) {
        for (let item of ability.scaling) {
          item.value = decodeURIComponent(item.value);
        }
      }
      if(ability.slot != 'P'){
      ability.subAbility.desc = decodeURIComponent(ability.subAbility.desc);
      if (ability.subAbility.scaling) {
        for (let item of ability.subAbility.scaling) {
          item.value = decodeURIComponent(item.value);
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
