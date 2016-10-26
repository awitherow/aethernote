<template>
  <div v-if="activeNote">
    <form @submit.prevent="updateNote">
      <fieldset>
        <label for="title">title</label>
        <input id="title" :value="activeNote.title" @change="update" />
      </fieldset>
      <fieldset>
        <label for="prio">prio</label>
        <input
          id="prio"
          type="checkbox"
          :value="activeNote.prio"
          @input="update" />
      </fieldset>
    </form>
    <textarea :value="activeNote.content" @input="update" />
    <div v-html="compiledMarkdown" />
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import marked from 'marked'
import _ from 'lodash'

let local = {
  edits: {}
}

export default {
  name: 'Note',
  data: () => (local),
  created () {
    if (!this.notes.length) {
      this.loadNotes()
    }
  },
  computed: {
    ...mapState({
      loading: state => state.loading,
      notes: state => state.notes,
      activeNote: state => state.notes.filter(note =>
        note.id === parseInt(state.route.params.id))[0]
    }),
    compiledMarkdown () {
      return marked(this.activeNote.content, { sanitize: true })
    }
  },
  methods: {
    ...mapActions(['loadNotes', 'editNote']),
    update: _.debounce(function (e) {
      this.edits[e.target.id] = e.target.value
      this.activeNote[e.target.id] = e.target.value
    }, 300),
    updateNote () {
      this.editNote(this.activeNote, this.edits)
      this.edits = {}
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
