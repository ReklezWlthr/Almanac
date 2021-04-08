<template>
  <div class="flex py-3 px-6">
    <div>
      <img
        class="rounded-3xl w-36"
        :src="require(`../assets/albumArts/${song.artist}-${song.name}.jpg`)"
      />
    </div>
    <div class="pl-3 pt-2">
        <ul class="text-paleViolet">
          <li class="font-semibold text-2xl">{{ song.name }}</li>
          <li>{{ song.artist }}</li>
          <li>{{ song.album }}</li>
          <li @click="like(song)"><i :class="song.liked ? likeClass : dislikeClass "></i></li>
        </ul>
    </div>
  </div>
</template>

<script>
export default {
    data(){
        return {
            likeClass: "fas fa-heart text-red-500 text-2xl pt-2",
            dislikeClass: "fas fa-heart text-red-200 text-2xl pt-2 opacity-25"
        }
    },
  props: ["song"],
  emits: ["like-song"],
  methods: {
      like(song){
          song.liked = !song.liked;
          this.$emit("like-song", song);
      }
  }
};
</script>