<template lang="pug">
  #app
    router-view
</template>

<script>
export default {
  name: 'App',
}
</script>

<style lang="scss">
@import "@/assets/styles/main.scss";

#app {
  font-family: Helvetica;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  padding: 20px;
}
</style>
