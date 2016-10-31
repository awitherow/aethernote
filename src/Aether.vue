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
    loading: state => state.loading,
    authenticated: state => state.authenticated
  }),
  created () {
    if (!this.authenticated) {
      this.$router.push('/login')
    }
  }
}
</script>

<style lang="scss" scoped>
#aether {
  position: relative;
  min-height: 100vh;
  min-width: 100vw;
  width: 100%;
  height: 100%;
  background: url('/static/img/wall/strand.jpg') no-repeat center center fixed;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
}
</style>
