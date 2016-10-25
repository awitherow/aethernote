<template>
  <div v-if="activeNote">
    Hello! {{ activeNote.id }}
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

let local = {}

export default {
  name: 'Note',
  data: () => (local),
  created () {
    if (!this.notes.length) {
      this.loadNotes()
    }
  },
  methods: {
    ...mapActions(['loadNotes'])
  },
  computed: {
    ...mapState({
      loading: state => state.loading,
      notes: state => state.notes,
      activeNote: state => state.notes.filter(note =>
        note.id === parseInt(state.route.params.id))[0]
    })
  }
}
</script>

<style lang="scss" scoped>
</style>
