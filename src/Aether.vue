<template lang="pug">
  #aether
    #loading(v-show="loading")
      span.loading.dots2
    AppHeader
    Notelist(
      v-bind:notes="notes"
      v-bind:loading="loading"
    )
</template>

<script>
import AppHeader from './components/micro/Header'
import Notelist from './components/macro/Notelist'

import * as notes from './api/notes'
import * as profile from './api/profile'

export default {
  name: 'Aether',
  components: {
    AppHeader,
    Notelist
  },
  data: () => ({
    loading: false,
    authenticated: false,
    notes: [],
    profile: {}
  }),
  created () {
    this.loading = true
    this.fetchProfile() // TODO: async await
    this.fetchNotes() // TODO: async await
    this.loading = false
  },
  methods: {
    fetchNotes () {
      notes.get((notes) => {
        this.notes = notes.data
      })
    },
    fetchProfile () {
      profile.get(profile => {
        console.log(profile)
        this.profile = profile.data
      })
    }
  }
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
