<template>
  <div class="w-thumb flex py-3 px-6">
    <div>
      <img @click="showSong" class="rounded-3xl w-36 h-36 cursor-pointer" :src="coverId" />
    </div>
    <div class="pl-3 pt-2">
      <ul class="text-paleViolet">
        <li class="font-semibold text-lg">{{ song.title }}</li>
        <li>{{ song.artist }}</li>
        <li>{{ song.album }}</li>
        <li v-if="likeable">
          <i
            @click="like(song)"
            class="transition duration-150 cursor-pointer fas fa-heart text-2xl pt-2"
            :class="song.liked ? 'text-red-500' : 'text-red-200 opacity-25'"
          ></i>
        </li>
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
  props: ["song", 'likeable'],
  emits: ["like-song", 'show-song'],
  methods: {
    like(song) {
      song.liked = !song.liked;
      this.$emit("like-song", song);
    },
    showSong(){
        this.$emit("show-song", this.song.id);
    }
  },
  async created() {
    this.coverId = `/img/loading.729f0a14.gif`;
    const res = await fetch(
      `http://musicbrainz.org/ws/2/release/?fmt=json&query=${this.song.album}%20AND%20artist:${this.song.artist}%20AND%20(format:digitalmedia%20OR%20format:cd)`
    );
    const data = await res.json();
    if(data.releases[0]){
    const albumId = data.releases[0].id;
    const res2 = await fetch(`http://coverartarchive.org/release/${albumId}`);
    const data2 = await res2.json();
    this.coverId = data2.images[0].thumbnails.small;
    } else {
        this.coverId = `/img/default.bc1ffa9c.jpg`;
    }
  },
};
</script>