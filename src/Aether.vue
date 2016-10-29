<template>
  <div id="aether">

    <Loading :loading="loading" />
    <NavOverlay />
    <AppHeader />

    <router-view />

  </div>
</template>

<script>
import { mapState } from 'vuex'
import AppHeader from './components/elements/Header'
import Loading from './components/views/Loading'
import NavOverlay from './components/views/NavOverlay'

export default {
  name: 'Aether',
  components: {
    AppHeader,
    Loading,
    NavOverlay
  },
  computed: mapState({
    loading: state => state.loading
  })
}
</script>

<style lang="scss" scoped>
#aether {
  height: 100vh;
  width: 100vw;
  background: url('/static/img/wall/universe.jpg') no-repeat center center fixed; 
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
}
</style>