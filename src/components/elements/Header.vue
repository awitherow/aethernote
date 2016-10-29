<template>
  <div id="header">
    <button @click="showNavLinks"> &#9776; </button>
    <h1> {{ text }} </h1>
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
  display: flex;
  background: rgba(255,255,255,0.95);

  button,
  h1 {
    font-size: 20px;
  }

  button {
    margin: 0 10px;
  }

  h1 {
    font-weight: 300;
  }
}
</style>
