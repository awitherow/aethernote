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
</style>
