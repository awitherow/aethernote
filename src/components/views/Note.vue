<template>
  <div v-if="activeNote">

    <form @submit.prevent="postUpdates">

      <TextInput
        id="title"
        label="title"
        :value="activeNote.title"
        :onInput="update"
        />

      <CheckboxInput
        id="prio"
        label="Prio"
        :checked="activeNote.prio"
        :onChange="update"
        />

      <textarea id="content" :value="activeNote.content" @input="update" />
    </form>

    <div v-html="compiledMarkdown" />

  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import marked from 'marked'
import _ from 'lodash'

import TextInput from '../elements/TextInput'
import CheckboxInput from '../elements/CheckboxInput'

let local = {
  edits: {}
}

export default {
  name: 'Note',
  components: {
    TextInput,
    CheckboxInput
  },
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
    update: _debounce(function(e) {
      if (e.target.type === 'checkbox') {
        this.edits[e.target.id] = e.target.checked
        this.activeNote[e.target.id] = e.target.checked
      } else {
        this.edits[e.target.id] = e.target.value
        this.activeNote[e.target.id] = e.target.value
      }
    }, 300),
    postUpdates () {
      this.editNote(this.activeNote, this.edits)
      this.edits = {}
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
