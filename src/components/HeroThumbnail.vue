<template>
  <div class="flex py-3 px-6 cursor-pointer transition duration-150 rounded-lg hover:bg-PB" @click="showHero">
    <div>
      <img class="rounded-3xl w-24 h-24 object-cover object-center" src="../assets/default.jpg" />
    </div>
    <div class="pl-3 pt-2">
      <ul class="text-paleViolet">
        <li
          class="font-semibold text-lg w-36 preventOverflow"
        >
          {{ hero.name }}
        </li>
        <li class="w-36 preventOverflow">
          {{ hero.title }}
        </li>
        <li class="w-36 preventOverflow">
          {{ hero.class }} &#8226; {{ hero.attackType }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  props: ["hero"],
  emits: ["show-hero"],
  methods: {
    showHero() {
      this.$emit("show-hero", this.hero.id);
    },
  }
};
</script>