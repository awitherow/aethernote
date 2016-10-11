<template lang=pug>
  #note-list(v-show="!loading")
    #add-note
      fieldset
        label(for="content")
        input(
          name="prio"
          v-model="newNote.content"
        )
      fieldset
        label(for="prio")
        input(
          name="prio"
          type="checkbox"
          v-model="newNote.prio"
        )
      button(v-on:click.prevent="addNote") +
    ul
      li(v-for="note in notes") {{ note.title }}
</template>

<script>
import * as notes from '../../api/notes'

export default {
  name: 'Notelist',
  props: ['notes', 'loading'],
  data: () => ({
    newNote: {
      content: '',
      prio: false,
      status: 'inbox',
      context: 'personal'
    }
  }),
  methods: {
    addNote () {
      const { content, prio, status, context } = this.newNote
      const entry = { content, prio, status, context }
      this.notes.unshift(entry)
      notes.add({ content, prio, status, context })
    }
  }
}
</script>

<style scoped>
</style>
