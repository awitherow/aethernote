<template lang="pug">
  #aether
    AppHeader
</template>

<script>
import AppHeader from './components/molecules/Header'

export default {
  name: 'Aether',
  components: {
    AppHeader
  },
  data: () => ({
    loading: false,
    authenticated: false
  })
}
</script>

<style>
body {
  margin: 0;
}
</style>
