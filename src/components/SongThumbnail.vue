<template>
    <div class="flex-col">
        <div><img :src="require(`../assets/albumArts/${song.artist}-${song.name}.jpg`)"></div>
    </div>
</template>

<script>
export default {
    props:["song"]
}
</script>
