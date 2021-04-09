<template>
  <div class="w-thumb flex py-3 px-6">
    <div>
      <img
        class="rounded-3xl w-36 h-36 cursor-pointer"
        :src="src"
      />
    </div>
    <div class="pl-3 pt-2">
        <ul class="text-paleViolet">
          <li class="font-semibold text-lg">{{ song.title }}</li>
          <li>{{ song.artist }}</li>
          <li>{{ song.album }}</li>
          <li><i @click="like(song)" class="transition duration-150 cursor-pointer fas fa-heart text-2xl pt-2" :class="song.liked ? 'text-red-500' : 'text-red-200 opacity-25'"></i></li>
        </ul>
    </div>
  </div>
</template>

<script>
export default {
    data(){
        return {

        }
    },
  props: ["song"],
  emits: ["like-song"],
  methods: {
      like(song){
          song.liked = !song.liked;
          this.$emit("like-song", song);
      }
  },
  computed: {
      src(){
          try{
              return require(`../assets/albumArts/${this.song.album}.jpg`)
          } catch {
              return require(`../assets/albumArts/default.jpg`)
          }
      }
  }
};
</script>