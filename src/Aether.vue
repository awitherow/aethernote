<template lang="pug">
  #aether
    #loading(v-show="loading")
      span.loading.dots2
    AppHeader
    #note-list
      ul(v-show="!loading")
        li(v-for="note in notes") {{ note.title }}
</template>

<script>
import AppHeader from './components/molecules/Header'

import { get } from './api/notes'

export default {
  name: 'Aether',
  components: {
    AppHeader
  },
  data: () => ({
    loading: false,
    authenticated: false,
    notes: []
  }),
  created () {
    this.fetchNotes()
  },
  methods: {
    fetchNotes () {
      this.loading = true
      get((notes) => {
        this.notes = notes.data
        this.loading = false
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
