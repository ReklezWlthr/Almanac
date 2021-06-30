<template>
  <edit-form
    :new-song-info="newSongInfo"
    :src="src"
    :lyrics="lyrics"
    @reload-cover="reloadCover"
    @forward-value="updateValue"
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
      newSongInfo: {
        title: "",
        artist: "",
        album: "",
        albumArtist: "",
        year: null,
        genre: "",
      },
      lyrics: "",
      src: "/img/default.bc1ffa9c.jpg",
      coverCode: "",
    };
  },
  props: ["songList", "url"],
  methods: {
    updateValue(lyrics) {
      this.lyrics = lyrics;
    },
    async upload() {
        const newSongBuffer = JSON.parse(JSON.stringify(this.newSongInfo));
        console.log(newSongBuffer);
        newSongBuffer.liked = false;
        newSongBuffer.lyrics = encodeURIComponent(this.lyrics);
        newSongBuffer.coverCode = this.coverCode;
        newSongBuffer.ytCode = this.ytlink;
        const res = await fetch(this.url, {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify(newSongBuffer),
        });
        const data = res.json();
        this.$emit("upload-song", data);
        window.location.href = "/";
    },
    async reloadCover() {
      this.src = require(`../assets/loading.gif`);
      try {
        const res = await fetch(
          `http://musicbrainz.org/ws/2/release/?fmt=json&query=${this.newSongInfo.album}%20AND%20artist:${this.newSongInfo.artist}%20AND%20(format:digitalmedia%20OR%20format:cd)`
        );
        const data = await res.json();
        if (data.releases[0]) {
          for (let release of data.releases) {
            const albumId = release.id;
            const res2 = await fetch(
              `http://coverartarchive.org/release/${albumId}`
            );
            if (res2.ok) {
              const data2 = await res2.json();
              this.coverCode = release.id;
              this.src = data2.images[0].thumbnails.large;
              console.log(this.coverCode);
              break;
            }
          }
        } else {
          this.src = require(`../assets/default.jpg`);
          alert("Album Cover Not Found");
        }
      } catch {
        this.src = require(`../assets/default.jpg`);
        alert("Album Cover Fetch Error!");
      }
    },
  },
};
</script>
