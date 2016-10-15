<template>
  <div id="aether">
    <Loading
      v-bind:loading="loading"
      />
    <AppHeader/>
    <Profile
      :profileOpen="profileOpen"
      :profile="profile"
      />
    <Notelist
      :notes="notes"
      :loading="loading"
      />
  </div>
</template>

<script>
import Notelist from './components/views/Notelist'
import Profile from './components/views/Profile'

import AppHeader from './components/elements/Header'
import Loading from './components/elements/Loading'

import * as notes from './api/notes'
import * as profile from './api/profile'

export default {
  name: 'Aether',
  components: {
    AppHeader,
    Notelist,
    Profile,
    Loading
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
    this.fetchProfile()
    this.fetchNotes()
  },
  methods: {
    fetchNotes () {
      notes.get((notes) => {
        this.notes = notes.data
        this.loading = false
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
