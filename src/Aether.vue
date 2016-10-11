<template lang="pug">
  #aether
    #loading(v-show="loading")
      span.loading.dots2
    AppHeader
    Profile(
      v-bind:profileOpen="profileOpen"
      v-bind:profile="profile"
    )
    Notelist(
      v-bind:notes="notes"
      v-bind:loading="loading"
    )
</template>

<script>
import Notelist from './components/views/Notelist'
import Profile from './components/views/Profile'

import AppHeader from './components/elements/Header'

import * as notes from './api/notes'
import * as profile from './api/profile'

export default {
  name: 'Aether',
  components: {
    AppHeader,
    Notelist,
    Profile
  },
  data: () => ({
    loading: false,
    authenticated: false,
    notes: [],
    profile: {},
    profileOpen: false
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
