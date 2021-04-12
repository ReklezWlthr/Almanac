<template>
  <div @click="showSong" class="w-thumb flex py-3 px-6 cursor-pointer hover:bg-darkPB rounded-lg transition duration-100">
    <div>
      <img class="rounded-3xl w-24 h-24" :src="coverId" />
    </div>
    <div class="pl-3 pt-2">
      <ul class="text-paleViolet">
        <li class="font-semibold text-lg">{{ song.title.length >= 25 ? song.title.slice(0,25) + `...` : song.title }}</li>
        <li>{{ song.artist.length >= 25 ? song.artist.slice(0,25) + `...` : song.artist }}</li>
        <li>{{ song.album.length >= 25 ? song.album.slice(0,25) + `...` : song.album }}</li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      coverId: ""
    };
  },
  props: ["song"],
  emits: ['show-song'],
  methods: {
    showSong(){
        this.$emit("show-song", this.song.id);
    }
  },
  async created() {
    this.coverId = `/img/loading.729f0a14.gif`;
    const res2 = await fetch(
      `http://coverartarchive.org/release/${this.song.coverCode}`
    );
    if (res2.ok) {
      const data2 = await res2.json();
      this.coverId = data2.images[0].thumbnails.small;
    } else {
        this.coverId = `/img/default.bc1ffa9c.jpg`;
    }
  },
};
</script>