<template>
  <div id="header">
    <h1> {{ text }} </h1>
    <button @click="showNavLinks"> Menu </button>
  </div>
</template>

<script>
export default {
  name: 'AppHeader',
  data: () => ({
    text: 'Aether'
  }),
  methods: {
    showNavLinks () {
      this.$store.commit('navLinksShown', true)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../common/styles/index.scss';

#header {
  background: black;
  display: flex;

  h1 {
    font-size: 24px;
    margin: 0;
    color: $grey;
    padding: 15px 30px;
  }

  button {
    margin-left: auto;
    margin-right: 15px;
    border: none;
    color: $grey;
  }
}
</style>
