<template>
  <div class="note panel" v-if="activeNote">

    <div class="note-controls">
      <button @click="postDeletion">
        TRASH!
      </button>
    </div>

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

      <CheckboxInput
        id="archived"
        label="Archived"
        :checked="activeNote.archived"
        :onChange="update"
        />

      <Dropdown
        id="status"
        label="Status"
        :onChange="update"
        :selected="activeNote.status"
        :options="statusTypes"
        />

      <div v-html="compiledMarkdown" />
      <TextAreaInput
        id="content"
        label="Content"
        :value="activeNote.content"
        :onInput="update" />
      <input type="submit" />

    </form>

  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import marked from 'marked'
import _ from 'lodash'

import statusTypes from '../../common/config/status-types'

import TextInput from '../elements/TextInput'
import CheckboxInput from '../elements/CheckboxInput'
import TextAreaInput from '../elements/TextAreaInput'
import Dropdown from '../elements/Dropdown'

let local = {
  edits: {},
  statusTypes
}

export default {
  name: 'Note',
  components: {
    TextInput,
    CheckboxInput,
    TextAreaInput,
    Dropdown
  },
  data: () => (local),
  mounted () {
    if (!this.$store.state.notes.length) {
      this.loadNotes()
    }
  },
  computed: {
    ...mapState({
      loading: state => state.loading,
      activeNote: state => state.notes.filter(note =>
        note.id === parseInt(state.route.params.id))[0]
    }),
    compiledMarkdown () {
      return marked(this.activeNote.content, { sanitize: true })
    }
  },
  methods: {
    ...mapActions(['loadNotes', 'editNote', 'deleteNote']),
    update: _.debounce(function (e) {
      if (e.target.type === 'checkbox') {
        this.edits[e.target.id] = e.target.checked
        this.activeNote[e.target.id] = e.target.checked
      } else {
        this.edits[e.target.id] = e.target.value
        this.activeNote[e.target.id] = e.target.value
      }
    }, 300),
    postUpdates () {
      this.editNote({
        orig: this.$store.state.notes.filter(note =>
          note.id === parseInt(this.$store.state.route.params.id))[0],
        diff: this.edits
      })
      this.edits = {}
      this.routeBack()
    },
    postDeletion () {
      this.deleteNote({id: this.activeNote.id})
      this.routeBack()
    },
    routeBack () {
      this.$router.push('/') // TODO: how to go back?
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../common/styles/index.scss';
</style>
