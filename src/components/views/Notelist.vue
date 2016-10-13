<template>
  <div id="note-list" v-show="!loading">
    <form id="add-note">
      <fieldset>
        <label for="content"></label>
        <input
          name="content"
          v-model="newNote.content"
          />
      </fieldset>
      <fieldset>
        <label for="prio"></label>
        <input
          name="prio"
          type="checkbox"
          v-model="newNote.prio"
          />
      </fieldset>
      <button v-on:click.prevent="addNote">+</button>
    </form>
    <ul>
      <li v-for="note in notes">
        {{ note.title }}
      </li>
    </ul>
  </div>
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
