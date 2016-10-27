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
