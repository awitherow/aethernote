<template>
  <div id="aether">
    <Loading
      v-bind:loading="loading"
      />
    <AppHeader />
    <router-view />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import AppHeader from './components/elements/Header'
import Loading from './components/elements/Loading'

export default {
  name: 'Aether',
  components: {
    AppHeader,
    Loading
  },
  computed: mapState({
    loading: state => state.loading
  })
}
</script>

<style>
body {
  margin: 0;
}

#loading {
  position: fixed;
  background: white;
  color: black;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;

  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
